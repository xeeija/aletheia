import { EventSubscription, RewardLink } from "@/generated/typegraphql"
import {
  addExistingRedemptions,
  addSubscriptionRedemptionAdd,
  deleteManySubscriptionRedemptionAdd,
  deleteSubscriptionRedemptionAdd,
  findSubscriptionRedemptionAdd,
} from "@/twitch/events"
import { getRewards } from "@/twitch/mock"
import { EventSubType, SubscriptionType, type GraphqlContext } from "@/types"
import { randomBase64Url, retryWithBackoff } from "@/utils"
import { HelixCustomReward, HelixEventSubSubscription } from "@twurple/api"
import { GraphQLError } from "graphql"
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

  // @Field({ nullable: true }) manageable?: boolean

  // constructor(reward?: HelixCustomReward, manageable?: boolean) {
  //   if (!reward) {
  //     return
  //   }
  //   this.id = reward.id
  //   this.autoFulfill = reward.autoFulfill
  //   this.backgroundColor = reward.backgroundColor
  //   this.cost = reward.cost
  //   this.globalCooldown = reward.globalCooldown
  //   this.broadcasterDisplayName = reward.broadcasterDisplayName
  //   this.broadcasterId = reward.broadcasterId
  //   this.broadcasterName = reward.broadcasterName
  //   this.cooldownExpiryDate = reward.cooldownExpiryDate
  //   this.isEnabled = reward.isEnabled
  //   this.isInStock = reward.isInStock
  //   this.isPaused = reward.isPaused
  //   this.maxRedemptionsPerStream = reward.maxRedemptionsPerStream
  //   this.maxRedemptionsPerUserPerStream = reward.maxRedemptionsPerUserPerStream
  //   this.prompt = reward.prompt
  //   this.redemptionsThisStream = reward.redemptionsThisStream
  //   this.title = reward.title
  //   this.userInputRequired = reward.userInputRequired
  //   this.manageable = manageable
  // }
}

@InputType()
class CustomRewardCreateInput {
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
class CustomRewardUpdateInput {
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
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

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
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const accessToken = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (!accessToken?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

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

    // try {
    // }
    // catch (err: unknown) {
    //   throw err
    // }
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

    // try {
    // }
    // catch (err: unknown) {
    //   throw err
    // }
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
    @Arg("userId", { nullable: true }) userId?: string,
    @Arg("onlyManageable", { nullable: true }) onlyManageable?: boolean
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
      // // Option 1: only get all or manageable rewards
      const rewards = await apiClient.channelPoints.getCustomRewards(token.twitchUserId, onlyManageable)
      return rewards

      // Option 2: return all rewards always and set manageable flag
      // const [allRewards, managableRewards] = await Promise.all([
      //   apiClient.channelPoints.getCustomRewards(token.twitchUserId, false),
      //   apiClient.channelPoints.getCustomRewards(token.twitchUserId, true),
      // ])

      // const rewards = allRewards.map(
      //   (reward) =>
      //     new CustomReward(
      //       reward,
      //       managableRewards.some((mr) => mr.id === reward.id)
      //     )
      // )
      // (r) =>
      //   ({
      //     autoFulfill: r.autoFulfill,
      //     backgroundColor: r.backgroundColor,
      //     cost: r.cost,
      //     globalCooldown: r.globalCooldown,
      //     id: r.id,
      //     broadcasterDisplayName: r.broadcasterDisplayName,
      //     broadcasterId: r.broadcasterId,
      //     broadcasterName: r.broadcasterName,
      //     cooldownExpiryDate: r.cooldownExpiryDate,
      //     isEnabled: r.isEnabled,
      //     isInStock: r.isInStock,
      //     isPaused: r.isPaused,
      //     maxRedemptionsPerStream: r.maxRedemptionsPerStream,
      //     maxRedemptionsPerUserPerStream: r.maxRedemptionsPerUserPerStream,
      //     prompt: r.prompt,
      //     redemptionsThisStream: r.redemptionsThisStream,
      //     title: r.title,
      //     userInputRequired: r.userInputRequired,
      //     manageable: managableRewards.some((mr) => mr.id === r.id),
      //   }) as CustomReward

      // return rewards
    } catch {
      const rewards = await getRewards()
      return !onlyManageable ? rewards : rewards.filter((_, i) => i % 2 === 0)
      // return !onlyManageable
      // ? rewards.map((r, i) => new CustomReward(r, i % 2 === 0))
      // : rewards.filter((_, i) => i % 2 === 0).map((r) => new CustomReward(r, true))
    }
  }

