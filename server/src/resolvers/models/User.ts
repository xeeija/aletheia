import {
  ColorTheme,
  EventSubscription,
  RandomWheel,
  RandomWheelLike,
  RandomWheelMember,
  RandomWheelWinner,
  RewardGroup,
  RewardLink,
  UserAccessToken,
} from "@/resolvers/index.js"
import { Field, InputType, Int, ObjectType } from "type-graphql"

@ObjectType("User")
export class User {
  @Field()
  id: string

  @Field()
  username: string

  password?: string

  @Field(() => String, { nullable: true })
  displayname?: string | null

  @Field(() => Date)
  createdAt: Date

  @Field(() => Date)
  updatedAt: Date

  standardTheme?: ColorTheme | null

  @Field(() => String, { nullable: true })
  standardThemeId?: string | null

  randomWheels?: RandomWheel[]

  drawnWinners?: RandomWheelWinner[]

  randomWheelMember?: RandomWheelMember[]

  likes?: RandomWheelLike[]

  colorThemes?: ColorTheme[]

  userAccessTokens?: UserAccessToken[]

  eventSubscriptions?: EventSubscription[]

  rewardLinks?: RewardLink[]

  rewardGroups?: RewardGroup[]

  @Field(() => UserCount, { nullable: true })
  _count?: UserCount | null
}

@ObjectType("UserCount")
export class UserCount {
  @Field(() => Int)
  randomWheels: number

  @Field(() => Int)
  drawnWinners: number

  @Field(() => Int)
  randomWheelMember: number

  @Field(() => Int)
  likes: number

  @Field(() => Int)
  colorThemes: number

  @Field(() => Int)
  userAccessTokens: number

  @Field(() => Int)
  eventSubscriptions: number

  @Field(() => Int)
  rewardLinks: number

  @Field(() => Int)
  rewardGroups: number
}

@InputType()
export class UserInput implements Partial<User> {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  displayname?: string
}
