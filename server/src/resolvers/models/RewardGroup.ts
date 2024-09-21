import { RewardGroupItem, User } from "@/resolvers/models/index.js"
import { Field, Int, ObjectType } from "type-graphql"

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
