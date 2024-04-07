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
import { useRewardGroupSocket } from "@/hooks"

type RewardGroupsConfig = {
  groups?: boolean
  items?: boolean
  id?: string
  socket?: boolean
}

export const useRewardGroups = (config?: RewardGroupsConfig) => {
  // Socket

  const { pausedGroups } = useRewardGroupSocket(!config?.socket)

  // Reward Groups

  const [{ data, fetching, error }, refetchRewardGroups] = useRewardGroupsQuery({
    variables: {
      items: config?.items ?? true,
    },
    pause: !config?.groups,
  })

  const groupsWithoutDate = config?.socket
    ? data?.rewardGroups.map((group) => {
        const paused = pausedGroups.find((g) => g.id === group.id) ?? group
        return {
          ...paused,
          items: group.items,
        }
      })
    : (data?.rewardGroups as RewardGroupFragment[] | undefined)

  const rewardGroups = groupsWithoutDate?.map((group) => ({
    ...group,
    cooldownExpiry: new Date(group.cooldownExpiry ?? ""),
  }))

  // Single Reward Group

  const [{ data: dataGroup, fetching: fetchingGroup, error: errorGroup }, refetchRewardGroup] = useRewardGroupQuery({
    variables: {
      id: config?.id ?? "",
    },
    pause: !config?.id,
  })

  const rewardGroup = config?.socket
    ? pausedGroups.find((g) => g.id === dataGroup?.rewardGroup.id) ?? dataGroup?.rewardGroup
    : (dataGroup?.rewardGroup as RewardGroupFragment | undefined)

  // Actions

  const [{ fetching: fetchingCreate, error: errorCreate }, createRewardGroup] = useCreateRewardGroupMutation()
  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateRewardGroup] = useUpdateRewardGroupMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteRewardGroup] = useDeleteRewardGroupMutation()

  const [{ fetching: fetchingAdd, error: errorAdd }, addRewardGroupItem] = useAddRewardGroupItemMutation()
  const [{ fetching: fetchingDeleteItem, error: errorDeleteItem }, deleteItem] = useDeleteRewardGroupItemMutation()

  return {
    rewardGroups,
    fetching,
    error,
    rewardGroup,
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
    updateGroup: async (
      id: string,
      rewardGroup?: RewardGroupInput,
      items?: RewardGroupItemInput | RewardGroupItemInput[]
    ) => {
      const response = await updateRewardGroup(
        {
          id,
          rewardGroup,
          items,
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
