import { ApiClient } from '@twurple/api'
import { AppTokenAuthProvider } from '@twurple/auth'
import { EventSubHttpListener } from '@twurple/eventsub-http'
import { NgrokAdapter } from '@twurple/eventsub-ngrok'
import { config } from 'dotenv'

config()

const clientId = process.env.TWITCH_CLIENT_ID ?? ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

// const tokenData = JSON.parse(await readFile('./tokens.1.json', "utf-8"));
// const authProvider = new RefreshingAuthProvider({ clientId, clientSecret });

// authProvider.onRefresh(async (userId, newTokenData) =>
//   await writeFile(`./tokens.${userId}.json`, JSON.stringify(newTokenData, null, 2), 'utf-8')
// );

// await authProvider.addUserForToken(tokenData);

const authProvider = new AppTokenAuthProvider(clientId, clientSecret);
export const apiClient = new ApiClient({ authProvider })

const secret = 'haAd89DzsdIA93d2jd28Id238dh2E9hd82Q93dhEhi';

// export const eventSubMiddleware = new EventSubMiddleware({
//   apiClient,
//   hostName: process.env.EVENTSUB_HOSTNAME ?? "",
//   pathPrefix: '/twitch',
//   secret,
// });

// const adapter = new DirectConnectionAdapter({
//   hostName: 'example.com',
//   sslCert: {
//     key: 'aaaaaaaaaaaaaaa',
//     cert: 'bbbbbbbbbbbbbbb'
//   }
// });

(async () => {

  // only needed for testing with ngrok
  await apiClient.eventSub.deleteAllSubscriptions()
  const adapter = new NgrokAdapter()

  const listener = new EventSubHttpListener({ apiClient, adapter, secret })

  listener.start()

  const redemptionsSubscription = listener.onChannelRedemptionAddForReward("12345", "67890", (event) => {
    console.log("recieved event")
    console.log(JSON.stringify({ ...event }))
  })

  console.log(await redemptionsSubscription.getCliTestCommand())

})()
