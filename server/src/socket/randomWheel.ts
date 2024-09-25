import type { SocketHandler } from "@/types.js"
import { loggerSocket as logger } from "@/utils/index.js"

// const prefix = "wheel"

export const randomWheelHandler: SocketHandler = (socket) => {
  socket.on("wheel:join", async (id) => {
    // const socketLog = `${socket.id.slice(0, 6)}`
    // logger.trace(`${socketLog} requests to join in wheel room with id ${id.slice(0, 7)}*`)

    // TODO: User authentication
    // prisma instance from socket.data to check wheel id

    logger.trace(`Join in room wheel/${id.slice(0, 7)}*`)
    await socket.join(`wheel/${id}`)
  })

  // Clients dont need to send anything to the server, I think?
  // The only "actions" are calling the Graphql API
  // which would then send the updates to the clients in the resolvers

  // [ ] spin:
  // [ ] entries update
  // [ ] winners update (?)
  // [ ] wheel settings update
}
