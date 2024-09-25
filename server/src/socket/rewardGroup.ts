import type { SocketHandler } from "@/types.js"
import { loggerSocket as logger } from "@/utils/index.js"

export const rewardGroupHandler: SocketHandler = (socket) => {
  socket.on("rewardgroup:join", async () => {
    const userId = socket.request.session.userId

    if (!userId) {
      // socket.disconnect()
      return
    }

    // logger.debug(`Join in room rewardgroup/${userId.slice(0, 7)}* from ${socket.id.slice(0, 6)}*`)
    logger.trace(`Join in room rewardgroup/${userId.slice(0, 7)}*`)

    await socket.join(`rewardgroup/${userId}`)
  })
}
