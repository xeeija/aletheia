import "dotenv/config"

import { PrismaClient, RewardGroup, RewardGroupItem } from "@/generated/prisma/client.js"
import {
  handleSubscriptionRewardGroup,
  handleSubscriptionRewardUpdate,
  handleSubscriptionSync,
  unpauseRewardGroup,
} from "@/twitch/events/index.js"
import { apiClient, eventSubApiClient, getTwitchUserId, useMockServer } from "@/twitch/index.js"
import { EventSubType, type SocketServer } from "@/types.js"
import { loggerEventsub as logger, useColors } from "@/utils/index.js"
import { EventSubSubscription } from "@twurple/eventsub-base"
import { EventSubMiddleware } from "@twurple/eventsub-http"

const strictHostCheck = process.env.EVENTSUB_STRICT_HOST_CHECK !== "0"

if (!process.env.EVENTSUB_SECRET) {
  logger.warn("EVENTSUB_SECRET is not set")
}

// const twurpleLogger = createLogger("twurple:eventsub")

export const eventSubMiddleware = new EventSubMiddleware({
  apiClient: useMockServer ? eventSubApiClient ?? apiClient : apiClient,
  hostName: process.env.EVENTSUB_HOSTNAME ?? "",
  pathPrefix: process.env.EVENTSUB_PATH_PREFIX ?? "/api/twitch/eventsub",
  secret: process.env.EVENTSUB_SECRET ?? "haAd89DzsdIA93d2jd28Id238dh2E9hd82Q93dhEhi",
  strictHostCheck: strictHostCheck,
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
    minLevel: Number(process.env.EVENTSUB_LOGLEVEL) || undefined,
    emoji: false,
    timestamps: process.env.LOG_TIME === "1",
    colors: useColors,
    // name: "twurple:eventsub",
    // custom: {
    //   crit: (message) => twurpleLogger.error("[CRIT]", message),
    //   error: (message) => twurpleLogger.error(message),
    //   warn: (message) => twurpleLogger.warn(message),
    //   info: (message) => twurpleLogger.info(message),
    //   log: (message) => twurpleLogger.log(message),
    //   debug: (message) => twurpleLogger.debug(message),
    //   trace: (message) => twurpleLogger.trace(message),
    // },
  },
})

export const activeSubscriptions = new Map<string, EventSubSubscription>()

// export const showEventSubDebug =
//   process.env.TWITCH_DEBUG === "1" || process.env.TWITCH_DEBUG?.toLocaleLowerCase() === "true"

// const eventTypePattern = /^([a-z_.]+[a-z_])/
// const eventType = (eventId: string) => eventId.match(eventTypePattern)?.[1]

// const eventTypePattern = /^([\w.]+)\.(\d+)\.([\da-f-]+)$/
// const eventType = (eventId: string) => {
//   const r = eventId.match(eventTypePattern)
//   return `${r?.[1]}.${r?.[3]}`
// }

