import {
  CustomRewardMenuItemFragment,
  RandomWheelSyncFragment,
  useAddWheelSyncMutation,
  useDeleteWheelSyncMutation,
  usePauseWheelSyncMutation,
  useSyncForWheelQuery,
} from "@/generated/graphql"

type SyncWheelInput = {
  rewardId: string
  randomWheelId: string
  useInput?: boolean | null
  addExisting?: boolean | null
}

export type WheelSyncItem = RandomWheelSyncFragment & { reward: CustomRewardMenuItemFragment }

export const useWheelSync = (config: { randomWheelId: string; fetchSync?: boolean }) => {
  const [{ data, fetching, error }, refetch] = useSyncForWheelQuery({
    variables: {
      randomWheelId: config.randomWheelId,
    },
    pause: config.fetchSync === false,
  })

  const [{ fetching: fetchingAdd, error: errorAdd }, addWheelSync] = useAddWheelSyncMutation()
  const [{ fetching: fetchingPause, error: errorPause }, pauseWheelSync] = usePauseWheelSyncMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteWheelSync] = useDeleteWheelSyncMutation()

  return {
    wheelSync: data?.syncForWheel as WheelSyncItem[] | undefined,
    fetching,
    fetchingAdd,
    fetchingPause,
    fetchingDelete,
    error,
    errorAdd,
    errorPause,
    errorDelete,
    addWheelSync: async (input: SyncWheelInput) => {
      await addWheelSync(input, {
        additionalTypenames: ["RandomWheelSync"],
      })
      refetch({ requestPolicy: "cache-and-network" })
    },
    pauseWheelSync: (id: string, paused: boolean) =>
      pauseWheelSync(
        { id, paused },
        {
          additionalTypenames: ["RandomWheelSync"],
        }
      ),
    deleteWheelSync: (ids: string | string[]) =>
      deleteWheelSync(
        { ids },
        {
          additionalTypenames: ["RandomWheelSync"],
        }
      ),
  }
}
