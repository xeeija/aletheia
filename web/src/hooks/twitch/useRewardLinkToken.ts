import { CustomRewardMenuItemFragment, useRewardByTokenQuery, useUpdateRewardTokenMutation } from "@/generated/graphql"
import { RewardLinkType } from "@/types"
import { useMemo } from "react"

type RewardLinkConfig = {
  type: RewardLinkType
  token: string
  pause?: boolean
  initialReward?: CustomRewardMenuItemFragment
}

export const useRewardLinkToken = ({ type, token, pause, initialReward }: RewardLinkConfig) => {
  const [{ data, fetching, error, stale }, fetchReward] = useRewardByTokenQuery({
    variables: {
      token,
      type,
    },
    pause: pause || !type || !token,
    requestPolicy: "cache-and-network",
  })

  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateRewardToken] = useUpdateRewardTokenMutation()

  const reward = useMemo(() => data?.rewardByToken ?? initialReward, [data?.rewardByToken, initialReward])

  return {
    reward: reward, // data?.rewardByToken as CustomRewardMenuItemFragment | undefined,
    fetching,
    error,
    refetch: () => {
      fetchReward({
        requestPolicy: "cache-and-network",
        additionalTypenames: ["RewardLink"],
      })
    },
    fetchReward,
    updateReward: async () => {
      const response = await updateRewardToken(
        { token, type },
        {
          requestPolicy: "cache-and-network",
        }
      )

      if (response.error?.graphQLErrors.some((e) => e.message === "Invalid token")) {
        // token got deleted (or became invalid somehow), so refetch to update
        fetchReward({
          requestPolicy: "cache-and-network",
          additionalTypenames: ["RewardLink"],
        })
      }

      return {
        reward: data?.rewardByToken as CustomRewardMenuItemFragment | undefined,
        error: response.error,
      }
    },
    fetchingUpdate,
    errorUpdate,
    stale,
  }
}
