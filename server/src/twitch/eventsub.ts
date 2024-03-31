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
  batchDelay: Number(process.env.TWITCH_BATCH_DELAY) || 5,
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
    minLevel: Number(process.env.TWITCH_LOGLEVEL) || undefined,
    emoji: false,
    timestamps: false,
    // colors: false,
    // name: "twurple:api",
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
    emoji: false,
    timestamps: false,
    // name: "twurple:eventsub",
    // colors: false,
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
  })

  // initialize wheel sync subscriptions
  const storedSync = storedSubscriptions.filter((s) => s.type === EventSubType.wheelSync.toString())

  console.log(`[eventsub] initialize`, storedSync.length, `wheel sync subscriptions`)

  const wheels = await prisma.randomWheel.findMany({
    where: {
      id: { in: storedSync.map((s) => s.randomWheelId ?? "").filter((x) => x) },
    },
  })

  storedSync.forEach((sub) => {
    addSubscriptionSync(eventSub, prisma, socketIo, {
      id: sub.id,
      twitchUserId: sub.twitchUserId,
      rewardId: sub.rewardId ?? "",
      randomWheelId: sub.randomWheelId ?? "",
      useInput: sub.useInput,
      uniqueEntries: wheels.find((w) => w.id === sub.randomWheelId)?.uniqueEntries,
    })
  })

  // initialize reward group subscriptions
  const storedGroup = storedSubscriptions.filter((s) => s.type === EventSubType.rewardGroup.toString())

  console.log(`[eventsub] initialize`, storedGroup.length, `reward group subscriptions`)

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
