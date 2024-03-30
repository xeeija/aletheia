import { authProvider } from "@/twitch"
import { addSubscriptionSync, handleSubscriptionRewardGroup } from "@/twitch/events"
import { EventSubType, SubscriptionType, type SocketServer } from "@/types"
import { PrismaClient } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubSubscription } from "@twurple/eventsub-base"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import "dotenv/config"

export const apiClient = new ApiClient({
  authProvider,
  batchDelay: Number(process.env.TWITCH_BATCH_DELAY) ?? 5,
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
    minLevel: Number(process.env.TWITCH_LOGLEVEL) || undefined,
  },
})

export const eventSubMiddleware = new EventSubMiddleware({
  apiClient,
  hostName: process.env.EVENTSUB_HOSTNAME ?? "",
  pathPrefix: process.env.EVENTSUB_PATH_PREFIX ?? "/api/twitch",
  secret: process.env.EVENTSUB_SECRET ?? "haAd89DzsdIA93d2jd28Id238dh2E9hd82Q93dhEhi",
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
    minLevel: Number(process.env.EVENTSUB_LOGLEVEL) || undefined,
  },
})

export const activeSubscriptions = new Map<string, EventSubSubscription>()

export const showEventSubDebug =
  process.env.EVENTSUB_DEBUG === "1" || process.env.EVENTSUB_DEBUG?.toLocaleLowerCase() === "true"

// const eventTypePattern = /^([\w.]+)\.(\d+)\.([\da-f-]+)$/
const eventTypePattern = /^([a-z_.]+[a-z_])/
const eventType = (eventId: string) => eventId.match(eventTypePattern)?.[1]
// const eventType = (eventId: string) => {
//   const r = eventId.match(eventTypePattern)
//   return `${r?.[1]}.${r?.[3]}`
// }

export const handleEventSub = async (eventSub: EventSubMiddleware, prisma: PrismaClient, socketIo: SocketServer) => {
  if (showEventSubDebug) {
    eventSub.onSubscriptionCreateFailure((ev) => {
      console.log("[eventsub] create failure", eventType(ev.id))
    })
    eventSub.onSubscriptionCreateSuccess((ev) => {
      console.log("[eventsub] create success", eventType(ev.id))
    })
    eventSub.onSubscriptionDeleteFailure((ev) => {
      console.log("[eventsub] delete failure", eventType(ev.id))
    })
    eventSub.onSubscriptionDeleteSuccess((ev) => {
      console.log("[eventsub] delete success", eventType(ev.id))
    })
    // TODO: Fix: has type "any" somehow since typescript 5.3 upgrade
    // eventSub.onVerify((success, ev) => {
    //   console.log(`[eventsub] verify ${success ? "succes" : "failure"}`, eventType(ev.id))
    // })
  }

  eventSub.onRevoke(async (ev) => {
    console.log("[eventsub] revoked ", ev.authUserId?.slice(0, 4))

    await prisma.eventSubscription.deleteMany({
      where: {
        twitchUserId: ev.authUserId ?? "",
      },
    })

    await prisma.userAccessToken.deleteMany({
      where: {
        twitchUserId: ev.authUserId,
      },
    })

    console.log("[eventsub] revoke: removed token successfully")
  })

  // await apiClient.eventSub.deleteAllSubscriptions()

  const storedSubscriptions = await prisma.eventSubscription.findMany({
    where: {
      paused: false,
    },
  })

  const helixSubs = await apiClient.eventSub.getSubscriptionsForStatus("enabled")

  // TODO: check type and resume with the correct listener

  if (storedSubscriptions.length > 0 || helixSubs.data.length > 0) {
    const storedCountText = helixSubs.data.length !== storedSubscriptions.length ? `, stored:` : ""
    console.log(
      `[eventsub] subscriptions active:`,
      helixSubs.data.length,
      storedCountText,
      storedCountText ? storedSubscriptions.length : ""
    )
  }

  helixSubs.data.forEach(async (helixSub) => {
    if (helixSub.type === SubscriptionType.redemptionAdd.toString()) {
      const condition = helixSub.condition as Record<string, string>

      const stored = storedSubscriptions.find(
        (s) => s.rewardId === condition.reward_id && s.twitchUserId === condition.broadcaster_user_id
      )

      if (stored?.type === EventSubType.wheelSync) {
        const wheel = await prisma.randomWheel.findUnique({
          where: {
            id: stored.randomWheelId ?? "",
          },
        })

        addSubscriptionSync(eventSub, prisma, socketIo, {
          id: stored.id,
          twitchUserId: stored.twitchUserId,
          rewardId: stored.rewardId ?? "",
          randomWheelId: stored.randomWheelId ?? "",
          useInput: stored.useInput,
          uniqueEntries: wheel?.uniqueEntries,
        })
      }
    }
  })

  const storedGroup = storedSubscriptions.filter((s) => s.type === EventSubType.rewardGroup.toString())

  await Promise.all(
    storedGroup.map(async (sub) => {
      await handleSubscriptionRewardGroup(eventSub, prisma, apiClient, {
        twitchUserId: sub?.twitchUserId ?? "",
        userId: sub.userId ?? "",
      })
    })
  )

  // await apiClient.eventSub.deleteAllSubscriptions()

  // console.log(await redemptionsSubscription.getCliTestCommand())
}
