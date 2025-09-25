import { PrismaClient, UserAccessToken } from "@/generated/prisma/client.js"
import { authProvider, mockAuthProvider } from "@/twitch/index.js"
import { useColors } from "@/utils/index.js"
import { ApiClient } from "@twurple/api"
import "dotenv/config"
import { Request } from "express"

const mockServerPort = Number(process.env.TWITCH_MOCK_SERVER_PORT) || undefined
export const useMockServer = mockServerPort !== undefined

export const apiClient = new ApiClient({
  authProvider: useMockServer ? mockAuthProvider : authProvider,
  batchDelay: Number(process.env.TWITCH_BATCH_DELAY) || 5,
  mockServerPort: mockServerPort,
  logger: {
    // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug, 7 = trace
    minLevel: Number(process.env.TWITCH_LOGLEVEL) || undefined,
    emoji: false,
    timestamps: process.env.LOG_TIME === "1",
    colors: useColors,
    // name: "twurple:api",
  },
})

// separated because eventsub is not supported on the mock server, so this always uses the real API
// only create if using the mock server, otherwise the original authProvider is used below
export const eventSubApiClient = useMockServer
  ? new ApiClient({
      authProvider,
      batchDelay: Number(process.env.TWITCH_BATCH_DELAY) || 5,
      logger: {
        // 0 = critical, 1 = error, 2 = warning, 3 = info, 4 = debug
        minLevel: Number(process.env.TWITCH_LOGLEVEL) || undefined,
        emoji: false,
        timestamps: process.env.LOG_TIME === "1",
        colors: useColors,
      },
    })
  : null

export type UserAccessTokenWithId = UserAccessToken & {
  twitchUserId: string
  realTwitchUserId: string
}

export const accessTokenForUser = async (config: {
  req: Request
  prisma: PrismaClient
  userId?: string
}): Promise<UserAccessTokenWithId> => {
  if (!config.req.session.userId) {
    throw new Error("Not logged in")
  }

  const token = await config.prisma.userAccessToken.findFirst({
    where: {
      userId: config.userId ?? config.req.session.userId ?? "",
    },
  })

  if (!token || !token.twitchUserId) {
    throw new Error("No connected twitch account found")
  }

  if (useMockServer) {
    const mockAccessToken = await mockAuthProvider.getAccessTokenForUser(getTwitchUserId(""))

    // UserAccessToken & { twitchUserId: string }
    const mockToken: UserAccessTokenWithId = {
      ...token,
      twitchUserId: mockAccessToken?.userId ?? "",
      accessToken: mockAccessToken?.accessToken ?? "",
      refreshToken: mockAccessToken?.refreshToken ?? null,
      realTwitchUserId: token?.twitchUserId ?? "",
    }

    return mockToken
  }

  if (!token?.twitchUserId) {
    throw new Error("No connected twitch account found")
  }

  return {
    ...token,
    twitchUserId: token.twitchUserId ?? "",
    realTwitchUserId: token.twitchUserId ?? "",
  }
}

export const getTwitchUserId = <T = string | null | undefined>(twitchUserId: T) => {
  if (useMockServer) {
    return process.env.TWITCH_MOCK_USER_ID ?? ""
  }

  return twitchUserId
}
