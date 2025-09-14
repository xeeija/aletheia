import { NonEmptyArray } from "type-graphql"
import { ColorThemeResolver } from "./ColorTheme.js"
import { CustomRewardResolver } from "./CustomReward.js"
import { EventSubResolver, RandomWheelSyncResolver } from "./EventSub.js"
import { RandomWheelResolver } from "./RandomWheel.js"
import { RandomWheelEntryResolver } from "./RandomWheelEntry.js"
import { RandomWheelMemberResolver } from "./RandomWheelMember.js"
import { RandomWheelWinnerResolver } from "./RandomWheelWinner.js"
import { RewardGroupResolver } from "./RewardGroup.js"
import { RewardLinkResolver } from "./RewardLink.js"
import { TwitchResolver } from "./Twitch.js"
import { UserResolver } from "./User.js"

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const Resolvers: NonEmptyArray<Function> = [
  ColorThemeResolver,
  EventSubResolver,
  RandomWheelSyncResolver,
  RandomWheelResolver,
  RandomWheelMemberResolver,
  RandomWheelEntryResolver,
  RandomWheelWinnerResolver,
  RewardGroupResolver,
  RewardLinkResolver,
  CustomRewardResolver,
  TwitchResolver,
  UserResolver,
]

export * from "./models/index.js"
export * from "./types.js"

export * from "./ColorTheme.js"
export * from "./CustomReward.js"
export * from "./EventSub.js"
export * from "./RandomWheel.js"
export * from "./RandomWheelEntry.js"
export * from "./RandomWheelMember.js"
export * from "./RandomWheelWinner.js"
export * from "./RewardGroup.js"
export * from "./RewardLink.js"
export * from "./Twitch.js"
export * from "./User.js"
