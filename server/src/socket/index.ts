import { SocketHandler } from "@/types"
import { randomWheelHandler } from "./randomWheel"
import { rewardGroupHandler } from "./rewardGroup"

export * from "./randomWheel"
export * from "./rewardGroup"

export const socketHandlers: SocketHandler[] = [randomWheelHandler, rewardGroupHandler]
