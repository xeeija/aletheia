import { SocketHandler } from "@/types.js"
import { randomWheelHandler } from "./randomWheel.js"
import { rewardGroupHandler } from "./rewardGroup.js"
import { rewardLinkHandler } from "./rewardLink.js"

export * from "./randomWheel.js"
export * from "./rewardGroup.js"
export * from "./rewardLink.js"

export const socketHandlers: SocketHandler[] = [randomWheelHandler, rewardGroupHandler, rewardLinkHandler]
