import { CustomRewardFragment, useChannelRewardsQuery } from "@/generated/graphql"

export const useChannelRewards = () => {
  const [{ data, fetching, error }] = useChannelRewardsQuery({
    variables: {},
  })

  return {
    channelRewards: data?.channelRewards as CustomRewardFragment[] | undefined,
    fetching,
    error,
  }
}
