import { apiClient, findRewardByLink } from "@/twitch/index.js"
import type { SocketHandler } from "@/types.js"

export const rewardLinkHandler: SocketHandler = (socket, { prisma }) => {
  socket.on("rewardlink:join", async (token) => {
    try {
      const { rewardLink } = await findRewardByLink(apiClient, prisma, token)

      // debug
      // console.log(`[socket] join in rewardlink/${token.slice(0, 6)} from ${socket.id.slice(0, 6)}`)

      // join a room for reward for updates and one for rewardlink
      await socket.join(`reward/${rewardLink.rewardId}`)
      await socket.join(`rewardlink/${rewardLink.id}`)
    } catch (err) {
      if (err instanceof Error) {
        if (err.message !== "Invalid token") {
          console.error("Error joining rewardLink room:", err.message)
        }
      } else {
        console.error("Error joining rewardLink room:", err)
      }
    }
  })

  // TODO: join for all rewards?
}
