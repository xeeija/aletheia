import { Socket } from "@/types"
import { socket } from "@/utils/socket"
import { EffectCallback, useEffect } from "react"

export type SocketSetupFn = (socket: Socket) => void | EffectCallback

// export type SocketOptions = {
//   disableSocket?: boolean
//   onConnect?: (socket: Socket) => void
//   onDisconnect?: (socket: Socket, reason: SocketDefault.DisconnectReason) => void
//   cleanup?: (socket: Socket) => void
//   setup?: SocketSetupFn
// }

// `setup` should be a useCallback function or defined outside of a React component,
// otherwise it will trigger on every render, which disconnects/connects the socket on every render
export const useSocket = (setupCallback: SocketSetupFn) => {
  // const setup = config.setup
  useEffect(() => {
    const cleanup = setupCallback?.(socket)
    socket.connect()

    return () => {
      cleanup?.()
      socket.off("connect")
      socket.disconnect()
    }
  }, [setupCallback])

  // const disable = config.disableSocket
  // const onConnect = config.onConnect
  // const onDisconnect = config.onDisconnect
  // const cleanup = config.cleanup

  // useEffect(() => {
  //   if (disable) {
  //     return
  //   }

  //   if (onConnect) {
  //     socket.on("connect", () => {
  //       onConnect(socket)
  //     })
  //   }

  //   if (onDisconnect) {
  //     socket.on("disconnect", (reason) => {
  //       onDisconnect(socket, reason)
  //     })
  //   }

  //   socket.connect()

  //   return () => {
  //     cleanup?.(socket)
  //     socket.disconnect()

  //     if (onDisconnect) {
  //       socket.off("disconnect")
  //     }
  //     if (onConnect) {
  //       socket.off("connect")
  //     }
  //   }
  // }, [disable, onConnect, onDisconnect, cleanup])

  return socket
}
