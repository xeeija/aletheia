import {
  AccessType,
  ColorTheme,
  RandomWheelEntry,
  RandomWheelLike,
  RandomWheelMember,
  RandomWheelSync,
  RandomWheelWinner,
  User,
} from "@/resolvers/models/index.js"
import { Field, Float, Int, ObjectType } from "type-graphql"

@ObjectType("RandomWheel")
export class RandomWheel {
  @Field()
  id: string

  @Field()
  slug: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => Date)
  createdAt: Date

  @Field()
  uniqueEntries: boolean

  @Field()
  editAnonymous: boolean

  access?: AccessType

  @Field()
  accessType: string

  @Field(() => Float)
  rotation: number

  @Field(() => Int)
  spinDuration: number

  @Field(() => Int)
  fadeDuration: number

  owner?: User | null

  @Field(() => String, { nullable: true })
  ownerId?: string | null

  theme?: ColorTheme | null

  @Field(() => String, { nullable: true })
  themeId?: string | null

  @Field(() => String, { nullable: true })
  shareToken?: string | null

  entries?: RandomWheelEntry[]

  winners?: RandomWheelWinner[]

  members?: RandomWheelMember[]

  likes?: RandomWheelLike[]

  wheelSync?: RandomWheelSync[]

  @Field(() => RandomWheelCount, { nullable: true })
  _count?: RandomWheelCount | null
}

@ObjectType("RandomWheelCount")
export class RandomWheelCount {
  @Field(() => Int)
  entries: number

  @Field(() => Int)
  winners: number

  @Field(() => Int)
  members: number

  @Field(() => Int)
  likes: number

  @Field(() => Int)
  wheelSync: number
}
