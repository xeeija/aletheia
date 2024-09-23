import { useMockServer } from "@/twitch/index.js"
import { addMockAccessTokens } from "@/twitch/mock/index.js"
import type { HttpError } from "@/types.js"
import { loggerTwitch as logger, loggerTwitchAuth as loggerAuth } from "@/utils/index.js"
import { PrismaClient } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { type AccessToken, RefreshingAuthProvider } from "@twurple/auth"
import "dotenv/config"

const clientId = process.env.TWITCH_CLIENT_ID ?? ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

const mockClientId = process.env.TWITCH_MOCK_CLIENT_ID ?? ""
const mockClientSecret = process.env.TWITCH_MOCK_CLIENT_SECRET ?? ""
// const mockAccessToken = process.env.TWITCH_MOCK_ACCESS_TOKEN ?? ""

export const authProvider = new RefreshingAuthProvider({ clientId, clientSecret })

// export const mockAuthProvider = new StaticAuthProvider(mockClientId, mockAccessToken, [
//   "channel:read:redemptions",
//   "channel:manage:redemptions",
// ])
export const mockAuthProvider = new RefreshingAuthProvider({ clientId: mockClientId, clientSecret: mockClientSecret })

export const setupAuthProvider = async (prisma: PrismaClient) => {
  if (useMockServer) {
    logger.info("Using twitch mock API server")

    await addMockAccessTokens(mockAuthProvider)
  }

  const accessTokens = await prisma.userAccessToken.findMany()

  loggerAuth.info("Setup Twitch AuthProvider with", accessTokens.length, "access tokens")

  for (const token of accessTokens) {
    const tokenNew: AccessToken = {
      ...token,
      obtainmentTimestamp: Number(token.obtainmentTimestamp),
    }

    // returns the userId
    try {
      await authProvider.addUserForToken(tokenNew)
    } catch (err: unknown) {
      if (!(err instanceof Error)) {
        throw err
      }

      if (!("statusCode" in err)) {
        throw err
      }

      const httpError = <HttpError>err

      if (httpError.statusCode !== 400 && httpError.statusCode !== 401) {
        throw err
      }

      const userLog = `${token.twitchUsername} (${token.twitchUserId})`
      loggerAuth.warn(`Removing invalid user access token for ${userLog}\n`, JSON.parse(httpError.body))

      await prisma.eventSubscription.deleteMany({
        where: {
          twitchUserId: token.twitchUserId ?? "",
        },
      })

      await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: token.twitchUserId,
        },
      })
    }
  }

  authProvider.onRefresh(async (userId, newTokenData) => {
    loggerAuth.debug(`Refreshing access token for user ${userId})`)

    await prisma.userAccessToken.updateMany({
      where: {
        twitchUserId: userId,
      },
      data: {
        ...newTokenData,
        expiresIn: newTokenData.expiresIn ?? 12000,
      },
    })
  })

  authProvider.onRefreshFailure((userId) => {
    loggerAuth.warn(`Failed to refresh access token for user ${userId}`)
  })
}

export const handleTokenValidation = (apiClient: ApiClient, prisma: PrismaClient) => {
  const intervalTime = Number(process.env.TWITCH_VALIDATE_INTERVAL_SEC) * 1000 || 1000 * 60 * 60 * 4

  const validateTokenInterval = setInterval(async () => {
    const tokens = await prisma.userAccessToken.findMany({
      where: {
        refreshToken: { not: null },
        // obtainmentTimestamp: {
        //   gt:
        // },
      },
    })

    const userTokensToDelete: string[] = []

    loggerAuth.trace("Validating access tokens...")

    for await (const token of tokens) {
      const response = await fetch("https://id.twitch.tv/oauth2/validate", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })

      const userLog = `${token.twitchUsername} (${token.twitchUserId})`

      if (response.status === 401 && process.env.TWITCH_REFRESH_ON_VALIDATE !== "0") {
        loggerAuth.debug(`Failed to validate access token with status ${response.status} for user ${userLog}`)

        if (token.twitchUserId) {
          // try {
          //   await authProvider.refreshAccessTokenForUser(token.twitchUserId)
          // }
          // catch {
          //   logger.error("validate: refresh error")
          // }

          const refreshResponse = await fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          })

          loggerAuth.debug(`Refreshing access token for user ${userLog}: status ${refreshResponse.status}`)

          if (refreshResponse.status === 401) {
            try {
              const refreshedToken = await authProvider.refreshAccessTokenForUser(token.twitchUserId)

              if (!refreshedToken.refreshToken) {
                throw new Error(`Refresh token is null or empty`)
              }
            } catch (err) {
              const userLog = `${token.twitchUsername} (${token.twitchUserId}, ${token.userId.slice(0, 7)})`
              loggerAuth.error(`Failed to refresh access token for user ${userLog}:`, err)

              // user revoked access? or token got invalid somehow, delete the token and all its subscriptions
              if (process.env.TWITCH_DELETE_ON_VALIDATE !== "0") {
                userTokensToDelete.push(token.twitchUserId)
              }
            }
          }

          // if (refreshResponse.ok) {
          //   // maybe refresh token, or do nothing?

          //   // TODO: does it get added to the provider automatically?
          //   // if so, then onRefresh should trigger, which automatically updates in the DB
          // }

          // }
        }
      }

      // await new Promise((resolve) => setTimeout(resolve, 100))
    }

    if (userTokensToDelete.length > 0) {
      // if (process.env.TWITCH_DELETE_EVENTSUB === "1") {
      const subscriptionsToDelete = await prisma.eventSubscription.findMany({
        where: {
          twitchUserId: { in: userTokensToDelete },
        },
      })

      if (subscriptionsToDelete.length > 0) {
        loggerAuth.debug(`Deleting ${subscriptionsToDelete.length} eventsub subscriptions after validate [dry-run]`)

        // TODO: delete subscriptions?
        // await deleteManySubscriptionsSync(
        //   apiClient,
        //   prisma,
        //   subscriptionsToDelete.map((s) => s.id)
        // )
      }
      // }

      loggerAuth.debug(`Deleting ${userTokensToDelete.length} invalid access tokens after validate`)

      const deleted = await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: { in: userTokensToDelete },
        },
      })

      if (deleted.count > 0) {
        loggerAuth.info(`Deleted ${deleted.count} invalid access tokens`)
        loggerAuth.debug(`Deleted access token of users: ${userTokensToDelete.join(", ")}`)
      }
    }

    // if (showDebug) {
    //   logger.info("[twitch] finished validating tokens")
    // }
  }, intervalTime)

  // dont block the process from exiting, if nothing else is running
  validateTokenInterval.unref()

  // TODO: Validate tokens every hour -> check if twurple does that automatically
}
