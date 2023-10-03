import { PrismaClient } from '@prisma/client';
import { ApiClient } from '@twurple/api';
import { EventSubSubscription } from '@twurple/eventsub-base';
import { EventSubMiddleware } from '@twurple/eventsub-http';
import { config } from 'dotenv';
import { SocketServer, SubscriptionType } from '../types';
import { authProvider } from './auth';
import { addSubscriptionRedemptionAdd } from './events/redemptionAdd';

config()

export const apiClient = new ApiClient({ authProvider })

export const eventSubMiddleware = new EventSubMiddleware({
  apiClient,
  hostName: process.env.TWITCH_HOSTNAME ?? "",
  pathPrefix: '/twitch',
  secret: process.env.TWITCH_EVENTSUB_SECRET ?? 'haAd89DzsdIA93d2jd28Id238dh2E9hd82Q93dhEhi',
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
    minLevel: Number(process.env.EVENTSUB_LOGLEVEL),
  }
})

export const activeSubscriptions = new Map<string, EventSubSubscription>()

// (async () => {

//   // only needed for testing with ngrok
//   await apiClient.eventSub.deleteAllSubscriptions()
//   const adapter = new NgrokAdapter()

//   listener.start()

//   const redemptionsSubscription = listener.onChannelRedemptionAddForReward("78823247", "67890", (event) => {
//     console.log("recieved event")
//     console.log(JSON.stringify({ ...event }))
//   })

//   console.log(await redemptionsSubscription.getCliTestCommand())

// })()

export const showEventSubDebug = process.env.EVENTSUB_DEBUG === "1" || process.env.EVENTSUB_DEBUG?.toLocaleLowerCase() === "true"

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
    eventSub.onVerify((success, ev) => {
      console.log(`[eventsub] verify ${success ? "succes" : "failure"}`, eventType(ev.id))
    })
    eventSub.onRevoke((ev) => {
      console.log("[eventsub] revoked ", eventType(ev.id))
    })
  }

  // await apiClient.eventSub.deleteAllSubscriptions()

  const storedSubscriptions = await prisma.eventSubscription.findMany({
    where: {
      paused: false,
    },
  })

  const helixSubs = await apiClient.eventSub.getSubscriptions()

  // TODO: check type and resume with the correct listener

  if (storedSubscriptions.length > 0 || helixSubs.data.length > 0) {
    const storedCountText = helixSubs.data.length !== storedSubscriptions.length ? `, stored:` : ""
    console.log(`[eventsub] subscriptions active:`, helixSubs.data.length, storedCountText, storedCountText ? storedSubscriptions.length : "")
  }

  helixSubs.data.forEach((helixSub) => {
    if (helixSub.type === SubscriptionType.redemptionAdd) {
      const condition = helixSub.condition as Record<string, string>

      const stored = storedSubscriptions.find(s =>
        s.rewardId === condition.reward_id &&
        s.twitchUserId === condition.broadcaster_user_id
      )

      if (stored) {
        addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, <any>stored)
      }

      // eventSub.onChannelRedemptionAddForReward(condition.broadcaster_user_id, condition.reward_id, (event) => {
      //   console.log("[eventsub] resumed redemption add", event.userDisplayName, event.input)
      //   addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, <any>stored)

      // })

    }
  })


  // await apiClient.eventSub.deleteAllSubscriptions()

  // activeSubscriptions.forEach(async (sub) => {

  //   // addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, sub)

  //   // SUB

  //   // const subscription = eventSub.onChannelRedemptionAddForReward(sub.twitchUserId, sub.rewardId, async (event) => {
  //   //   console.log("received redemption continue", new Date().toISOString(), event.rewardTitle)

  //   //   if (event.status === "unfulfilled") {
  //   //     await prisma.randomWheelEntry.create({
  //   //       data: {
  //   //         name: sub.useInput ? (event.input || event.userDisplayName) : event.userDisplayName,
  //   //         randomWheelId: sub.randomWheelId
  //   //       }
  //   //     })

  //   //     socketIo.to(`wheel/${sub.randomWheelId}`).emit("wheel:entries", "add")
  //   //   }
  //   // })

  //   // activeEventSubSubscriptions.set(sub.subscriptionId, subscription)

  //   // console.log(await subscription.getCliTestCommand())

  // })
  // END SUB

  // apiClient.eventSub.deleteAllSubscriptions()

  // const subs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

  // const redemptionsSubscription = middleware.onChannelRedemptionAddForReward("1234", "12345", (event) => {
  //   console.log("received event")
  //   console.log(JSON.stringify({ ...event }))
  // })

  // redemptionsSubscription.start({
  // })


  // middleware.onSubscriptionCreateFailure((event, error) => {
  //   console.log('[EventSub] onSubscriptionCreateFailure', { event, error })
  // })

  // console.log(await redemptionsSubscription.getCliTestCommand())

}
