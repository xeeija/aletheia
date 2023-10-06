import { PrismaClient } from "@prisma/client";
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { config } from "dotenv";

config()

const clientId = process.env.TWITCH_CLIENT_ID ?? ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

export const authProvider = new RefreshingAuthProvider({ clientId, clientSecret });

export const setupAuthProvider = async (prisma: PrismaClient) => {
  const accessTokens = await prisma.userAccessToken.findMany()

  console.log("Setup Twitch AuthProvider with", accessTokens.length, "tokens")

  accessTokens.forEach((token) => {
    const tokenNew: AccessToken = {
      ...token,
      obtainmentTimestamp: Number(token.obtainmentTimestamp)
    }

    // if (token.twitchUserId) {
    //   authProvider.addUser(token.twitchUserId, tokenNew)
    // }
    // else {
    authProvider.addUserForToken(tokenNew)
    // }
  })

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

  // TODO: Validate tokens every hour -- investigate if twurple automatically does that
  // setTimeout(() => {
  // })

  // await authProvider.addUserForToken(tokenData);
  // authProvider.addUser("78823247", tokenData)

}