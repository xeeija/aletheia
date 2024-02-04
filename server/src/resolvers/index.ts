import { NonEmptyArray } from "type-graphql"
import { ColorThemeResolver } from "./ColorTheme"
import { RandomWheelResolver } from "./RandomWheel"
import { CustomRewardResolver, EventSubscriptionResolver, TwitchResolver } from "./Twitch"
import { UserResolver } from "./User"

// export * from "./ColorTheme"
// export * from "./RandomWheel"
// export * from "./Twitch"
// export * from "./User"

// eslint-disable-next-line @typescript-eslint/ban-types
export const Resolvers: NonEmptyArray<Function> = [
  UserResolver,
  RandomWheelResolver,
  ColorThemeResolver,
  TwitchResolver,
  CustomRewardResolver,
  EventSubscriptionResolver,
]
