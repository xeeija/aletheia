import { SocketHandler } from "src/types";

// const prefix = "wheel"

export const randomWheelHandlers: SocketHandler = (socket) => {

  socket.on("wheel:join", (id) => {
    // console.log(`join wheel/${id.substring(0, 6)}`)

    // TODO: User authentication
    // prisma instance from socket.data to check wheel id

    socket.join(`wheel/${id}`)

  })

  // Clients dont need to send anything to the server, I think?
  // The only "actions" are calling the Graphql API
  // which would then send the updates to the clients in the resolvers

  // [ ] spin:
  // [ ] entries update
  // [ ] winners update (?)
  // [ ] wheel settings update

}
