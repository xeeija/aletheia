import { NonEmptyArray } from "type-graphql"
import { ColorThemeResolver } from "./ColorTheme"
import { CustomRewardResolver } from "./CustomReward"
import { EventSubResolver, RandomWheelSyncResolver } from "./EventSub"
import { RandomWheelResolver } from "./RandomWheel"
import { RandomWheelEntryResolver } from "./RandomWheelEntry"
import { RandomWheelMemberResolver } from "./RandomWheelMember"
import { RewardGroupResolver } from "./RewardGroup"
import { RewardLinkResolver } from "./RewardLink"
import { TwitchResolver } from "./Twitch"
import { UserResolver } from "./User"

// eslint-disable-next-line @typescript-eslint/ban-types
export const Resolvers: NonEmptyArray<Function> = [
  ColorThemeResolver,
  EventSubResolver,
  RandomWheelSyncResolver,
  RandomWheelResolver,
  RandomWheelMemberResolver,
  RandomWheelEntryResolver,
  RewardGroupResolver,
  RewardLinkResolver,
  CustomRewardResolver,
  TwitchResolver,
  UserResolver,
]

export * from "./types"

export * from "./ColorTheme"
export * from "./CustomReward"
export * from "./EventSub"
export * from "./RandomWheel"
export * from "./RandomWheelEntry"
export * from "./RandomWheelMember"
export * from "./RewardGroup"
export * from "./RewardLink"
export * from "./Twitch"
export * from "./User"
