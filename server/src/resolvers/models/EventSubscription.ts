import { RandomWheelSync, User } from "@/resolvers/models/index.js"
import { Prisma } from "@prisma/client"
import { JSONResolver } from "graphql-scalars"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("EventSubscription")
export class EventSubscription {
  @Field()
  id: string

  user?: User | null

  @Field(() => String, { nullable: true })
  userId?: string | null

  @Field()
  twitchUserId: string

  @Field()
  type: string

  @Field()
  subscriptionType: string

  @Field(() => String, { nullable: true })
  itemId?: string | null

  @Field(() => String, { nullable: true })
  subscriptionId?: string | null

  @Field(() => JSONResolver, { nullable: true })
  condition?: Prisma.JsonValue | null

  @Field()
  paused: boolean

  wheelSync?: RandomWheelSync[]

  @Field(() => EventSubscriptionCount, { nullable: true })
  _count?: EventSubscriptionCount | null
}

@ObjectType("EventSubscriptionCount")
export class EventSubscriptionCount {
  @Field(() => Int)
  wheelSync: number
}
