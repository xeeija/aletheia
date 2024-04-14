import { HelixCustomReward } from "@twurple/api"
import { Field, FieldResolver, InputType, Int, ObjectType, Resolver, Root } from "type-graphql"

// same properties as HelixCustomReward
@ObjectType("CustomReward")
export class CustomReward {
  @Field() id: string
  @Field() broadcasterId: string
  @Field() broadcasterName: string
  @Field() broadcasterDisplayName: string
  @Field() backgroundColor: string
  @Field() isEnabled: boolean
  @Field() cost: number
  @Field() title: string
  @Field() prompt: string
  @Field() userInputRequired: boolean
  @Field(() => Int, { nullable: true }) maxRedemptionsPerStream: number | null
  @Field(() => Int, { nullable: true }) maxRedemptionsPerUserPerStream: number | null
  @Field(() => Int, { nullable: true }) globalCooldown: number | null
  @Field() isPaused: boolean
  @Field() isInStock: boolean
  @Field(() => Int, { nullable: true }) redemptionsThisStream: number | null
  @Field() autoFulfill: boolean
  @Field(() => Date, { nullable: true }) cooldownExpiryDate: Date | null
}

@InputType()
export class CustomRewardCreateInput {
  @Field(() => String)
  title: string

  @Field(() => Int)
  cost: number

  @Field(() => String, { nullable: true })
  prompt?: string

  @Field(() => Boolean, { nullable: true })
  userInputRequired?: boolean

  @Field(() => String, { nullable: true })
  backgroundColor?: string

  @Field(() => Boolean, { nullable: true })
  isEnabled?: boolean

  @Field(() => Boolean, { nullable: true })
  isPaused?: boolean

  @Field(() => Int, { nullable: true })
  globalCooldown?: number | null

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerStream?: number | null

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerUserPerStream?: number | null

  @Field(() => Boolean, { nullable: true })
  autoFulfill?: boolean
}

@InputType()
export class CustomRewardUpdateInput {
  @Field(() => Boolean, { nullable: true })
  autoFulfill?: boolean

  @Field(() => String, { nullable: true })
  backgroundColor?: string

  @Field(() => Int, { nullable: true })
  cost?: number

  @Field(() => Int, { nullable: true })
  globalCooldown?: number | null

  @Field(() => Boolean, { nullable: true })
  isEnabled?: boolean

  @Field(() => Boolean, { nullable: true })
  isPaused?: boolean

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerStream?: number | null

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerUserPerStream?: number | null

  @Field(() => String, { nullable: true })
  prompt?: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => Boolean, { nullable: true })
  userInputRequired?: boolean
}

@Resolver(() => CustomReward)
export class CustomRewardResolver {
  @FieldResolver(() => String)
  image(@Root() reward: HelixCustomReward) {
    return reward.getImageUrl(2)
  }
}
