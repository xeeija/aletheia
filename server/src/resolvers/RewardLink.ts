import { RewardLink } from "@/generated/graphql"
import { CustomReward } from "@/resolvers"
import { accessTokenForUser, findRewardByLink, updateRewardByLink } from "@/twitch"
import { handleSubscriptionRewardUpdate } from "@/twitch/events"
import type { GraphqlContext, RewardLinkType } from "@/types"
import { randomBase64Url } from "@/utils"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"

@Resolver()
export class RewardLinkResolver {
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
    @Ctx() { req, prisma, eventSub, socketIo }: GraphqlContext,
    // @Arg("rewardLink") rewardLink: RewardLinkInput
    @Arg("rewardId") rewardId: string,
    @Arg("type") type: string
  ) {
    const { realTwitchUserId } = await accessTokenForUser({ req, prisma })

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

    await handleSubscriptionRewardUpdate(eventSub, prisma, socketIo, {
      userId: req.session.userId,
      twitchUserId: realTwitchUserId,
    })

    return newRewardLink
  }

  @Mutation(() => Boolean)
  async deleteRewardLink(@Ctx() { req, prisma, eventSub, socketIo }: GraphqlContext, @Arg("id") id: string) {
    const { realTwitchUserId } = await accessTokenForUser({ req, prisma })

    const rewardLink = await prisma.rewardLink.findUnique({
      where: { id },
    })

    if (rewardLink?.userId !== req.session.userId) {
      throw new Error("Unauthorized")
    }

    const deleted = await prisma.rewardLink.delete({
      where: { id: id ?? "" },
    })

    await handleSubscriptionRewardUpdate(eventSub, prisma, socketIo, {
      userId: req.session.userId,
      twitchUserId: realTwitchUserId,
    })

    socketIo.to(`rewardlink/${rewardLink.id}`).emit("reward:update")

    return deleted !== null
  }

  @Query(() => CustomReward)
  async rewardByToken(
    @Ctx() { apiClient, prisma }: GraphqlContext,
    @Arg("token") token: string,
    @Arg("type") type: string
  ) {
    if (!["enable", "pause"].includes(type)) {
      throw new Error("Invalid type")
    }

    const { reward } = await findRewardByLink(apiClient, prisma, token, type as RewardLinkType)

    return reward
  }

  @Mutation(() => CustomReward)
  async updateRewardToken(
    @Ctx() { apiClient, prisma }: GraphqlContext,
    @Arg("token") token: string,
    @Arg("type") type: string
  ) {
    if (!["enable", "pause"].includes(type)) {
      throw new Error("Invalid type")
    }

    const linkType = type as RewardLinkType

    const updatedReward = await updateRewardByLink(apiClient, prisma, token, linkType, (reward) => ({
      isEnabled: linkType === "enable" ? !reward.isEnabled : undefined,
      isPaused: linkType === "pause" ? !reward.isPaused : undefined,
    }))

    return updatedReward
  }
}
