import {
  RewardGroupFragment,
  RewardGroupInput,
  RewardGroupItemFragment,
  RewardGroupItemInput,
  useAddRewardGroupItemMutation,
  useCreateRewardGroupMutation,
  useDeleteRewardGroupItemMutation,
  useDeleteRewardGroupMutation,
  useRewardGroupQuery,
  useRewardGroupsQuery,
  useUpdateRewardGroupMutation,
} from "@/generated/graphql"

type RewardGroupsConfig = {
  fetchGroups?: boolean
  items?: boolean
  id?: string
}

export const useRewardGroups = (config?: RewardGroupsConfig) => {
  const [{ data, fetching, error }, refetchRewardGroups] = useRewardGroupsQuery({
    variables: {
      items: config?.items ?? true,
    },
    pause: !config?.fetchGroups,
  })

  const [{ data: rewardGroup, fetching: fetchingGroup, error: errorGroup }, refetchRewardGroup] = useRewardGroupQuery({
    variables: {
      id: config?.id ?? "",
    },
    pause: !config?.id,
  })

  const [{ fetching: fetchingCreate, error: errorCreate }, createRewardGroup] = useCreateRewardGroupMutation()
  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateRewardGroup] = useUpdateRewardGroupMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteRewardGroup] = useDeleteRewardGroupMutation()

  const [{ fetching: fetchingAdd, error: errorAdd }, addRewardGroupItem] = useAddRewardGroupItemMutation()
  const [{ fetching: fetchingDeleteItem, error: errorDeleteItem }, deleteItem] = useDeleteRewardGroupItemMutation()

  return {
    rewardGroups: data?.rewardGroups as RewardGroupFragment[] | undefined,
    fetching,
    error,
    rewardGroup: rewardGroup?.rewardGroup as RewardGroupFragment | undefined,
    fetchingGroup,
    errorGroup,
    refetch: () => refetchRewardGroups({ requestPolicy: "cache-and-network" }),
    refetchGroup: () => refetchRewardGroup({ requestPolicy: "cache-and-network" }),
    createGroup: async (rewardGroup: RewardGroupInput, items: RewardGroupItemInput | RewardGroupItemInput[]) => {
      const response = await createRewardGroup(
        {
          rewardGroup,
          items,
        },
        {
          requestPolicy: "cache-and-network",
        }
      )

      return {
        rewardGroup: response.data?.createRewardGroup as RewardGroupFragment | undefined,
        error: response.error,
      }
    },
    fetchingCreate,
    errorCreate,
    updateGroup: async (id: string, rewardGroup: RewardGroupInput) => {
      const response = await updateRewardGroup(
        {
          id,
          rewardGroup,
        },
        {
          requestPolicy: "cache-and-network",
        }
      )

      return {
        rewardGroup: response.data?.updateRewardGroup as RewardGroupFragment | undefined,
        error: response.error,
      }
    },
    fetchingUpdate,
    errorUpdate,
    deleteGroup: async (id: string) => {
      const response = await deleteRewardGroup(
        { id },
        {
          // "RewardGroupItem"
          additionalTypenames: ["RewardGroup"],
          requestPolicy: "cache-and-network",
        }
      )

      return {
        deleted: response.data?.deleteRewardGroup,
        error: response.error,
      }
    },
    fetchingDelete,
    errorDelete,
    addItem: async (rewardGroupId: string, rewardId: string, triggerCooldown?: boolean) => {
      const response = await addRewardGroupItem(
        {
          rewardGroupId,
          rewardId,
          triggerCooldown,
        },
        {
          requestPolicy: "cache-and-network",
        }
      )

      return {
        item: response.data?.addRewardGroupItem as RewardGroupItemFragment | undefined,
        error: response.error,
      }
    },
    fetchingAdd,
    errorAdd,
    deleteItem: async (id: string) => {
      const response = await deleteItem(
        { id },
        {
          // "RewardGroup"
          additionalTypenames: ["RewardGroupItem"],
          requestPolicy: "cache-and-network",
        }
      )

      return {
        deleted: response.data?.deleteRewardGroupItem,
        error: response.error,
      }
    },
    fetchingDeleteItem,
    errorDeleteItem,
  }
}
