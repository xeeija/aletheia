import { CustomRewardMenuItemFragment, useRewardByTokenQuery, useUpdateRewardTokenMutation } from "@/generated/graphql"
import { RewardLinkType } from "@/types"

type RewardLinkConfig = {
  type: RewardLinkType
  token: string
  pause?: boolean
}

export const useRewardLinkToken = ({ type, token, pause }: RewardLinkConfig) => {
  const [{ data, fetching, error }, fetchReward] = useRewardByTokenQuery({
    variables: {
      token,
      type,
    },
    pause: pause || !type || !token,
    requestPolicy: "cache-and-network",
  })

  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateRewardToken] = useUpdateRewardTokenMutation()

  return {
    reward: data?.rewardByToken as CustomRewardMenuItemFragment | undefined,
    fetching,
    error,
    refetch: () => {
      fetchReward({
        requestPolicy: "cache-and-network",
        additionalTypenames: ["RewardLink"],
      })
    },
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
  }
}
