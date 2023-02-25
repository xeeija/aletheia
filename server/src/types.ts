import { Request, Response } from "express";
import { PrismaClient, RandomWheelEntry, RandomWheelWinner } from "@prisma/client"
import { Server as SocketServerDefault, Socket as SocketDefault } from "socket.io";

// Define custom properties on the session
declare module "express-session" {
  interface Session {
    userId: string
  }
}

// TODO: Need a better name
// Needed for GraphQL resolvers
export type GraphqlContext = {
  req: Request
  res: Response
  prisma: PrismaClient
  socketIo: SocketServer
}

// Socket

export type SocketServer = SocketServerDefault<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
export type Socket = SocketDefault<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>

export type SocketHandler = (
  socket: Socket, //Socket<ClientToServerEvents, ServerToClientEvents>,
  options: {
    socketIo: SocketServer //Server<ClientToServerEvents, ServerToClientEvents>
    prisma: PrismaClient
  }
) => void

export interface ServerToClientEvents {
  "wheel:entries": (type: "add" | "delete" | "update" | "clear") => void
  // "wheel:winners": (winner: RandomWheelWinner) => void
  "wheel:spin": (spinResult: {
    winner: RandomWheelWinner,
    entry: RandomWheelEntry,
    rotation: number,
  }) => void
  "wheel:update": (type: string) => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string,) => void
}

export interface InterServerEvents { }

export interface SocketData { }
