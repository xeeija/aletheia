import { RewardGroupFull, RewardGroupInput, RewardGroupItem, RewardGroupItemInput } from "@/resolvers/index.js"
import { handleSubscriptionRewardGroup } from "@/twitch/events/index.js"
import { accessTokenForUser } from "@/twitch/index.js"
import { getRewards } from "@/twitch/mock/index.js"
import { type GraphqlContext } from "@/types.js"
import { loggerGraphql as logger, randomBase64Url } from "@/utils/index.js"
import { HelixCustomReward } from "@twurple/api"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"

@Resolver()
export class RewardGroupResolver {
  @Query(() => [RewardGroupFull])
  async rewardGroups(@Ctx() { req, prisma }: GraphqlContext, @Arg("items", { nullable: true }) items?: boolean) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const rewardGroups = await prisma.rewardGroup.findMany({
      where: {
        userId: req.session.userId ?? "",
      },
      orderBy: {
        name: "asc",
      },
      include: {
        items: items === true,
      },
    })

    return rewardGroups
  }

  @Query(() => RewardGroupFull)
  async rewardGroup(@Ctx() { req, prisma }: GraphqlContext, @Arg("id") id: string) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const rewardGroup = await prisma.rewardGroup.findUnique({
      where: {
        id,
        userId: req.session.userId ?? "",
      },
      include: {
        items: true,
      },
    })

    return rewardGroup
  }

  @Mutation(() => RewardGroupFull, { nullable: true })
  async createRewardGroup(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("rewardGroup", () => RewardGroupInput) input: RewardGroupInput,
    @Arg("items", () => [RewardGroupItemInput]) items: RewardGroupItemInput[]
    // @Arg("name") name: string,
    // @Arg("active", { defaultValue: true }) active?: boolean,
    // @Arg("triggerSelected", { nullable: true }) triggerSelected?: boolean
  ) {
    const token = await accessTokenForUser({ req, prisma })

    // load rewards from twitch to check if enabled
    const rewardIds = items.map((item) => item.rewardId)

    const rewards = await apiClient.channelPoints.getCustomRewardsByIds(token.twitchUserId, rewardIds)

    const defaultName = `Reward Group ${randomBase64Url(4)}`

    const newRewardGroup = await prisma.rewardGroup.create({
      data: {
        name: input?.name ?? defaultName,
        active: input?.active ?? true,
        triggerSelected: input?.triggerSelected,
        userId: req.session.userId,
        items: {
          createMany: {
            data: items.map((item) => {
              const reward = rewards.find((r) => r.id === item.rewardId)
              return {
                rewardId: item.rewardId,
                triggerCooldown: item.triggerCooldown,
                rewardEnabled: (reward?.isEnabled || reward?.isPaused) ?? undefined,
              }
            }),
          },
        },
      },
      include: {
        items: true,
      },
    })

    if (newRewardGroup.items.length > 0) {
      await handleSubscriptionRewardGroup(eventSub, prisma, apiClient, socketIo, {
        twitchUserId: token.twitchUserId,
        userId: req.session.userId,
        // rewardGroup: newRewardGroup,
        // rewardId: "",
        // id: existingSub?.id,
      })
    }

    return newRewardGroup
  }

  @Mutation(() => RewardGroupFull, { nullable: true })
  async updateRewardGroup(
    @Ctx() { req, prisma, apiClient, eventSub, socketIo }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("rewardGroup", () => RewardGroupInput, { nullable: true }) input?: RewardGroupInput,
    @Arg("items", () => [RewardGroupItemInput], { nullable: true }) items?: RewardGroupItemInput[]
    // @Arg("name", { nullable: true }) name?: string,
    // @Arg("items") items: RewardGroupItemInput[],
    // @Arg("active", { nullable: true }) active?: boolean,
    // @Arg("triggerSelected", { nullable: true }) triggerSelected?: boolean
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const group = await prisma.rewardGroup.findUnique({
      where: {
        id: id ?? "",
      },
      include: { items: true },
    })

    if (group?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    // load rewards from twitch to check if enabled
    const rewardIds = items?.map((item) => item.rewardId) ?? []

    const rewards = await apiClient.channelPoints.getCustomRewardsByIds(token.twitchUserId, rewardIds)

    // check which rewards are changed and create, update or delete the rewardItems accordingly
    // check everything by rewardId
    // -> update all items, that are in new and existing items (stay "the same")
    // -> create all items, that are in new items but not in existing items, filter out items to update
    // -> delete all items, that are in existing items but not in new items, filter out items to update

    const updateItems = items?.filter((u) => group.items.some((i) => i.rewardId === u.rewardId))

    const createItems = items?.filter(
      (c) =>
        !group.items.map((i) => i.rewardId).includes(c.rewardId) &&
        updateItems &&
        !updateItems.map((i) => i.rewardId).includes(c.rewardId)
    )

    const deleteItems = group.items?.filter(
      (d) =>
        items &&
        !items.map((i) => i.rewardId).includes(d.rewardId) &&
        updateItems &&
        !updateItems.map((i) => i.rewardId).includes(d.rewardId)
    )

    logger.debug(
      `Update reward group '${group.name}':`,
      `create ${createItems?.length},`,
      `update ${updateItems?.length}`,
      `and delete ${deleteItems?.length} items`
    )

    const updateItemsFalse = updateItems?.filter((i) => i.triggerCooldown === false)

    if ((updateItemsFalse?.length ?? 0) > 1) {
      // update existing items, with triggerCooldown false, rest is updated below, to minimize DB queries
      await prisma.rewardGroupItem.updateMany({
        where: {
          rewardGroupId: group.id,
          rewardId: { in: updateItemsFalse?.map((i) => i.rewardId) },
        },
        data: {
          triggerCooldown: { set: false },
        },
      })
    }

    const updatedGroup = await prisma.rewardGroup.update({
      where: { id },
      data: {
        ...input,
        items: {
          // create new items
          createMany: {
            skipDuplicates: true,
            data: (createItems ?? []).map((item) => {
              const reward = rewards.find((r) => r.id === item.rewardId)
              return {
                rewardId: item.rewardId,
                triggerCooldown: item.triggerCooldown,
                rewardEnabled: (reward?.isEnabled || reward?.isPaused) ?? undefined,
              }
            }),
          },
          // delete old items
          deleteMany: {
            id: { in: deleteItems?.map((i) => i.id) },
          },
          // update existing items, with triggerCooldown true, rest is updated above
          updateMany: {
            where: {
              rewardGroupId: group.id,
              rewardId: { in: updateItems?.filter((i) => i.triggerCooldown)?.map((i) => i.rewardId) },
            },
            data: {
              triggerCooldown: { set: true },
            },
          },
        },
      },
      include: { items: true },
    })

    await handleSubscriptionRewardGroup(eventSub, prisma, apiClient, socketIo, {
      twitchUserId: token.realTwitchUserId,
      userId: req.session.userId,
    })

    return updatedGroup
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRewardGroup(
    @Ctx() { req, prisma, eventSub, apiClient, socketIo }: GraphqlContext,
    @Arg("id") id: string
  ) {
    const token = await accessTokenForUser({ req, prisma })

    const existingGroup = await prisma.rewardGroup.findUnique({
      where: {
        id: id ?? "",
      },
    })

    if (existingGroup?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const deleted = await prisma.rewardGroup.delete({
      where: { id: id ?? "" },
    })

    await handleSubscriptionRewardGroup(eventSub, prisma, apiClient, socketIo, {
      twitchUserId: token?.twitchUserId ?? "",
      userId: req.session.userId,
    })

    return deleted !== null
  }

  @Mutation(() => RewardGroupItem, { nullable: true })
  async addRewardGroupItem(
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("rewardGroupId") rewardGroupId: string,
    @Arg("rewardId") rewardId: string,
    @Arg("triggerCooldown", { nullable: true }) triggerCooldown?: boolean
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const existingGroup = await prisma.rewardGroup.findUnique({
      where: {
        id: rewardGroupId ?? "",
      },
    })

    if (existingGroup?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (!token?.twitchUserId) {
      throw new Error("No connected twitch account found")
    }

    let reward: HelixCustomReward | null
    try {
      reward = await apiClient.channelPoints.getCustomRewardById(token.twitchUserId, rewardId)
    } catch {
      reward = getRewards().find((r) => r.id === rewardId) ?? null
    }

    const newItem = await prisma.rewardGroupItem.create({
      data: {
        rewardId,
        rewardGroupId,
        triggerCooldown,
        rewardEnabled: (reward?.isEnabled || reward?.isPaused) ?? undefined,
      },
    })

    return newItem
  }

  @Mutation(() => RewardGroupItem, { nullable: true })
  async updateRewardGroupItem(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("rewardEnabled", { nullable: true }) rewardEnabled?: boolean,
    @Arg("triggerCooldown", { nullable: true }) triggerCooldown?: boolean
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const existingItem = await prisma.rewardGroupItem.findUnique({
      where: {
        id: id ?? "",
      },
      include: { rewardGroup: true },
    })

    if (existingItem?.rewardGroup.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const item = await prisma.rewardGroupItem.update({
      where: { id },
      data: {
        triggerCooldown,
        rewardEnabled,
      },
    })

    return item
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRewardGroupItem(@Ctx() { req, prisma }: GraphqlContext, @Arg("id") id: string) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const existingItem = await prisma.rewardGroupItem.findUnique({
      where: {
        id: id ?? "",
      },
      include: { rewardGroup: true },
    })

    if (existingItem?.rewardGroup.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const deleted = await prisma.rewardGroupItem.delete({
      where: { id },
    })

    return deleted !== null
  }
}
