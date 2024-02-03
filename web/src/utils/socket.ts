import { io } from "socket.io-client"

// TODO: Socket Remarks
// best practises for react: https://socket.io/how-to/use-with-react#remarks-about-the-useeffect-hook
// State recovery, for handling temp disconnects: https://socket.io/docs/v4/connection-state-recovery
// Delivery guarantuees https://socket.io/docs/v4/delivery-guarantees

// "undefined" means the URL will be computed from the `window.location` object
// const socketUrl = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
const socketUrl =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:4000"

export const socket = io(socketUrl, {
  path: process.env.NEXT_PUBLIC_SOCKET_SERVER_PATH ?? "/socket",
  autoConnect: false,
})
