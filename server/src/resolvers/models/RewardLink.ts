import { User } from "@/resolvers/models/index.js"
import { Field, ObjectType } from "type-graphql"

@ObjectType("RewardLink")
export class RewardLink {
  @Field()
  id: string

  user?: User

  @Field()
  userId: string

  @Field()
  rewardId: string

  @Field()
  token: string

  @Field()
  type: string
}
