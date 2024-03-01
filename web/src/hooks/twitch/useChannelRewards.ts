import { CustomRewardFragment, useChannelRewardsQuery } from "@/generated/graphql"

export const useChannelRewards = () => {
  const [{ data, fetching, error }] = useChannelRewardsQuery({
    variables: {},
  })

  return {
    channelRewards: <CustomRewardFragment[] | undefined>data?.channelRewards,
    fetching,
    error,
  }
}
