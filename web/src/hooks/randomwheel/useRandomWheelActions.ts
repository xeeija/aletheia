import {
  RandomWheelInput,
  RandomWheelMemberInput,
  useClearRandomWheelMutation,
  useDeleteRandomWheelEntryMutation,
  useDeleteRandomWheelMutation,
  useUpdateRandomWheelMembersMutation,
  useUpdateRandomWheelMutation,
} from "@/generated/graphql"

export interface RandomWheelActions {
  clear: () => Promise<void>
  updateWheel: (options: RandomWheelInput) => Promise<void>
  updateMembers: (
    members: RandomWheelMemberInput | RandomWheelMemberInput[]
  ) => Promise<{ id: string }[] | null | undefined>
  deleteEntry: (entryId: string) => Promise<void>
  deleteWheel: () => Promise<void>
}

export const useRandomWheelActions = (wheelId: string | undefined) => {
  const [, deleteEntryMutation] = useDeleteRandomWheelEntryMutation()
  const deleteEntry = async (entryId: string) => {
    const { data } = await deleteEntryMutation(
      { id: entryId },
      {
        additionalTypenames: ["RandomWheelEntry"],
      }
    )

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
      id: wheelId,
    })

    console.log(`deleted ${data?.clearRandomWheel} entries`)
  }

  const [, deleteRandomWheel] = useDeleteRandomWheelMutation()
  const deleteWheel = async () => {
    if (!wheelId) {
      return
    }

    const { data } = await deleteRandomWheel({
      id: wheelId,
    })

    // TODO: Proper error handling, or return an error from this function
    if (data?.deleteRandomWheel !== null) {
      console.log("delete error", data?.deleteRandomWheel)
    }
  }

  const [, updateRandomWheel] = useUpdateRandomWheelMutation()
  const updateWheel = async (options: RandomWheelInput) => {
    if (!wheelId) {
      return
    }

    const { data } = await updateRandomWheel({
      id: wheelId,
      options,
    })

    // TODO: Proper error handling, or return an error from this function
    if (data?.updateRandomWheel !== null) {
      console.log("delete error", data?.updateRandomWheel)
    }
  }

  const [, updateWheelMembers] = useUpdateRandomWheelMembersMutation()
  const updateMembers = async (members: RandomWheelMemberInput[]) => {
    if (!wheelId) {
      return
    }

    const { data, error } = await updateWheelMembers({
      randomWheelId: wheelId,
      members: members,
    })

    if (error) {
      console.warn(error)
    }

    return data?.updateRandomWheelMembers
  }

  return <RandomWheelActions>{
    clear,
    updateWheel,
    updateMembers,
    deleteEntry,
    deleteWheel,
  }
}
