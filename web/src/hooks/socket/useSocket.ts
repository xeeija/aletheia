import { Socket } from "@/types"
import { socket } from "@/utils/socket"
import { useEffect } from "react"
import { Socket as SocketDefault } from "socket.io-client"

export type SocketOptions = {
  disableSocket?: boolean
  onConnect?: (socket: Socket) => void
  onDisonnect?: (socket: Socket, reason: SocketDefault.DisconnectReason) => void
  cleanup?: (socket: Socket) => void
}

export const useSocket = (config: SocketOptions) => {
  useEffect(() => {
    if (config.disableSocket) {
      return
    }

    socket.on("connect", () => {
      config.onConnect?.(socket)
    })

    if (config.onDisonnect) {
      socket.on("disconnect", (reason) => config.onDisonnect?.(socket, reason))
    }

    socket.connect()

    return () => {
      socket.off("connect")

      if (config.onDisonnect) {
        socket.off("disconnect")
      }

      config.cleanup?.(socket)
      socket.disconnect()
    }
  }, [config])

  return socket
}
