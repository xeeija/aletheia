import {
  RewardGroupFragment,
  RewardGroupInput,
  RewardGroupItemFragment,
  RewardGroupItemInput,
  useAddRewardGroupItemMutation,
  useCreateRewardGroupMutation,
  useDeleteRewardGroupItemMutation,
  useDeleteRewardGroupMutation,
  useUpdateRewardGroupMutation,
} from "@/generated/graphql"

export const useRewardGroupsActions = () => {
  const [{ fetching: fetchingCreate, error: errorCreate }, createRewardGroup] = useCreateRewardGroupMutation()
  const [{ fetching: fetchingUpdate, error: errorUpdate }, updateRewardGroup] = useUpdateRewardGroupMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteRewardGroup] = useDeleteRewardGroupMutation()

  const [{ fetching: fetchingAdd, error: errorAdd }, addRewardGroupItem] = useAddRewardGroupItemMutation()
  const [{ fetching: fetchingDeleteItem, error: errorDeleteItem }, deleteItem] = useDeleteRewardGroupItemMutation()

  return {
    createGroup: async (rewardGroup: RewardGroupInput, items: RewardGroupItemInput | RewardGroupItemInput[]) => {
      const response = await createRewardGroup({
        rewardGroup,
        items,
      })

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
      const response = await updateRewardGroup({
        id,
        rewardGroup,
        items,
      })

      return {
        rewardGroup: response.data?.updateRewardGroup as RewardGroupFragment | undefined,
        error: response.error,
      }
    },
    fetchingUpdate,
    errorUpdate,
    deleteGroup: async (id: string) => {
      const response = await deleteRewardGroup({ id })

      return {
        deleted: response.data?.deleteRewardGroup,
        error: response.error,
      }
    },
    fetchingDelete,
    errorDelete,
    addItem: async (rewardGroupId: string, rewardId: string, triggerCooldown?: boolean) => {
      const response = await addRewardGroupItem({
        rewardGroupId,
        rewardId,
        triggerCooldown,
      })

      return {
        item: response.data?.addRewardGroupItem as RewardGroupItemFragment | undefined,
        error: response.error,
      }
    },
    fetchingAdd,
    errorAdd,
    deleteItem: async (id: string) => {
      const response = await deleteItem({ id })

      return {
        deleted: response.data?.deleteRewardGroupItem,
        error: response.error,
      }
    },
    fetchingDeleteItem,
    errorDeleteItem,
  }
}
