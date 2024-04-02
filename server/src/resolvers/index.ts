import { NonEmptyArray } from "type-graphql"
import { ColorThemeResolver } from "./ColorTheme"
import { CustomRewardResolver } from "./CustomReward"
import { EventSubResolver } from "./EventSub"
import { RandomWheelResolver } from "./RandomWheel"
import { RewardGroupResolver } from "./RewardGroup"
import { TwitchResolver } from "./Twitch"
import { UserResolver } from "./User"

// eslint-disable-next-line @typescript-eslint/ban-types
export const Resolvers: NonEmptyArray<Function> = [
  ColorThemeResolver,
  EventSubResolver,
  RandomWheelResolver,
  RewardGroupResolver,
  CustomRewardResolver,
  TwitchResolver,
  UserResolver,
]

export * from "./types"

export * from "./ColorTheme"
export * from "./CustomReward"
export * from "./EventSub"
export * from "./RandomWheel"
export * from "./RewardGroup"
export * from "./Twitch"
export * from "./User"
