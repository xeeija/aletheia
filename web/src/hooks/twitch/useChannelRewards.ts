import {
  CustomRewardFragment,
  CustomRewardInput,
  useChannelRewardsQuery,
  useCreateChannelRewardMutation,
  useUpdateChannelRewardMutation,
} from "@/generated/graphql"

export const useChannelRewards = (fetchRewards = true) => {
  const [{ data, fetching, error }] = useChannelRewardsQuery({
    variables: {},
    pause: !fetchRewards,
  })

  const [{ fetching: fetchingCreate, error: errorCreate }, createChannelReward] = useCreateChannelRewardMutation()

  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateChannelReward] = useUpdateChannelRewardMutation()

  return {
    channelRewards: data?.channelRewards as CustomRewardFragment[] | undefined,
    fetching,
    error,
    createReward: async (reward: CustomRewardInput) => {
      const response = await createChannelReward(
        { reward },
        {
          // additionalTypenames: ["CustomReward"],
          requestPolicy: "cache-and-network",
        }
      )

      return {
        reward: response.data?.createChannelReward as CustomRewardFragment | undefined,
        error: response.error,
      }
    },
    fetchingCreate,
    errorCreate,
    updateReward: async (rewardId: string, reward: CustomRewardInput) => {
      const response = await updateChannelReward(
        {
          rewardId,
          reward,
        },
        {
          // additionalTypenames: ["CustomReward"],
          requestPolicy: "cache-and-network",
        }
      )

      return {
        reward: response.data?.updateChannelReward as CustomRewardFragment | undefined,
        error: response.error,
      }
    },
    fetchingUpdate,
    errorUpdate,
  }
}
