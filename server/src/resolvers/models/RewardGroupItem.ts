import { RewardGroup } from "@/resolvers/index.js"
import { Field, ObjectType } from "type-graphql"

@ObjectType("RewardGroupItem")
export class RewardGroupItem {
  @Field()
  id: string

  rewardGroup?: RewardGroup

  @Field()
  rewardGroupId: string

  @Field()
  rewardId: string

  @Field()
  rewardEnabled: boolean

  @Field()
  triggerCooldown: boolean
}
