import { NonEmptyArray } from "type-graphql"
import { ColorThemeResolver } from "./ColorTheme"
import { RandomWheelResolver } from "./RandomWheel"
import { CustomRewardResolver, EventSubscriptionResolver, TwitchResolver } from "./Twitch"
import { UserResolver } from "./User"

// export * from "./ColorTheme"
// export * from "./RandomWheel"
// export * from "./Twitch"
// export * from "./User"

export const Resolvers: NonEmptyArray<Function> | NonEmptyArray<string> = [
  UserResolver,
  RandomWheelResolver,
  ColorThemeResolver,
  TwitchResolver,
  CustomRewardResolver,
  EventSubscriptionResolver
]