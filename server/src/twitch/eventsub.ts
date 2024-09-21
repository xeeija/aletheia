import {
  handleSubscriptionRewardGroup,
  handleSubscriptionRewardUpdate,
  handleSubscriptionSync,
  unpauseRewardGroup,
} from "@/twitch/events/index.js"
import { apiClient, eventSubApiClient, getTwitchUserId, useMockServer } from "@/twitch/index.js"
import { EventSubType, type SocketServer } from "@/types.js"
import { PrismaClient, RewardGroup, RewardGroupItem } from "@prisma/client"
import { EventSubSubscription } from "@twurple/eventsub-base"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import "dotenv/config"

const strictHostCheck = process.env.EVENTSUB_STRICT_HOST_CHECK !== "0"

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
    timestamps: false,
    // name: "twurple:eventsub",
    // colors: false,
  },
})

export const activeSubscriptions = new Map<string, EventSubSubscription>()

export const showEventSubDebug =
  process.env.TWITCH_DEBUG === "1" || process.env.TWITCH_DEBUG?.toLocaleLowerCase() === "true"

// const eventTypePattern = /^([\w.]+)\.(\d+)\.([\da-f-]+)$/
const eventTypePattern = /^([a-z_.]+[a-z_])/

const eventType = (eventId: string) => eventId.match(eventTypePattern)?.[1]
// const eventType = (eventId: string) => {
//   const r = eventId.match(eventTypePattern)
//   return `${r?.[1]}.${r?.[3]}`
// }

export const handleEventSub = async (eventSub: EventSubMiddleware, prisma: PrismaClient, socketIo: SocketServer) => {
  if (showEventSubDebug) {
    eventSub.onSubscriptionCreateFailure((ev, err) => {
      console.log("[eventsub] create failure", eventType(ev.id), err.name, err.message)
    })
    eventSub.onSubscriptionCreateSuccess((ev) => {
      console.log("[eventsub] create success", eventType(ev.id))
    })
    eventSub.onSubscriptionDeleteFailure((ev, err) => {
      console.log("[eventsub] delete failure", eventType(ev.id), err.name, err.message)
    })
    eventSub.onSubscriptionDeleteSuccess((ev) => {
      console.log("[eventsub] delete success", eventType(ev.id))
    })
    eventSub.onVerify((success, sub) => {
      console.log(`[eventsub] verify ${success ? "succes" : "failure"}`, eventType(sub.id))
    })
  }

  eventSub.onRevoke(async (sub, status) => {
    console.log(`[eventsub] revoked ${eventType(sub.id)} ${sub.authUserId?.slice(0, 4)}, Status ${status}`)

    if (status === "authorization_revoked") {
      await prisma.eventSubscription.deleteMany({
        where: {
          twitchUserId: sub.authUserId ?? "",
        },
      })

      await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: sub.authUserId,
        },
      })

      console.log("[eventsub] revoke: removed token successfully")
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

  console.log(`[eventsub] initialize`, storedSync.length, `wheel sync subscriptions`)

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

  console.log(`[eventsub] initialize`, storedGroup.length, `reward group subscriptions`)

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
    console.log(`[eventsub] reward group: resuming`, pausedRewardGroups.length, `reward groups to unpause`)
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

  console.log(`[eventsub] initialize`, storedLink.length, `reward link subscriptions`)

  await Promise.all(
    storedLink.map(async (sub) => {
      await handleSubscriptionRewardUpdate(eventSub, prisma, socketIo, {
        twitchUserId: sub.twitchUserId,
        userId: sub.userId ?? "",
      })
    })
  )

  // await apiClient.eventSub.deleteAllSubscriptions()

  // console.log(await redemptionsSubscription.getCliTestCommand())
}
