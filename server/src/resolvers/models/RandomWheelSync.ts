import { EventSubscription, RandomWheel } from "@/resolvers/models/index.js"
import { Field, ObjectType } from "type-graphql"

@ObjectType("RandomWheelSync")
export class RandomWheelSync {
  @Field()
  id: string

  randomWheel?: RandomWheel

  @Field()
  randomWheelId: string

  eventSubscription?: EventSubscription | null

  @Field(() => String, { nullable: true })
  eventSubscriptionId?: string | null

  @Field()
  rewardId: string

  @Field()
  paused: boolean

  @Field()
  useInput: boolean

  @Field(() => Date)
  createdAt: Date
}
