import { RewardGroup, RewardGroupItem } from "@/generated/typegraphql"
import { getRewards } from "@/twitch/mock"
import type { GraphqlContext } from "@/types"
import { HelixCustomReward } from "@twurple/api"
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql"

@InputType()
class RewardGroupItemInput {
  @Field(() => String)
  rewardId: string

  // @Field({ nullable: true })
  // rewardEnabled?: boolean

  @Field({ nullable: true })
  triggerCooldown?: boolean
}

@ObjectType("RewardGroup")
class RewardGroupFull extends RewardGroup {
  @Field(() => [RewardGroupItem], { nullable: true })
  declare items?: RewardGroupItem[]
}

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
    @Ctx() { req, prisma, apiClient }: GraphqlContext,
    @Arg("name") name: string,
    @Arg("items", () => [RewardGroupItemInput]) items: RewardGroupItemInput[],
    @Arg("triggerSelected", { nullable: true }) triggerSelected?: boolean
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

    // load rewards from twitch to check if enabled
    const rewardIds = items.map((item) => item.rewardId)

    let rewards: HelixCustomReward[]
    try {
      rewards = await apiClient.channelPoints.getCustomRewardsByIds(token.twitchUserId, rewardIds)
    } catch {
      rewards = await getRewards()
    }

    const newRewardGroup = await prisma.rewardGroup.create({
      data: {
        name,
        userId: req.session.userId,
        triggerSelected,
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

    return newRewardGroup
  }

  @Mutation(() => RewardGroupFull, { nullable: true })
  async updateRewardGroup(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string,
    // @Arg("items") items: RewardGroupItemInput[],
    @Arg("triggerSelected", { nullable: true }) triggerSelected?: boolean
  ) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

    const existingGroup = await prisma.rewardGroup.findUnique({
      where: {
        id: id ?? "",
      },
    })

    if (existingGroup?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const rewardGroup = await prisma.rewardGroup.update({
      where: { id },
      data: {
        name,
        triggerSelected,
      },
    })

    return rewardGroup
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRewardGroup(@Ctx() { req, prisma }: GraphqlContext, @Arg("id") id: string) {
    if (!req.session.userId) {
      throw new Error("Not logged in")
    }

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

    return deleted !== null
  }

  @Mutation(() => RewardGroupItem, { nullable: true })
  async createRewardGroupItem(
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
      reward = (await getRewards()).find((r) => r.id === rewardId) ?? null
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
