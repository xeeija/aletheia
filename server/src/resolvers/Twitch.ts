import { CustomReward, CustomRewardCreateInput, CustomRewardUpdateInput } from "@/resolvers"
import { accessTokenForUser } from "@/twitch"
import { type GraphqlContext } from "@/types"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"

// @ObjectType("EventSubscription")
// export class EventSubscriptionFull extends EventSubscription {
//   @Field(() => CustomReward, { nullable: true })
//   reward?: CustomReward | null
// }

// @Resolver(() => EventSubscriptionFull)
// export class EventSubscriptionResolver {
//   @FieldResolver(() => Boolean)
//   pending(@Root() subscription: EventSubscription) {
//     return subscription.subscriptionId === null || subscription.subscriptionId === undefined
//   }
// }

@Resolver()
export class TwitchResolver {
  // Channel Rewards

  @Query(() => [CustomReward])
  async channelRewards(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("userId", { nullable: true }) userId?: string,
    @Arg("onlyManageable", { nullable: true }) onlyManageable?: boolean
  ) {
    const token = await accessTokenForUser({ req, prisma, userId })

    const rewards = await apiClient.channelPoints.getCustomRewards(token.twitchUserId, onlyManageable)
    return rewards
  }

  @Mutation(() => CustomReward, { nullable: true })
  async createChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("reward", () => CustomRewardCreateInput) rewardInput: CustomRewardCreateInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const newReward = await apiClient.channelPoints.createCustomReward(token.twitchUserId, rewardInput)
    return newReward
  }

  @Mutation(() => CustomReward, { nullable: true })
  async updateChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("rewardId") rewardId: string,
    @Arg("reward", () => CustomRewardUpdateInput) rewardInput: CustomRewardUpdateInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const newReward = await apiClient.channelPoints.updateCustomReward(token.twitchUserId, rewardId, rewardInput)
    return newReward
  }

  @Mutation(() => Boolean)
  async deleteChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("rewardId") rewardId: string
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    const token = await accessTokenForUser({ req, prisma })

    await apiClient.channelPoints.deleteCustomReward(token.twitchUserId, rewardId)
    return true
  }
}
