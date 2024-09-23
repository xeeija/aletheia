import { createLogger } from "@/utils/index.js"

export const loggerSocket = createLogger("socket")
export const loggerGraphql = createLogger("graphql")
export const loggerApi = createLogger("api")

export const loggerTwitch = createLogger("twitch")
export const loggerTwitchAuth = createLogger("twitch:auth")
export const loggerEventsub = createLogger("eventsub")
