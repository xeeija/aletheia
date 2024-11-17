import { CustomRewardFragment, useChannelRewardsQuery } from "@/generated/graphql"
import { useChannelRewardsActions, useUrqlContextCookies } from "@/hooks"

export const useChannelRewards = (fetchRewards = true, onlyManageable?: boolean) => {
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetch] = useChannelRewardsQuery({
    variables: {
      onlyManageable,
    },
    pause: !fetchRewards,
    context,
  })

  const actions = useChannelRewardsActions()

  return {
    channelRewards: data?.channelRewards as CustomRewardFragment[] | undefined,
    fetching,
    error,
    refetch: () => refetch({ requestPolicy: "cache-and-network" }),
    ...actions,
  }
}
