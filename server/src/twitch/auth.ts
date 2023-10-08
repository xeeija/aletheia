import { PrismaClient } from "@prisma/client";
import { ApiClient } from "@twurple/api";
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { config } from "dotenv";
import fetch from "node-fetch";
import { HttpError } from "src/types";
import { deleteManySubscriptionRedemptionAdd } from "./events";

config()

const clientId = process.env.TWITCH_CLIENT_ID ?? ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

export const authProvider = new RefreshingAuthProvider({ clientId, clientSecret });

export const setupAuthProvider = async (prisma: PrismaClient) => {
  const accessTokens = await prisma.userAccessToken.findMany()

  console.log("Setup Twitch AuthProvider with", accessTokens.length, "tokens")

  for (const token of accessTokens) {
    const tokenNew: AccessToken = {
      ...token,
      obtainmentTimestamp: Number(token.obtainmentTimestamp)
    }

    // returns the userId
    try {
      await authProvider.addUserForToken(tokenNew)
    }
    catch (err: unknown) {
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
        }
      })

      await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: token.twitchUserId
        }
      })

    }
  }

  authProvider.onRefresh(async (userId, newTokenData) => {
    // console.log("refresh token", userId)

    await prisma.userAccessToken.updateMany({
      where: {
        twitchUserId: userId,
      },
      data: {
        ...newTokenData,
        expiresIn: newTokenData.expiresIn ?? 12000
      }
    })

  })

  authProvider.onRefreshFailure((userId) => {
    console.warn("WARNING failed to refresh token for user", userId)
  })

}

export const handleTokenValidation = async (apiClient: ApiClient, prisma: PrismaClient) => {
  const intervalTime = (Number(process.env.TWITCH_VALIDATE_INTERVAL_SEC) * 1000) || 1000 * 60 * 60

  const validateTokenInterval = setInterval(async () => {

    const tokens = await prisma.userAccessToken.findMany({
      where: {
        refreshToken: { not: null },
        // obtainmentTimestamp: {
        //   gt: 
        // },
      }
    })

    const userTokensToDelete: string[] = []

    if (process.env.NODE_ENV !== "production") {
      console.log("[twitch] validating tokens...")
    }

    for (const token of tokens) {
      const response = await fetch("https://id.twitch.tv/oauth2/validate", {
        headers: {
          "Authorization": `Bearer ${token.accessToken}`
        }
      })

      if (response.status === 401) {
        const refreshResponse = await fetch("https://id.twitch.tv/oauth2/validate", {
          headers: {
            "Authorization": `Bearer ${token.refreshToken}`
          }
        })

        if (refreshResponse.status === 401) {
          // user revoked access, delete the token and all its subscriptions
          userTokensToDelete.push(token.userId)
        }

        if (refreshResponse.ok) {
          // maybe refresh token, or do nothing?

          // TODO: does it get added to the provider automatically?
          // if so, then onRefresh should trigger, which automatically updates in the DB 
          await authProvider.refreshAccessTokenForUser(token.userId)
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    const subscriptionsToDelete = await prisma.eventSubscription.findMany({
      where: {
        twitchUserId: { in: userTokensToDelete }
      }
    })

    if (userTokensToDelete.length > 0) {
      if (subscriptionsToDelete.length > 0) {
        await deleteManySubscriptionRedemptionAdd(apiClient, prisma, subscriptionsToDelete.map(s => s.id))
      }

      console.log(`[twitch] deleting ${userTokensToDelete.length} invalid tokens...`)
      await prisma.userAccessToken.deleteMany({
        where: {
          twitchUserId: { in: userTokensToDelete }
        }
      })
    }

    // if (process.env.NODE_ENV !== "production") {
    //   console.log("[twitch] finished validating tokens")
    // }
  }, intervalTime)

  // dont block the process from exiting, if nothing else is running
  validateTokenInterval.unref()

  // TODO: Validate tokens every hour -> check if twurple does that automatically

}
