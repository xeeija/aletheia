import { useMockServer } from "@/twitch"
import { addMockAccessTokens } from "@/twitch/mock"
import type { HttpError } from "@/types"
import { PrismaClient } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth"
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
    console.log("[twitch] Using twitch mock API server")

    await addMockAccessTokens(mockAuthProvider)
  }

  const accessTokens = await prisma.userAccessToken.findMany()

  console.log("[twitch] Setup Twitch AuthProvider with", accessTokens.length, "tokens")

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

      console.log("[twitch] removing invalid token\n", JSON.parse(httpError.body))

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
    if (process.env.NODE_ENV !== "production") {
      console.log(`[twitch] refresh token (${userId.slice(0, 4)})`)
    }

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
    console.warn(`[twitch] WARNING: failed to refresh token (${userId.slice(0, 4)})`)
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

    if (process.env.NODE_ENV !== "production") {
      console.log("[twitch] validating tokens...")
    }

    for (const token of tokens) {
      const response = await fetch("https://id.twitch.tv/oauth2/validate", {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      })

      if (response.status === 401 && process.env.TWITCH_REFRESH_ON_VALIDATE !== "0") {
        if (process.env.NODE_ENV !== "production") {
          console.log(`[twitch] validate: access response ${response.status} (${token.twitchUserId?.slice(0, 4)})`)
        }

        if (token.twitchUserId) {
          // try {
          //   await authProvider.refreshAccessTokenForUser(token.twitchUserId)
          // }
          // catch {
          // console.log("[twitch] validate: refresh error")

          const refreshResponse = await fetch("https://id.twitch.tv/oauth2/validate", {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          })

          if (process.env.NODE_ENV !== "production") {
            console.log(
              `[twitch] validate: refresh response ${refreshResponse.status} (${token.twitchUserId?.slice(0, 4)})`
            )
          }

          if (refreshResponse.status === 401) {
            try {
              const refreshedToken = await authProvider.refreshAccessTokenForUser(token.twitchUserId)

              if (!refreshedToken.refreshToken) {
                throw new Error("Token invalid")
              }
            } catch {
              // user revoked access? or token got invalid somehow, delete the token and all its subscriptions
              userTokensToDelete.push(token.twitchUserId)
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
      const subscriptionsToDelete = await prisma.eventSubscription.findMany({
        where: {
          twitchUserId: { in: userTokensToDelete },
        },
      })

      if (subscriptionsToDelete.length > 0) {
        console.log(`[twitch] validate: deleting ${subscriptionsToDelete.length} subscriptions...`)
        // TODO: delete subscriptions?
        // await deleteManySubscriptionsSync(
        //   apiClient,
        //   prisma,
        //   subscriptionsToDelete.map((s) => s.id)
        // )
      }

      // if (process.env.NODE_ENV !== "production") {
      console.log(`[twitch] validate: deleting ${userTokensToDelete.length} invalid tokens...`)
      // }

      const deleted = await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: { in: userTokensToDelete },
        },
      })

      if (deleted.count > 0) {
        console.log(`[twitch] validate: deleted ${deleted.count} invalid tokens...`)
      }
    }

    // if (process.env.NODE_ENV !== "production") {
    //   console.log("[twitch] finished validating tokens")
    // }
  }, intervalTime)

  // dont block the process from exiting, if nothing else is running
  validateTokenInterval.unref()

  // TODO: Validate tokens every hour -> check if twurple does that automatically
}