export const handleEventSub = async (eventSub: EventSubMiddleware, prisma: PrismaClient, socketIo: SocketServer) => {
  eventSub.onSubscriptionCreateFailure((ev, err) => {
    logger.error(`Failed to create subscription ${ev.id}:`, err)
  })

  eventSub.onSubscriptionCreateSuccess((ev) => {
    logger.debug(`Created subscription ${ev.id}`)
  })

  eventSub.onSubscriptionDeleteFailure((ev, err) => {
    logger.error(`Failed to delete subscription ${ev.id}:`, err)
  })

  eventSub.onSubscriptionDeleteSuccess((ev) => {
    logger.debug(`Deleted subscription ${ev.id}`)
  })

  eventSub.onVerify((success, ev) => {
    if (success) {
      logger.debug(`Verified subscription ${ev.id}`)
    } else {
      logger.error(`Failed to verify subscription ${ev.id}`)
    }
  })

  eventSub.onRevoke(async (sub, status) => {
    // maybe log as info
    logger.debug(`Revoked subscription ${sub.id} with status ${status} (user ${sub.authUserId})`)

    if (status === "authorization_revoked") {
      const deletedSubscriptions = await prisma.eventSubscription.deleteMany({
        where: {
          twitchUserId: sub.authUserId ?? "",
        },
      })

      const deletedToken = await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: sub.authUserId,
        },
      })

      if (deletedToken.count > 0 || deletedSubscriptions.count > 0) {
        logger.info(
          `Deleted ${deletedToken.count} access tokens and`,
          `${deletedSubscriptions.count} subscriptions of user ${sub.authUserId} after revoke`
        )
      }
    }
  })

  // await apiClient.eventSub.deleteAllSubscriptions()

  const storedSubscriptions = await prisma.eventSubscription.findMany({
    where: {
      paused: false,
    },
    include: {
      wheelSync: true,
    },
  })

  // initialize wheel sync subscriptions
  const storedSync = storedSubscriptions.filter((s) => s.type === EventSubType.wheelSync.toString())

  logger.debug(`Initialize ${storedSync.length} wheel sync subscriptions`)

  // find unique rewardIds
  const rewardIdsSync = storedSync.flatMap((sub) => sub.wheelSync.map((s) => s.rewardId))
  const uniqueRewardIdsSync = [...new Set(rewardIdsSync)]

  await Promise.all(
    storedSync.flatMap((sub) =>
      uniqueRewardIdsSync.map(async (rewardId) => {
        await handleSubscriptionSync(eventSub, prisma, socketIo, {
          twitchUserId: sub.twitchUserId,
          userId: sub.userId ?? "",
          rewardId,
        })
      })
    )
  )

  // initialize reward group subscriptions
  const storedGroup = storedSubscriptions.filter((s) => s.type === EventSubType.rewardGroup.toString())

  logger.debug(`Initialize ${storedGroup.length} reward group subscriptions`)

  await Promise.all(
    storedGroup.map(async (sub) => {
      await handleSubscriptionRewardGroup(eventSub, prisma, apiClient, socketIo, {
        twitchUserId: sub?.twitchUserId ?? "",
        userId: sub.userId ?? "",
      })
    })
  )

  // resuming timeouts to unpause reward group

  const pausedRewardGroups: (RewardGroup & { items: RewardGroupItem[] })[] = await prisma.rewardGroup.findMany({
    where: {
      active: true,
      cooldownExpiry: { not: null },
    },
    include: {
      items: true,
    },
  })

  if (pausedRewardGroups.length) {
    logger.info(`Resuming ${pausedRewardGroups.length} reward groups to unpause`)
  }

  for (const group of pausedRewardGroups) {
    const twitchUserId = getTwitchUserId(storedGroup.find((s) => s.userId === group.userId)?.twitchUserId) ?? ""

    unpauseRewardGroup({
      apiClient,
      prisma,
      socketIo,
      group,
      rewardItems: group.items,
      twitchUserId,
      cooldown: (group.cooldownExpiry?.getTime() || 0) - Date.now() + Math.floor(Math.random() * 3000),
    })

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  // initialize reward link subscriptions
  const storedLink = storedSubscriptions.filter((s) => s.type === EventSubType.rewardLink.toString())

  logger.debug(`Initialize ${storedLink.length} reward link subscriptions`)

  await Promise.all(
    storedLink.map(async (sub) => {
      await handleSubscriptionRewardUpdate(eventSub, prisma, socketIo, {
        twitchUserId: sub.twitchUserId,
        userId: sub.userId ?? "",
      })
    })
  )

  const initializedSubs = storedSync.length + storedGroup.length + storedLink.length
  logger.info(`Initialized ${initializedSubs} subscriptions (${storedSubscriptions.length} stored)`)

  // await apiClient.eventSub.deleteAllSubscriptions()

  // logger.debug(await redemptionsSubscription.getCliTestCommand())
}