  @Mutation(() => CustomReward, { nullable: true })
  async createChannelReward(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("reward") rewardInput: CustomRewardCreateInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    // try {
    const newReward = await apiClient.channelPoints.createCustomReward(token.twitchUserId, rewardInput)

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
    @Arg("reward") rewardInput: CustomRewardUpdateInput
    // @Arg("userId", { nullable: true }) userId: string
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    // try {
    const newReward = await apiClient.channelPoints.updateCustomReward(token.twitchUserId, rewardId, rewardInput)
    //   {
    //   autoFulfill: reward.autoFulfill,
    //   backgroundColor: reward.backgroundColor,
    //   cost: reward.cost,
    //   globalCooldown: reward.globalCooldown,
    //   isEnabled: reward.isEnabled,
    //   isPaused: reward.isPaused,
    //   maxRedemptionsPerStream: reward.maxRedemptionsPerStream,
    //   maxRedemptionsPerUserPerStream: reward.maxRedemptionsPerUser,
    //   prompt: reward.prompt,
    //   title: reward.title,
    //   userInputRequired: reward.userInputRequired,
    // })

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
        userId: req.session.userId ?? "",
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

  // Only for testing

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  // @Query(() => GraphQLJSON)
  // async eventSubActiveSubscriptions(@Ctx() { apiClient }: GraphqlContext) {
  //   const subs = await apiClient.eventSub.getSubscriptions()
  //   return subs
  // }

  // @Mutation(() => Boolean)
  // async eventSubDeleteAllSubscriptions(
  //   @Ctx() { apiClient }: GraphqlContext,
  //   @Arg("all", { nullable: true }) all?: boolean
  // ) {
  //   if (all) {
  //     await apiClient.eventSub.deleteAllSubscriptions()
  //   } else {
  //     await apiClient.eventSub.deleteBrokenSubscriptions()
  //   }

  //   return true
  // }

  @Mutation(() => EventSubscriptionFull, { nullable: true })
  async syncEntriesWithRedemption(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("useInput", { defaultValue: false }) useInput: boolean,
    @Arg("addExisting", { defaultValue: false }) addExisting: boolean
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

    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWheelId },
    })

    const subscriptionId = addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, {
      twitchUserId: token.twitchUserId,
      rewardId,
      randomWheelId,
      useInput,
      uniqueEntries: wheel?.uniqueEntries,
      id: existingSubscription?.id,
    })

    let helixSub: HelixEventSubSubscription | undefined

    // wait a bit for the twitch API, and retry
    await retryWithBackoff(
      async (finish, retries) => {
        helixSub = await findSubscriptionRedemptionAdd(apiClient, token.twitchUserId ?? "", rewardId)

        if (helixSub) {
          console.log(`[eventsub] Created subscription after ${retries} retries`)
          finish()
        }
      },
      {
        finished: (retries) => {
          if (!helixSub) {
            console.log(`[eventsub] Failed to create subscription: no response from twitch after ${retries} retries`)
            throw new GraphQLError("Failed to create subscription: no response from twitch")
          }
        },
      }
    )

    const condition = helixSub?.condition as Record<string, string> | undefined

    // add entries for existing unfullfiled redemptions

    if (addExisting) {
      await addExistingRedemptions(apiClient, prisma, socketIo, {
        twitchUserId: token.twitchUserId,
        rewardId: rewardId,
        randomWheelId: randomWheelId,
        useInput: useInput,
      })
    }

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

      const wheel = await prisma.randomWheel.findUnique({
        where: { id: sub.randomWheelId },
      })

      addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, {
        id: sub.id,
        twitchUserId: sub.twitchUserId,
        useInput: sub.useInput,
        rewardId: sub.rewardId,
        randomWheelId: sub.randomWheelId,
        uniqueEntries: wheel?.uniqueEntries,
      })

      let helixSub: HelixEventSubSubscription | undefined

      // wait a bit for the twitch API, and retry
      await retryWithBackoff(
        async (finish, retries) => {
          helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId ?? "")

          if (helixSub) {
            console.log(`[eventsub] Reactivated subscription after ${retries} retries`)
            finish()
          }
        },
        {
          finished: (retries) => {
            if (!helixSub) {
              console.log(`[eventsub] Failed to create subscription: no response from twitch after ${retries} retries`)
              throw new GraphQLError("Failed to create subscription: no response from twitch")
            }
          },
        }
      )
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
