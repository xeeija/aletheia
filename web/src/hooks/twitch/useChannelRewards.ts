import { CustomRewardFragment, useChannelRewardsQuery } from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"
import { cache, useMemo } from "react"

interface Config {
  pauseRewards?: boolean
  onlyManageble?: boolean
  initialRewards?: CustomRewardFragment[]
}

export const useChannelRewards = (config?: Config) => {
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetchRewards] = useChannelRewardsQuery({
    variables: {
      onlyManageable: config?.onlyManageble,
    },
    pause: config?.pauseRewards,
    context,
  })

  // const actions = useChannelRewardsActions()

  return useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      channelRewards: (data?.channelRewards ?? config?.initialRewards) as CustomRewardFragment[] | undefined,
      fetching,
      error,
      refetch: () => refetchRewards({ requestPolicy: "cache-and-network" }),
      // ...actions,
    }),
    [data?.channelRewards, config?.initialRewards, fetching, error, refetchRewards]
  )
}

export const useChannelRewardsCached = cache(useChannelRewards)
