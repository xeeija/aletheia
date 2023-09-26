import { PrismaClient } from "@prisma/client";
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { config } from "dotenv";

config()

const clientId = process.env.TWITCH_CLIENT_ID ?? ""
const clientSecret = process.env.TWITCH_CLIENT_SECRET ?? ""

export const authProvider = new RefreshingAuthProvider({ clientId, clientSecret });

export const setupAuthProvider = async (prisma: PrismaClient) => {
  // const tokenData = JSON.parse(await readFile('./src/twitch/token/token.78823247.json', "utf-8"));

  const accessTokens = await prisma.userAccessToken.findMany()

  console.log("setup auth provider", accessTokens.length)

  accessTokens.forEach((token) => {
    const tokenNew: AccessToken = {
      ...token,
      obtainmentTimestamp: Number(token.obtainmentTimestamp)
    }

    if (token.twitchUserId) {
      authProvider.addUser(token.twitchUserId, tokenNew)
    }
    else {
      authProvider.addUserForToken(tokenNew)
    }
  })

  authProvider.onRefresh(async (userId, newTokenData) => {
    console.log("refresh token", userId)

    await prisma.userAccessToken.updateMany({
      where: {
        twitchUserId: userId,
      },
      data: {
        ...newTokenData,
        expiresIn: newTokenData.expiresIn ?? 12000
      }
    })

    // await writeFile(`./src/twitch/token/token.${userId}.json`, JSON.stringify({ ...newTokenData, userId }, null, 2), 'utf-8')
  });

  // TODO: Validate tokens every hour -- investigate if twurple automatically does that
  // setTimeout(() => {
  // })

  // await authProvider.addUserForToken(tokenData);
  // authProvider.addUser("78823247", tokenData)

}