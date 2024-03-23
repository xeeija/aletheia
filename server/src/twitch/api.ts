import { authProvider } from "@/twitch"
import type { AccessTokenResponse } from "@/types"
import { randomBase64Url } from "@/utils"
import { PrismaClient } from "@prisma/client"
import { ApiClient, HelixCustomReward, HelixUpdateCustomRewardData } from "@twurple/api"
import { getTokenInfo } from "@twurple/auth"
import { Router } from "express"

export const twitchRouter = (apiClient: ApiClient, prisma: PrismaClient) => {
  const router = Router()

  router.get("/oauth2/token", async (req, res) => {
    if (req.query.error) {
      res.status(400).send({ error: req.query.error, errorMessage: req.query.error_message })

      return
    }

    if (req.query.state) {
      const state = typeof req.query.state === "string" ? req.query.state : ""

      const validState = await prisma.twitchState.findFirst({
        where: {
          state: state ?? "-",
        },
      })

      if (!validState?.state) {
        console.warn("[twitch] invalid state")
        res.status(401).send({ error: "invalid state" })
        return
      }

      await prisma.twitchState.delete({ where: { state: validState.state ?? "" } })
    }

    // get access token for user with code

    const params = new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID ?? "",
      client_secret: process.env.TWITCH_CLIENT_SECRET ?? "",
      grant_type: "authorization_code",
      code: `${req.query.code?.toString()}`,
    }).toString()
    const redirectUri = `redirect_uri=${process.env.TWITCH_REDIRECT_URI}/api/twitch/oauth2/token`

    try {
      const response = await fetch(`https://id.twitch.tv/oauth2/token?${params}&${redirectUri}`, {
        method: "POST",
      })

      const body = <AccessTokenResponse>await response.json()

      const tokenInfo = await getTokenInfo(body.access_token, process.env.TWITCH_CLIENT_ID)

      if (!tokenInfo.userId) {
        // res.status(400).json({ respone: body, message: "userId of token not found" })
        res.status(400).send({ error: "userId of token not found" })

        return
      }

      // const userAccessToken =
      await prisma.userAccessToken.create({
        data: {
          accessToken: body.access_token,
          refreshToken: body.refresh_token,
          expiresIn: body.expires_in,
          obtainmentTimestamp: Date.now(),
          scope: body.scope,
          userId: req.session.userId,
          twitchUserId: tokenInfo.userId,
          twitchUsername: tokenInfo.userName,
        },
      })

      authProvider.addUser(tokenInfo.userId, {
        accessToken: body.access_token,
        refreshToken: body.refresh_token,
        expiresIn: body.expires_in,
        obtainmentTimestamp: Date.now(),
        scope: body.scope,
      })

      res.send({ error: null })

      // TODO: success code as query param and open a success popup
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        res.send(500).send({ error: err.message })
        return
      }

      res.send(500).send({ error: "unkown error" })
    }
  })

  router.post("/state", async (_, res) => {
    const state = randomBase64Url(16)

    const result = await prisma.twitchState.create({ data: { state } })

    // remove state after 1 minute
    setTimeout(async () => {
      await prisma.twitchState.delete({
        where: {
          state: result.state ?? "",
        },
      })
    }, 60 * 1000)

    res.send(result.state)
  })

  router.get("/reward/enable/:token", async (req, res) => {
    const token = req.params.token
    const enable = typeof req.query.enable === "string" ? req.query.enable === "true" : null

    try {
      const updatedReward = await updateRewardByLink(apiClient, prisma, token, "enable", (reward) => ({
        isEnabled: enable ?? !reward.isEnabled,
      }))

      res.send(updatedReward)
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message)
        return
      }

      res.status(500).send("Unknown error")
    }
  })

  router.get("/reward/pause/:token", async (req, res) => {
    const token = req.params.token
    const pause = typeof req.query.pause === "string" ? req.query.enable === "true" : null

    try {
      const updatedReward = await updateRewardByLink(apiClient, prisma, token, "pause", (reward) => ({
        isPaused: pause ?? !reward.isPaused,
      }))

      res.send(updatedReward)
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send(err.message)
        return
      }

      res.status(500).send("Unknown error")
    }
  })

  // eventSubMiddleware.apply(app);
  // await setupAuthProvider(prisma)

  // app.use("/api/twitch", router)

  return router
}

const updateRewardByLink = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  token: string,
  type: "enable" | "pause",
  update: (reward: HelixCustomReward) => HelixUpdateCustomRewardData
) => {
  const rewardLink = await prisma.rewardLink.findUnique({
    where: { token },
  })

  if (!rewardLink || rewardLink.type !== type) {
    throw Error("Invalid token")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: rewardLink.userId,
    },
    include: {
      userAccessTokens: true,
    },
  })

  const twitchUserId = user?.userAccessTokens[0].twitchUserId

  if (!twitchUserId) {
    throw Error("No twitch account connected")
  }

  const reward = await apiClient.channelPoints.getCustomRewardById(twitchUserId, rewardLink.rewardId)

  if (!reward) {
    throw Error("Reward not found")
  }

  const updatedReward = await apiClient.channelPoints.updateCustomReward(twitchUserId, rewardLink.rewardId, {
    ...reward,
    ...update(reward),
  })

  return updatedReward
}
