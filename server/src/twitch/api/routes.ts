import { PrismaClient } from "@/generated/prisma/client.js"
import { authProvider, getRewardIconData, updateRewardByLink } from "@/twitch/index.js"
import type { AccessTokenResponse } from "@/types.js"
import { loggerTwitchAuth as logger, randomBase64Url } from "@/utils/index.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { ApiClient } from "@twurple/api"
import { getTokenInfo } from "@twurple/auth"
import { Router } from "express"

type TwitchRouter = (apiClient: ApiClient, prisma: PrismaClient) => Router

// needs an explicit type annotation, with symlinked node_modules (eg. pnpm)
// see https://github.com/microsoft/TypeScript/issues/42873#issuecomment-2065572017
// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1519138189
export const twitchRouter: TwitchRouter = (apiClient: ApiClient, prisma: PrismaClient) => {
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
        logger.warn("Received access token with invalid 'state' parameter (unauthorized)")
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

      const body = (await response.json()) as AccessTokenResponse

      const tokenInfo = await getTokenInfo(body.access_token, process.env.TWITCH_CLIENT_ID)

      if (!req.session.userId) {
        // res.status(400).json({ respone: body, message: "userId of token not found" })
        res.status(401).send({ error: "Not logged in" })

        return
      }

      if (!tokenInfo.userId) {
        logger.warn("userId of access token is null or empty:", JSON.stringify(tokenInfo.userId))
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
      logger.error("Failed to create access token:", err)
      if (err instanceof Error) {
        res.send(500).send({ error: err.message })
        return
      }

      res.send(500).send({ error: "unkown error" })
    }
  })

  router.post("/state", async (_, res) => {
    const state = randomBase64Url(16)

    const result = await prisma.twitchState.create({ data: { state } })

    // remove state after 2 minutes
    setTimeout(async () => {
      try {
        await prisma.twitchState.deleteMany({
          where: {
            state: result.state ?? "",
          },
        })
      } catch (err) {
        //
        if (err instanceof PrismaClientKnownRequestError && err.code === "P2025") {
          // state is already deleted in db, so do nothing
        }

        // other unexpected error occured
        throw err
      }
    }, 120 * 1000)

    res.send(result.state)
  })

  router.get("/reward/enable/:token", async (req, res) => {
    const token = req.params.token
    const enable = typeof req.query.enable === "string" ? req.query.enable === "true" : null

    try {
      const updatedReward = await updateRewardByLink(apiClient, prisma, token, "enable", (reward) => ({
        isEnabled: enable ?? !reward.isEnabled,
      }))

      res.send(getRewardIconData(updatedReward))
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send({ error: err.message })
        return
      }

      res.status(500).send({ error: "Unknown error" })
    }
  })

  router.get("/reward/pause/:token", async (req, res) => {
    const token = req.params.token
    const pause = typeof req.query.pause === "string" ? req.query.enable === "true" : null

    try {
      const updatedReward = await updateRewardByLink(apiClient, prisma, token, "pause", (reward) => ({
        isPaused: pause ?? !reward.isPaused,
      }))

      res.send(getRewardIconData(updatedReward))
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).send({ error: err.message })
        return
      }

      res.status(500).send({ error: "Unknown error" })
    }
  })

  // eventSubMiddleware.apply(app);
  // await setupAuthProvider(prisma)

  // app.use("/api/twitch", router)

  return router
}
