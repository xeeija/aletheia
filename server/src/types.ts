import { PrismaClient, RandomWheelEntry, RandomWheelWinner } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { Request, Response } from "express"
import { Socket as SocketDefault, Server as SocketServerDefault } from "socket.io"

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
  apiClient: ApiClient
  eventSub: EventSubMiddleware
}

// Socket

export type SocketServer = SocketServerDefault<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>
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
  "wheel:spin": (spinResult: { winner: RandomWheelWinner; entry: RandomWheelEntry; rotation: number }) => void
  "wheel:update": (type: string) => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string) => void
}

export interface InterServerEvents {}

export interface SocketData {}

export enum SubscriptionType {
  redemptionAdd = "channel.channel_points_custom_reward_redemption.add",
}

export enum EventSubType {
  wheelSync = "wheelSync",
  rewardGroup = "rewardGroup",
}

export type EventSubConfigSync = {
  userId: string
  twitchUserId: string
  rewardId: string
}

export type EventSubConfigSyncAdd = {
  twitchUserId: string
  rewardId: string
  randomWheelId: string
  useInput: boolean
}

export type EventSubConfigGroup = {
  userId: string
  twitchUserId: string
}

export type AccessTokenResponse = {
  access_token: string
  refresh_token: string
  expires_in: number
  scope: string[]
  token_type: string
}

export type HttpError = Error & {
  statusCode: number
  body: string
}

// export type RewardGroupIE = RewardGroup & { items: RewardGroupItem[] } & { eventSubscriptions: EventSubscription[] }
