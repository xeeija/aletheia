import { GraphQLJSON } from "graphql-scalars"
import { GraphqlContext } from "src/types"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import { addSubscriptionRedemptionAdd, deleteSubscriptionRedemptionAdd, findSubscriptionRedemptionAdd } from "../twitch/events"

@Resolver()
export class TwitchResolver {

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
  ) {
    await apiClient.eventSub.deleteAllSubscriptions()

    return true
  }

  @Mutation(() => Boolean, { nullable: true })
  async syncEntriesWithChannelRedemption(
    @Ctx() { req, prisma, eventSub, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("useInput", { defaultValue: false }) useInput: boolean,
  ) {
    if (!req.session.userId) {
      return null
    }

    const token = await prisma.userAccessToken.findFirst({ where: { userId: req.session.userId } })

    if (!token?.twitchUserId) {
      console.error("twitchUserId is not set for token")
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

    const existingSubscription = await prisma.eventSubscription.findFirst({
      where: {
        randomWheelId,
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

    if (!existingSubscription) {
      await prisma.eventSubscription.create({
        data: {
          id: subscriptionId,
          rewardId: rewardId,
          twitchUserId: token.twitchUserId ?? "",
          randomWheelId: randomWheelId,
          userId: req.session.userId,
          useInput: useInput,
          subscriptionId: "", // newSubscription?.id ?? ""
        }
      })
    }

    // console.log({ ...userSubscriptions })


    // TODO: start with resumeFrom options if subscription already exists?

    // subscription.start()

    return true

  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteEntriesChannelRedemptionSync(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("id") id: string
  ) {
    // const subs = await apiClient.eventSub.getSubscriptionsForStatus("enabled")

    // console.log(subs.data[0].id, subs.data[0].condition)
    // const helixSubs = await apiClient.eventSub.getSubscriptionsForType("channel.channel_points_custom_reward_redemption.add")

    // // const activeSub = activeEventSubSubscriptions.get(subscriptionId)
    // // activeSub?.stop()

    // await apiClient.eventSub.deleteSubscription(subscriptionId)

    // activeEventSubSubscriptions.delete(subscriptionId)

    await deleteSubscriptionRedemptionAdd(apiClient, prisma, id)

    const sub = await prisma.eventSubscription.findUnique({
      where: { id },
    })

    if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
      console.warn(`invalid ID ${id}: a required related ID is undefined`)
      return false
    }

    const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

    if (helixSub) {
      await apiClient.eventSub.deleteSubscription(helixSub?.id)

    }

    await prisma.eventSubscription.delete({
      where: { id }
    })

    return true
  }

  // async findByCondition(apiClient: ApiClient, type: string, condition: Record<string, unknown>) {
  //   const helixSubs = await apiClient.eventSub.getSubscriptionsForType(type)


  //   helixSubs.data.filter(sub => {
  //     sub.condition
  //   })

  // }

  @Mutation(() => Boolean, { nullable: true })
  async pauseEntriesChannelRedemptionSync(
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
      await deleteSubscriptionRedemptionAdd(apiClient, prisma, id)

      // const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

      // if (helixSub) {
      //   await apiClient.eventSub.deleteSubscription(helixSub?.id)
      // }
    } else {
      const sub = await prisma.eventSubscription.findUnique({
        where: { id },
      })

      if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
        console.warn(`invalid ID ${id}: a required related ID is undefined`)
        return false
      }

      addSubscriptionRedemptionAdd(eventSub, prisma, socketIo, sub)
    }

    // const subscription = activeEventSubSubscriptions.get(helixSub?.id)

    // if (pause) {
    //   // subscription?.suspend()
    //   subscription?.stop()
    // } else {
    //   subscription?.start()
    // }

    await prisma.eventSubscription.updateMany({
      where: { id },
      data: {
        paused: pause
      }
    })

    return true
  }

}