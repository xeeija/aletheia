import { RewardGroupItem, User } from "@/resolvers/index.js"
import { Field, InputType, Int, ObjectType } from "type-graphql"

@ObjectType("RewardGroup")
export class RewardGroup {
  @Field()
  id: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field()
  triggerSelected: boolean

  @Field()
  active: boolean

  user?: User

  @Field()
  userId: string

  @Field(() => Date, { nullable: true })
  cooldownExpiry?: Date | null

  items?: RewardGroupItem[]

  @Field(() => RewardGroupCount, { nullable: true })
  _count?: RewardGroupCount | null
}

@ObjectType("RewardGroupCount")
export class RewardGroupCount {
  @Field(() => Int)
  items: number
}

@InputType()
export class RewardGroupInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field({ nullable: true })
  active?: boolean

  @Field({ nullable: true })
  triggerSelected?: boolean
}

@InputType()
export class RewardGroupItemInput {
  @Field(() => String)
  rewardId: string

  @Field({ nullable: true })
  triggerCooldown?: boolean

  // @Field({ nullable: true })
  // rewardEnabled?: boolean
}

@ObjectType("RewardGroup")
export class RewardGroupFull extends RewardGroup {
  @Field(() => [RewardGroupItem], { nullable: true })
  declare items?: RewardGroupItem[]
}
