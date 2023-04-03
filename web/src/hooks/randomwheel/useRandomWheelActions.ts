import {
  useClearRandomWheelMutation,
  useDeleteRandomWheelEntryMutation,
  useDeleteRandomWheelMutation
} from "../../generated/graphql"

export interface RandomWheelActions {
  clear: () => Promise<void>,
  deleteEntry: (entryId: string) => Promise<void>,
  deleteWheel: () => Promise<void>,
}

export const useRandomWheelActions = (wheelId: string | undefined) => {
  const [, deleteEntryMutation] = useDeleteRandomWheelEntryMutation()
  const deleteEntry = async (entryId: string) => {
    const { data } = await deleteEntryMutation({ id: entryId }, {
      additionalTypenames: ["RandomWheelEntry"]
    })

    if (!data?.deleteRandomWheelEntry) {
      // TODO: Error
    }
  }

  const [, clearRandomWheel] = useClearRandomWheelMutation()
  const clear = async () => {
    if (!wheelId) {
      return
    }

    const { data } = await clearRandomWheel({
      id: wheelId
    })

    console.log(`deleted ${data?.clearRandomWheel} entries`)
  }

  const [, deleteRandomWheel] = useDeleteRandomWheelMutation()
  const deleteWheel = async () => {
    if (!wheelId) {
      return
    }

    const { data } = await deleteRandomWheel({
      id: wheelId
    })

    // TODO: Proper error handling, or return an error from this function
    if (data?.deleteRandomWheel !== null) {
      console.log("delete error", data?.deleteRandomWheel)
    }
  }

  return <RandomWheelActions>{
    deleteEntry,
    deleteWheel,
    clear,
  }
}
