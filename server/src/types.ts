import { RewardGroupFull } from "@/resolvers/index.js"
import { PrismaClient, type RandomWheel, type RandomWheelEntry, type RandomWheelWinner } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { Request, Response } from "express"
import { Session } from "express-session"
import { Socket as SocketDefault, Server as SocketServerDefault } from "socket.io"

// Define custom properties on the session
declare module "express-session" {
  interface Session {
    userId: string
  }
}

// augment the Socket.request type from socket.io (request is of type IncomingMessage) and add session
declare module "http" {
  interface IncomingMessage {
    session: Session
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
  "wheel:spin": (spinResult: SpinResult) => void
  "wheel:update": (type: string) => void
  "rewardgroup:pause": (rewardGroup: RewardGroupFull[], paused: boolean) => void
  "reward:update": (reward: RewardIconData) => void
  "rewardlink:delete": () => void
}

export interface ClientToServerEvents {
  "wheel:join": (wheelId: string) => void
  "wheel:entries": (type: "add" | "update", wheelId: string) => void
  "rewardgroup:join": () => void
  "rewardlink:join": (token: string) => void
}

// export interface InterServerEvents {}
export type InterServerEvents = Record<string, never>

// export interface SocketData {}
export type SocketData = Record<string, never>

export type SpinResult = {
  winner: RandomWheelWinner
  entry: RandomWheelEntry
  wheel: RandomWheel & { editable: boolean }
}

export enum SubscriptionType {
  redemptionAdd = "channel.channel_points_custom_reward_redemption.add",
  rewardUpdate = "channel.channel_points_custom_reward.update",
}

export enum EventSubType {
  wheelSync = "wheelSync",
  rewardGroup = "rewardGroup",
  rewardLink = "rewardLink",
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
  uniqueEntries: boolean
}

export type EventSubConfigGroup = {
  userId: string
  twitchUserId: string
}

export type EventSubConfigRewardUpdate = {
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

export type RewardLinkType = "enable" | "pause"

export type RewardIconData = {
  id: string
  title: string
  backgroundColor: string
  image: string
  isPaused: boolean
  isEnabled: boolean
  isInStock: boolean
}

// export type RewardGroupIE = RewardGroup & { items: RewardGroupItem[] } & { eventSubscriptions: EventSubscription[] }
