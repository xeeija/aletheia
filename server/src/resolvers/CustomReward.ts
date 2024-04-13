import { RewardLink } from "@/generated/graphql"
import { accessTokenForUser } from "@/twitch"
import type { GraphqlContext } from "@/types"
import { randomBase64Url } from "@/utils"
import { HelixCustomReward } from "@twurple/api"
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql"

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

  @Query(() => [RewardLink])
  async rewardLinks(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("rewardIds", () => [String], { nullable: true }) rewardIds: string[]
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    await accessTokenForUser({ req, prisma })

    const rewardLinks = await prisma.rewardLink.findMany({
      where: {
        userId: req.session.userId ?? "",
        rewardId: rewardIds ? { in: rewardIds } : undefined,
      },
    })

    return rewardLinks
  }

  @Mutation(() => RewardLink, { nullable: true })
  async createRewardLink(
    @Ctx() { req, prisma }: GraphqlContext,
    // @Arg("rewardLink") rewardLink: RewardLinkInput
    @Arg("rewardId") rewardId: string,
    @Arg("type") type: string
  ) {
    await accessTokenForUser({ req, prisma })

    const existingRewardLink = await prisma.rewardLink.findFirst({
      where: {
        rewardId,
        type,
        userId: req.session.userId,
      },
    })

    if (existingRewardLink) {
      return existingRewardLink
    }

    const token = randomBase64Url(48)

    const newRewardLink = await prisma.rewardLink.create({
      data: {
        rewardId,
        type,
        token,
        userId: req.session.userId,
      },
    })

    return newRewardLink
  }

  @Mutation(() => Boolean)
  async deleteRewardLink(@Ctx() { req, prisma }: GraphqlContext, @Arg("id") id: string) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const rewardLink = await prisma.rewardLink.findUnique({
      where: { id },
    })

    if (rewardLink?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const deleted = await prisma.rewardLink.delete({
      where: { id: id ?? "" },
    })

    return deleted !== null
  }
}
