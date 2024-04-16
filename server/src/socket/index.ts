import { SocketHandler } from "@/types"
import { randomWheelHandler } from "./randomWheel"
import { rewardGroupHandler } from "./rewardGroup"
import { rewardLinkHandler } from "./rewardLink"

export * from "./randomWheel"
export * from "./rewardGroup"
export * from "./rewardLink"

export const socketHandlers: SocketHandler[] = [randomWheelHandler, rewardGroupHandler, rewardLinkHandler]
