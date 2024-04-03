import { RandomWheelSync } from "@/generated/graphql"
import { CustomReward } from "@/resolvers"
import { accessTokenForUser, getTwitchUserId } from "@/twitch"
import { addExistingRedemptionsSync, handleSubscriptionSync } from "@/twitch/events"
import type { GraphqlContext } from "@/types"
import { Arg, Ctx, Field, FieldResolver, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql"

@ObjectType("RandomWheelSync")
export class RandomWheelSyncFull extends RandomWheelSync {
  @Field(() => CustomReward, { nullable: true })
  reward?: CustomReward | null
}

@Resolver(() => RandomWheelSyncFull)
export class RandomWheelSyncResolver {
  @FieldResolver(() => Boolean)
  pending(@Root() sync: RandomWheelSync) {
    return sync.eventSubscriptionId === undefined
  }
}

@Resolver()
export class EventSubResolver {
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

  @Mutation(() => RandomWheelSyncFull, { nullable: true })
  async addWheelSync(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("useInput", { defaultValue: false }) useInput: boolean,
    @Arg("addExisting", { defaultValue: false }) addExisting: boolean
  ) {
    const token = await accessTokenForUser({ req, prisma })

    // create wheelSync
    const newWheelSync = await prisma.randomWheelSync.create({
      data: {
        randomWheelId,
        rewardId,
      },
      include: {
        randomWheel: addExisting,
      },
    })

    const subscriptionId = await handleSubscriptionSync(eventSub, prisma, socketIo, {
      twitchUserId: token.realTwitchUserId,
      userId: req.session.userId,
      rewardId,
    })

    if (addExisting) {
      await addExistingRedemptionsSync(apiClient, prisma, socketIo, {
        twitchUserId: token.twitchUserId,
        rewardId,
        randomWheelId,
        useInput,
        uniqueEntries: newWheelSync.randomWheel.uniqueEntries,
      })
    }

    const wheelSync = await prisma.randomWheelSync.update({
      where: { id: newWheelSync.id },
      data: {
        eventSubscriptionId: subscriptionId,
      },
    })

    return wheelSync
  }

  @Mutation(() => RandomWheelSyncFull, { nullable: true })
  async pauseWheelSync(
    @Ctx() { req, prisma, eventSub, socketIo }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("paused") paused: boolean
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const wheelSync = await prisma.randomWheelSync.update({
      where: { id },
      data: {
        paused,
      },
    })

    const newSubscriptionId = await handleSubscriptionSync(eventSub, prisma, socketIo, {
      twitchUserId: token.realTwitchUserId,
      userId: req.session.userId,
      rewardId: wheelSync.rewardId,
    })

    if (newSubscriptionId !== wheelSync.eventSubscriptionId) {
      const updated = await prisma.randomWheelSync.update({
        where: { id: wheelSync.id },
        data: {
          eventSubscriptionId: newSubscriptionId,
        },
      })

      return updated
    }

    return wheelSync
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteWheelSync(
    @Ctx() { req, prisma, eventSub, socketIo }: GraphqlContext,
    // @Arg("id") id: string
    @Arg("ids", () => [String]) ids: string[]
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const wheelSync = await prisma.randomWheelSync.findMany({
      where: {
        id: { in: ids },
      },
    })

    const deleted = await prisma.randomWheelSync.deleteMany({
      where: {
        id: { in: ids },
      },
    })

    await Promise.all(
      wheelSync.map(async (sync) => {
        await handleSubscriptionSync(eventSub, prisma, socketIo, {
          twitchUserId: token.realTwitchUserId,
          userId: req.session.userId,
          rewardId: sync.rewardId,
        })
      })
    )

    return deleted.count > 0

    // return await deleteManySubscriptionsSync(apiClient, prisma, ids)
  }

  // async findByCondition(apiClient: ApiClient, type: string, condition: Record<string, unknown>) {
  //   const helixSubs = await apiClient.eventSub.getSubscriptionsForType(type)

  //   helixSubs.data.filter(sub => {
  //     sub.condition
  //   })

  // }

  // RandomWheel

  @Query(() => [RandomWheelSyncFull])
  async syncForWheel(
    @Ctx() { prisma, apiClient }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string
  ): Promise<RandomWheelSyncFull[]> {
    const wheelSync = await prisma.randomWheelSync.findMany({
      where: {
        randomWheelId: randomWheelId ?? "",
      },
      include: {
        eventSubscription: true,
      },
    })

    if (wheelSync.length === 0) {
      return wheelSync
    }

    const twitchUserId = getTwitchUserId(wheelSync.find((w) => w.eventSubscription)?.eventSubscription?.twitchUserId)

    const rewardIds = wheelSync.map((w) => w.rewardId ?? "")

    const rewards = await apiClient.channelPoints.getCustomRewardsByIds(twitchUserId ?? "", rewardIds)

    return wheelSync.map((sync) => ({
      ...sync,
      reward: rewards.find((r) => r.id === sync.rewardId),
    }))
  }
}
