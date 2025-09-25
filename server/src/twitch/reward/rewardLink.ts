import { PrismaClient } from "@/generated/prisma/client.js"
import { getTwitchUserId } from "@/twitch/index.js"
import { RewardIconData, RewardLinkType } from "@/types.js"
import { ApiClient, HelixCustomReward, HelixUpdateCustomRewardData } from "@twurple/api"

export const findRewardByLink = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  token: string,
  type?: RewardLinkType
) => {
  const rewardLink = await prisma.rewardLink.findUnique({
    where: { token },
  })

  if (!rewardLink || (type && type !== rewardLink.type)) {
    throw Error("Invalid token")
  }

  const user = await prisma.user.findUnique({
    where: {
      id: rewardLink.userId,
    },
    include: {
      userAccessTokens: true,
    },
  })

  const twitchUserId = getTwitchUserId(user?.userAccessTokens[0].twitchUserId)

  if (!twitchUserId) {
    throw Error("No twitch account connected")
  }

  const reward = await apiClient.channelPoints.getCustomRewardById(twitchUserId, rewardLink.rewardId)

  if (!reward) {
    throw Error("Reward not found")
  }

  return {
    reward,
    rewardLink,
    twitchUserId,
  }
}

export const updateRewardByLink = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  token: string,
  type: RewardLinkType,
  update: (reward: HelixCustomReward) => HelixUpdateCustomRewardData
) => {
  const { reward, rewardLink, twitchUserId } = await findRewardByLink(apiClient, prisma, token, type)

  const updatedReward = await apiClient.channelPoints.updateCustomReward(twitchUserId, rewardLink.rewardId, {
    ...reward,
    ...update(reward),
  })

  return updatedReward
}

export const getRewardIconData = (reward: HelixCustomReward): RewardIconData => ({
  id: reward.id,
  title: reward.title,
  backgroundColor: reward.backgroundColor,
  image: reward.getImageUrl(2),
  isPaused: reward.isPaused,
  isEnabled: reward.isEnabled,
  isInStock: reward.isInStock,
})
