import {
  RewardLinkFragment,
  useCreateRewardLinkMutation,
  useDeleteRewardLinkMutation,
  useRewardLinksQuery,
} from "@/generated/graphql"
import { RewardLinkType } from "@/types"

// type RewardLinkConfig = {
//   rewardIds?: string | string[]
//   pause?: boolean
// }

export const useRewardLinks = (rewardIds?: string | string[], pause?: boolean) => {
  const [{ data, fetching, error }, fetchRewardLinks] = useRewardLinksQuery({
    variables: {
      rewardIds: rewardIds,
    },
    pause: pause,
    requestPolicy: "cache-first",
  })

  const [{ fetching: fetchingCreate, error: errorCreate }, createRewardLink] = useCreateRewardLinkMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteRewardLink] = useDeleteRewardLinkMutation()

  return {
    rewardLinks: data?.rewardLinks as RewardLinkFragment[] | undefined,
    fetching,
    error,
    createRewardLink: async (rewardId: string, type: RewardLinkType) => {
      const response = await createRewardLink(
        {
          rewardId,
          type,
        },
        {
          requestPolicy: "cache-and-network",
        }
      )

      fetchRewardLinks({ requestPolicy: "cache-and-network" })

      return {
        rewardLink: response.data?.createRewardLink as RewardLinkFragment | undefined,
        error: response.error,
      }
    },
    fetchingCreate,
    errorCreate,
    deleteRewardLink: async (id: string) => {
      const response = await deleteRewardLink(
        { id },
        {
          requestPolicy: "cache-and-network",
          additionalTypenames: ["RewardLink"],
        }
      )

      return {
        deleted: response.data?.deleteRewardLink,
        error: response.error,
      }
    },
    fetchingDelete,
    errorDelete,
  }
}
