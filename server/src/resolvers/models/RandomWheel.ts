import {
  AccessType,
  ColorTheme,
  ColorThemeInput,
  RandomWheelEntry,
  RandomWheelLike,
  RandomWheelMember,
  RandomWheelMemberFull,
  RandomWheelSync,
  RandomWheelWinner,
  User,
} from "@/resolvers/index.js"
import { Field, Float, InputType, Int, ObjectType } from "type-graphql"

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

@ObjectType("RandomWheel")
export class RandomWheelFull extends RandomWheel {
  @Field(() => [RandomWheelEntry])
  declare entries: RandomWheelEntry[]

  @Field(() => [RandomWheelWinner])
  declare winners: RandomWheelWinner[]

  @Field(() => [RandomWheelMemberFull])
  declare members: RandomWheelMember[]

  @Field(() => AccessType)
  declare access: AccessType

  @Field(() => User, { nullable: true })
  declare owner?: User

  @Field(() => ColorTheme, { nullable: true })
  declare theme?: ColorTheme
}

@InputType()
export class RandomWheelInput implements Partial<RandomWheel> {
  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => String, { nullable: true })
  accessType?: string

  @Field(() => Int, { nullable: true })
  spinDuration?: number

  @Field(() => Int, { nullable: true })
  fadeDuration?: number

  @Field(() => Boolean, { nullable: true })
  editAnonymous?: boolean

  @Field(() => Boolean, { nullable: true })
  uniqueEntries?: boolean

  @Field(() => ColorThemeInput, { nullable: true })
  theme?: ColorTheme | null // ColorThemeInput
}
