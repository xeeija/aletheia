import { HelixCustomReward } from "@twurple/api"
import { GraphQLJSON } from "graphql-scalars"
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
import { EventSubscription } from "../../dist/generated/typegraphql-prisma"
import {
  addSubscriptionRedemptionAdd,
  deleteManySubscriptionRedemptionAdd,
  deleteSubscriptionRedemptionAdd,
  findSubscriptionRedemptionAdd,
} from "../twitch/events"
import { getRewards } from "../twitch/mock"
import { EventSubType, GraphqlContext, SubscriptionType } from "../types"

// same properties as HelixCustomReward
@ObjectType("CustomReward")
class CustomReward {
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
class CustomRewardInput {
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

  @Field(() => Int, { nullable: true })
  globalCooldown?: number

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerStream?: number

  @Field(() => Int, { nullable: true })
  maxRedemptionsPerUser?: number

  @Field(() => Boolean, { nullable: true })
  autoFulfill?: boolean
}

@Resolver(() => CustomReward)
export class CustomRewardResolver {
  @FieldResolver(() => String)
  image(@Root() reward: HelixCustomReward) {
    return reward.getImageUrl(1)
  }
}

// @Resolver(() => EventSubscription)
// export class EventSubscriptionFull extends EventSubscription {

// }
@ObjectType("EventSubscription")
export class EventSubscriptionFull extends EventSubscription {
  @Field(() => CustomReward, { nullable: true })
  reward?: CustomReward | null
}

@Resolver(() => EventSubscriptionFull)
export class EventSubscriptionResolver {
  @FieldResolver(() => Boolean)
  pending(@Root() subscription: EventSubscription) {
    return subscription.subscriptionId === null || subscription.subscriptionId === undefined
  }
}

@Resolver()
export class TwitchResolver {
  // Channel Rewards

  @Query(() => [CustomReward])
  async channelRewards(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      return []
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: userId ?? req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    try {
      const rewards = await apiClient.channelPoints.getCustomRewards(token.twitchUserId)
      return rewards
    } catch {
      const rewards = await getRewards()
      return rewards
    }
  }

  @Mutation(() => CustomReward, { nullable: true })
  async createChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("reward") reward: CustomRewardInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    // try {
    const newReward = await apiClient.channelPoints.createCustomReward(token.twitchUserId, reward)
    // {
    //   title: reward.title,
    //   prompt: reward.prompt,
    //   cost: reward.cost,
    //   userInputRequired: reward.userInputRequired,
    //   isEnabled: reward.isEnabled,
    //   autoFulfill: reward.autoFulfill,
    //   backgroundColor: reward.backgroundColor,
    //   globalCooldown: reward.globalCooldown,
    //   maxRedemptionsPerUserPerStream: reward.maxRedemptionsPerStream,
    //   maxRedemptionsPerStream: reward.maxRedemptionsPerUser,
    // })

    return newReward
    // }
    // catch (err: unknown) {
    //   throw err
    // }
  }

  @Mutation(() => CustomReward, { nullable: true })
  async updateChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("rewardId") rewardId: string,
    @Arg("reward") reward: CustomRewardInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    // try {
    const newReward = await apiClient.channelPoints.updateCustomReward(token.twitchUserId, rewardId, reward)

