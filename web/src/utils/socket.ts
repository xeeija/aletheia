import type { Socket } from "@/types"
import { io as socketClient } from "socket.io-client"

// TODO: Socket Remarks
// best practises for react: https://socket.io/how-to/use-with-react#remarks-about-the-useeffect-hook
// State recovery, for handling temp disconnects: https://socket.io/docs/v4/connection-state-recovery
// Delivery guarantuees https://socket.io/docs/v4/delivery-guarantees

// "undefined" means the URL will be computed from the `window.location` object
// const socketUrl = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';

// set to localhost of backend server in development, leave blank for production to be proxied
const socketUrl = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? ""

export const socket: Socket = socketClient(socketUrl, {
  path: process.env.NEXT_PUBLIC_SOCKET_SERVER_PATH ?? "/api/socket",
  autoConnect: false,
  withCredentials: true,
})
