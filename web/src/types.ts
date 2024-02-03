import { NextApiRequest, NextApiResponse } from "next"
import { Socket as SocketDefault } from "socket.io-client"
import { RandomWheelEntry, RandomWheelWinner } from "./generated/graphql"

export type ThemeColor = "primary" | "secondary" | "success" | "error" | "info" | "warning"

export type ApiHandler<T = unknown> = (req: NextApiRequest, res: NextApiResponse<T>) => void

// Events copied from server
export type Socket = SocketDefault<ServerToClientEvents, ClientToServerEvents>

export interface ServerToClientEvents {
  "wheel:entries": (type: "add" | "delete" | "update" | "clear") => void
  // "wheel:winners": (winner: RandomWheelWinner) => void
  "wheel:spin": (spinResult: { winner: RandomWheelWinner; entry: RandomWheelEntry; rotation: number }) => void
  "wheel:update": (type: string) => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string) => void
}