    return newReward
    // }
    // catch {
    //   return null
    // }
  }

  @Mutation(() => Boolean)
  async deleteChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("rewardId") rewardId: string
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    // try {
    await apiClient.channelPoints.deleteCustomReward(token.twitchUserId, rewardId)
    return true
    // }
    // catch {
    //   return null
    // }
  }

  // Eventsub

  @Query(() => [EventSubscriptionFull])
  async eventSubscriptionsForWheel(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string
  ): Promise<EventSubscriptionFull[]> {
    const subscriptions = await prisma.eventSubscription.findMany({
      where: {
        randomWheelId: randomWheelId,
      },
    })

    if (subscriptions.length === 0) {
      return subscriptions
    }

    try {
      // const rewards = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))

      // test
      const rewardsTwitch = await apiClient.channelPoints.getCustomRewardsByIds(
        subscriptions[0].twitchUserId,
        subscriptions.filter((s) => s.rewardId).map((s) => s.rewardId as string)
      )
      const rewardsTest = (await getRewards()).filter((r) => subscriptions.some((s) => s.rewardId === r.id))

      const rewards = [...rewardsTwitch, ...rewardsTest]
      // test end

      return subscriptions.map((subscription) => ({
        ...subscription,
        reward: rewards.find((r) => r.id === subscription.rewardId),
      }))
    } catch {
      const rewardsTest = (await getRewards()).filter((r) => subscriptions.some((s) => s.rewardId === r.id))
      // const rewards = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))

      const rewards = [...rewardsTest]

      return subscriptions.map((subscription) => ({
        ...subscription,
        reward: rewards.find((r) => r.id === subscription.rewardId),
      }))
    }
  }

  @Query(() => GraphQLJSON)
  async eventSubActiveSubscriptions(@Ctx() { apiClient }: GraphqlContext) {
    const subs = await apiClient.eventSub.getSubscriptions()

    return subs
  }

  @Mutation(() => Boolean)
  async eventSubDeleteAllSubscriptions(
    @Ctx() { apiClient }: GraphqlContext,
    @Arg("all", { nullable: true }) all?: boolean
  ) {
    if (all) {
      await apiClient.eventSub.deleteAllSubscriptions()
    } else {
      await apiClient.eventSub.deleteBrokenSubscriptions()
    }

    return true
  }

  @Mutation(() => EventSubscriptionFull, { nullable: true })
  async syncEntriesWithRedemption(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("useInput", { defaultValue: false }) useInput: boolean
  ) {
    if (!req.session.userId) {
      return null
    }

    const token = await prisma.userAccessToken.findFirst({
      where: { userId: req.session.userId },
      select: {
        twitchUserId: true,
      },
    })

    if (!token?.twitchUserId) {
      console.error("sync entries: twitchUserId is not set for token")
      return null
    }

    // find all susbcriptions with this reward, also other wheels (and override)
    const existingSubscription = await prisma.eventSubscription.findFirst({
      where: {
        // randomWheelId,
        rewardId,
      },
    })

    const subscriptionId = addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, {
      twitchUserId: token.twitchUserId,
      rewardId,
      randomWheelId,
      useInput,
      id: existingSubscription?.id,
    })

    // wait a bit for the twitch API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const helixSub = await findSubscriptionRedemptionAdd(apiClient, token.twitchUserId, rewardId)

    if (!helixSub) {
      console.log("[eventsub] Failed to create subscription: no response from twitch")
      throw new Error("Failed to create subscription: no response from twitch")
    }

    const condition = helixSub?.condition as Record<string, string> | undefined

    if (!existingSubscription) {
      const newSubscription = await prisma.eventSubscription.create({
        data: {
          id: subscriptionId,
          type: EventSubType.wheelSync,
          subscriptionType: SubscriptionType.redemptionAdd,
          twitchUserId: token.twitchUserId ?? "",
          userId: req.session.userId,
          rewardId: rewardId,
          randomWheelId: randomWheelId,
          subscriptionId: helixSub?.id,
          useInput: useInput,
          condition: condition,
        },
      })

      return newSubscription
    } else {
      const updatedSubscription = await prisma.eventSubscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          twitchUserId: token.twitchUserId ?? "",
          rewardId: rewardId,
          randomWheelId: randomWheelId,
          subscriptionId: helixSub?.id,
          condition: condition,
        },
      })
      return updatedSubscription
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteEntriesRedemptionSync(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("ids", () => [String]) ids: string[]
  ) {
    return await deleteManySubscriptionRedemptionAdd(apiClient, prisma, ids)
  }

  // async findByCondition(apiClient: ApiClient, type: string, condition: Record<string, unknown>) {
  //   const helixSubs = await apiClient.eventSub.getSubscriptionsForType(type)

  //   helixSubs.data.filter(sub => {
  //     sub.condition
  //   })

  // }

  @Mutation(() => EventSubscriptionFull, { nullable: true })
  async pauseEntriesRedemptionSync(
    @Ctx() { prisma, eventSub, apiClient, socketIo }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("pause") pause: boolean
  ) {
    // this.findByCondition(apiClient, "channel.channel_points_custom_reward_redemption.add", {
    //   broadcaster_user_id: sub?.twitchUserId,
    //   reward_id: sub?.rewardId
    // })

    if (pause) {
      await deleteSubscriptionRedemptionAdd(apiClient, prisma, id, true)

      // const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

      // if (helixSub) {
      //   await apiClient.eventSub.deleteSubscription(helixSub?.id)
      // }
    } else {
      const sub = await prisma.eventSubscription.findUnique({
        where: { id },
      })

      if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
        console.warn(
          `[eventsub] create redemptionAdd: invalid ID ${id}: a required related ID is undefined`,
          !!sub?.twitchUserId,
          !!sub?.rewardId,
          !!sub?.randomWheelId
        )
        return false
      }

      addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, {
        ...sub,
        rewardId: sub.rewardId ?? "",
        randomWheelId: sub.randomWheelId ?? "",
      })

      await new Promise((resolve) => setTimeout(resolve, 500))

      const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

      if (!helixSub) {
        console.log("[eventsub] Failed to reactivate subscription")
        throw new Error("Failed to receive subscription from Twitch")
      }
    }

    const newSubscription = await prisma.eventSubscription.updateMany({
      where: { id },
      data: {
        paused: pause,
      },
    })

    return newSubscription
  }
}
