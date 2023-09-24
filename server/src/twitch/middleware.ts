import { EventSubMiddleware } from "@twurple/eventsub-http"
import { apiClient } from "./eventsub"

export const eventSubMiddleware = new EventSubMiddleware({
  apiClient,
  hostName: 'example.com',
  pathPrefix: '/twitch',
  secret: 'randomlyGeneratedSecureSecretHere'
})
