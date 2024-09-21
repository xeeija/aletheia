import type { SocketHandler } from "@/types.js"

export const rewardGroupHandler: SocketHandler = (socket) => {
  socket.on("rewardgroup:join", async () => {
    const userId = socket.request.session.userId

    if (!userId) {
      // socket.disconnect()
      return
    }

    // debug
    // console.log(`[socket] join in rewardgroup/${userId.slice(0, 7)} from ${socket.id.slice(0, 6)}`)
    await socket.join(`rewardgroup/${userId}`)
  })
}
