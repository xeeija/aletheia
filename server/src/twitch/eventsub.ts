import { ApiClient } from '@twurple/api';
import { EventSubMiddleware } from '@twurple/eventsub-http';
import { config } from 'dotenv';
import { authProvider } from './auth';

config()

export const apiClient = new ApiClient({ authProvider })

// TODO: env
const secret = process.env.EVENTSUB_SECRET ?? 'haAd89DzsdIA93d2jd28Id238dh2E9hd82Q93dhEhi'

export const eventSubMiddleware = new EventSubMiddleware({
  apiClient,
  hostName: process.env.TWITCH_HOSTNAME ?? "",
  pathPrefix: '/twitch',
  secret,
})


// (async () => {

//   // only needed for testing with ngrok
//   await apiClient.eventSub.deleteAllSubscriptions()
//   const adapter = new NgrokAdapter()

//   const listener = new EventSubHttpListener({ apiClient, adapter, secret })

//   listener.start()

//   const redemptionsSubscription = listener.onChannelRedemptionAddForReward("78823247", "67890", (event) => {
//     console.log("recieved event")
//     console.log(JSON.stringify({ ...event }))
//   })

//   console.log(await redemptionsSubscription.getCliTestCommand())

// })()



export const handleEventSub = async (middleware: EventSubMiddleware) => {
  // apiClient.eventSub.deleteAllSubscriptions()

  // const subs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

  const redemptionsSubscription = middleware.onChannelRedemptionAddForReward("1234", "12345", (event) => {
    console.log("received event")
    console.log(JSON.stringify({ ...event }))
  })

  // redemptionsSubscription.start({
  // })

  console.log(await redemptionsSubscription.getCliTestCommand())

}
