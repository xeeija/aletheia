import { apiClient, findRewardByLink } from "@/twitch/index.js"
import type { SocketHandler } from "@/types.js"
import { loggerSocket as logger } from "@/utils/index.js"

export const rewardLinkHandler: SocketHandler = (socket, { prisma }) => {
  socket.on("rewardlink:join", async (token) => {
    try {
      const socketLog = `${socket.id.slice(0, 6)}`
      // logger.debug(`Client ${socketLog} joined in rewardlink/${token.slice(0, 6)}*`)
      logger.trace(`${socketLog} requests to join in rewardlink room with token ${token.slice(0, 6)}*`)

      const { rewardLink } = await findRewardByLink(apiClient, prisma, token)

      logger.trace(`Join in rewardlink/${rewardLink.id.slice(0, 6)}* and reward/${rewardLink.rewardId.slice(0, 6)}*`)

      // join a room for reward for updates and one for rewardlink
      await socket.join(`reward/${rewardLink.rewardId}`)
      await socket.join(`rewardlink/${rewardLink.id}`)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message !== "Invalid token") {
          logger.error("Failed to join rewardLink room:", err.message)
        } else {
          logger.debug("Failed to join rewardLink room:", err.message)
        }
      } else {
        logger.error("Failed to join rewardLink room:", err)
      }
    }
  })

  // TODO: join for all rewards?
}
