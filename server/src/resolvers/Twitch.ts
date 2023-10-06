import { HelixCustomReward } from "@twurple/api"
import { GraphQLJSON } from "graphql-scalars"
import { Arg, Ctx, Field, FieldResolver, Int, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"
import { EventSubscription } from "../../dist/generated/typegraphql-prisma"
import { addSubscriptionRedemptionAdd, deleteManySubscriptionRedemptionAdd, deleteSubscriptionRedemptionAdd, findSubscriptionRedemptionAdd } from "../twitch/events"
import { getRewards } from "../twitch/mock"
import { GraphqlContext, SubscriptionType } from "../types"

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

@Resolver(() => CustomReward)
export class CustomRewardResolver {
  @FieldResolver(() => String)
  async image(@Root() reward: HelixCustomReward) {
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

  @Query(() => [CustomReward])
  async channelRewards(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("userId", { nullable: true }) userId: string
  ) {

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: userId ?? req.session.userId ?? "",
      }
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    try {
      const rewards = await apiClient.channelPoints.getCustomRewards(token.twitchUserId)
      return rewards
    }
    catch {
      const rewards = await getRewards()
      return rewards
    }
  }

  @Query(() => [EventSubscriptionFull])
  async eventSubscriptionsForWheel(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string
  ): Promise<EventSubscriptionFull[]> {
    const subscriptions = await prisma.eventSubscription.findMany({
      where: {
        randomWheelId: randomWheelId,
      }
    })

    if (subscriptions.length === 0) {
      return subscriptions
    }

    try {
      // const rewards = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))

      // test
      const rewardsTwitch = await apiClient.channelPoints.getCustomRewardsByIds(subscriptions[0].twitchUserId,
        subscriptions.filter(s => s.rewardId).map(s => s.rewardId as string)
      )
      const rewardsTest = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))

      const rewards = [...rewardsTwitch, ...rewardsTest]
      // test end

      return subscriptions.map(subscription => ({
        ...subscription,
        reward: rewards.find(r => r.id === subscription.rewardId)
      }))
    } catch {
      const rewards2 = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))
      // const rewards = (await getRewards()).filter(r => subscriptions.some(s => s.rewardId === r.id))

      const rewards = [...rewards2]

      return subscriptions.map(subscription => ({
        ...subscription,
        reward: rewards.find(r => r.id === subscription.rewardId)
      }))
    }
  }


  @Query(() => GraphQLJSON)
  async eventSubActiveSubscriptions(
    @Ctx() { apiClient }: GraphqlContext,
  ) {
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
    }
    else {
      await apiClient.eventSub.deleteBrokenSubscriptions()
    }

    return true
  }

  @Mutation(() => EventSubscriptionFull, { nullable: true })
  async syncEntriesWithRedemption(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("useInput", { defaultValue: false }) useInput: boolean,
  ) {
    if (!req.session.userId) {
      return null
    }

    const token = await prisma.userAccessToken.findFirst({
      where: { userId: req.session.userId },
      select: {
        twitchUserId: true
      }
    })

    if (!token?.twitchUserId) {
      console.error("sync entries: twitchUserId is not set for token")
      return null
    }

    // const allRewards = await apiClient.channelPoints.getCustomRewards(token.twitchUserId)
    // const allRewards = <HelixCustomReward[]>(JSON.parse(await readFile("./src/twitch/mock/rewards.json", "utf-8")).data)


    // const reward = allRewards.find((r) => r.title === rewardName)

    // if (!reward) {
    //   console.error(`reward "${rewardName}" not found for ${token.twitchUsername}`)
    //   return null
    // }

    // await apiClient.eventSub.deleteAllSubscriptions()

    // SUB
    // const eventSubscription = eventSub.onChannelRedemptionAddForReward(token.twitchUserId, rewardId, async (event) => {
    //   console.log("received redemption", new Date().toISOString(), event.rewardTitle)

    //   if (event.status === "unfulfilled") {

    //     await prisma.randomWheelEntry.create({
    //       data: {
    //         name: useInput ? (event.input || event.userDisplayName) : event.userDisplayName,
    //         randomWheelId: randomWheelId
    //       }
    //     })

    //     socketIo.to(`wheel/${randomWheelId}`).emit("wheel:entries", "add")

    //   }

    // })

    // find all susbcriptions with this reward, also other wheels (and override)
    const existingSubscription = await prisma.eventSubscription.findFirst({
      where: {
        // randomWheelId,
        rewardId,
      }
    })

    const subscriptionId = addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, {
      twitchUserId: token.twitchUserId,
      rewardId,
      randomWheelId,
      useInput,
      id: existingSubscription?.id
    })

    // wait a bit for the twitch API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const helixSub = await findSubscriptionRedemptionAdd(apiClient, token.twitchUserId, rewardId)

    if (!helixSub) {
      console.log("[eventsub] Failed to create subscription: no response from twitch")
      throw new Error("Failed to create subscription: no response from twitch")
    }

    // console.log(await eventSubscription.getCliTestCommand())

    // const helixSubs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

    // const newSubscription = helixSubs.data.find((sub) =>
    //   (sub.status === "enabled" || sub.status === "webhook_callback_verification_pending") &&
    //   sub.condition["broadcaster_user_id"] === token.twitchUserId &&
    //   sub.condition["reward_id"] === rewardId
    // )

    // if (!newSubscription?.id) {
    //   eventSubscription.stop()
    //   console.error("subscription ID is undefined")
    //   return false
    // }

    // activeEventSubSubscriptions.set(newSubscription.id, eventSubscription)

    const condition = helixSub?.condition as Record<string, string> | undefined

    if (!existingSubscription) {
      const newSubscription = await prisma.eventSubscription.create({
        data: {
          id: subscriptionId,
          type: SubscriptionType.redemptionAdd,
          twitchUserId: token.twitchUserId ?? "",
          userId: req.session.userId,
          rewardId: rewardId,
          randomWheelId: randomWheelId,
          subscriptionId: helixSub?.id,
          useInput: useInput,
          condition: condition,
        }
      })

      return newSubscription
    } else {
      const updatedSubscription = await prisma.eventSubscription.update({
        where: {
          id: subscriptionId
        },
        data: {
          twitchUserId: token.twitchUserId ?? "",
          rewardId: rewardId,
          randomWheelId: randomWheelId,
          subscriptionId: helixSub?.id,
          condition: condition,
        }
      })
      return updatedSubscription
    }

    // console.log({ ...userSubscriptions })


    // TODO: start with resumeFrom options if subscription already exists?

    // subscription.start()

    // return existingSubscription

  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteEntriesRedemptionSync(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("ids", () => [String]) ids: string[]
  ) {
    // const subs = await apiClient.eventSub.getSubscriptionsForStatus("enabled")

    // console.log(subs.data[0].id, subs.data[0].condition)
    // const helixSubs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

    // // const activeSub = activeEventSubSubscriptions.get(subscriptionId)
    // // activeSub?.stop()

    // await apiClient.eventSub.deleteSubscription(subscriptionId)

    // activeEventSubSubscriptions.delete(subscriptionId)

    await deleteManySubscriptionRedemptionAdd(apiClient, prisma, ids)

    return true
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
    @Arg("pause") pause: boolean,
  ) {
    // const subs = await apiClient.eventSub.getSubscriptionsForStatus("enabled")

    // console.log(subs.data[0].id, subs.data[0].condition)

    // console.log("EVENTSUB pause event", pause, subscriptionId)

    // const helixSubs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

    // this.findByCondition(apiClient, "channel.channel_points_custom_reward_redemption.add", {
    //   broadcaster_user_id: sub?.twitchUserId,
    //   reward_id: sub?.rewardId
    // })


    // const sub = await prisma.eventSubscription.findUnique({
    //   where: { id },
    // })

    // if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
    //   console.warn("invalid sub ID", id)
    //   return false
    // }

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
        console.warn(`[eventsub] create redemptionAdd: invalid ID ${id}: a required related ID is undefined`, !!sub?.twitchUserId, !!sub?.rewardId, !!sub?.randomWheelId)
        return false
      }

      addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, <any>sub)

      await new Promise((resolve) => setTimeout(resolve, 500))

      const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

      if (!helixSub) {
        console.log("[eventsub] Failed to reactivate subscription")
        throw new Error("Failed to receive subscription from Twitch")
      }

    }

    // const subscription = activeEventSubSubscriptions.get(helixSub?.id)

    // if (pause) {
    //   // subscription?.suspend()
    //   subscription?.stop()
    // } else {
    //   subscription?.start()
    // }

    const newSubscription = await prisma.eventSubscription.updateMany({
      where: { id },
      data: {
        paused: pause
      }
    })

    return newSubscription
  }

}