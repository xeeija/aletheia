import {
  RandomWheelInput,
  RandomWheelMemberInput,
  useClearRandomWheelMutation,
  useDeleteRandomWheelEntryMutation,
  useDeleteRandomWheelMutation,
  useResetShareTokenMutation,
  useUpdateRandomWheelMembersMutation,
  useUpdateRandomWheelMutation,
} from "@/generated/graphql"
import { useAlert } from "@/hooks"

export interface RandomWheelActions {
  clear: () => Promise<void>
  updateWheel: (options: RandomWheelInput) => Promise<void>
  updateMembers: (
    members: RandomWheelMemberInput | RandomWheelMemberInput[]
  ) => Promise<{ id: string }[] | null | undefined>
  deleteEntry: (entryId: string) => Promise<void>
  deleteWheel: () => Promise<void>
  resetShareToken: () => Promise<void>
  fetchingReset: boolean
}

export const useRandomWheelActions = (wheelId: string | undefined) => {
  const { showSuccess, showError } = useAlert()

  const [, deleteEntryMutation] = useDeleteRandomWheelEntryMutation()
  const deleteEntry = async (entryId: string) => {
    const { data, error } = await deleteEntryMutation(
      { id: entryId },
      {
        additionalTypenames: ["RandomWheelEntry"],
      }
    )

    if (error || !data?.deleteRandomWheelEntry) {
      showError(error?.message || "Failed to delete entry")
    }
  }

  const [, clearRandomWheel] = useClearRandomWheelMutation()
  const clear = async () => {
    if (!wheelId) {
      return
    }

    const { data, error } = await clearRandomWheel({
      id: wheelId,
    })

    if (error) {
      showError(error.message)
    }

    console.log(`deleted ${data?.clearRandomWheel} entries`)
  }

  const [, deleteRandomWheel] = useDeleteRandomWheelMutation()
  const deleteWheel = async () => {
    if (!wheelId) {
      return
    }

    const { data, error } = await deleteRandomWheel({
      id: wheelId,
    })

    if (error) {
      showError(error?.message || "Failed to delete wheel")
    }

    if (data?.deleteRandomWheel !== null) {
      console.error("delete error", data?.deleteRandomWheel)
      showError(`${data?.deleteRandomWheel?.errorMessage} (Error ${data?.deleteRandomWheel?.errorCode})`)
    }

    if (data?.deleteRandomWheel === null) {
      showSuccess("Deleted successfully")
    }
  }

  const [, updateRandomWheel] = useUpdateRandomWheelMutation()
  const updateWheel = async (options: RandomWheelInput) => {
    if (!wheelId) {
      return
    }

    const { data, error } = await updateRandomWheel({
      id: wheelId,
      options,
    })

    if (error) {
      showError(error?.message || "Failed to update wheel")
    }

    if (data?.updateRandomWheel) {
      showSuccess(`${data.updateRandomWheel.title} updated successfully`)
    }
  }

  const [{ fetching: fetchingReset }, resetToken] = useResetShareTokenMutation()
  const resetShareToken = async () => {
    if (!wheelId) {
      return
    }

    const { data, error } = await resetToken(
      { randomWheelId: wheelId },
      {
        requestPolicy: "cache-and-network",
        additionalTypenames: ["RandomWheel"],
      }
    )

    if (error || !data?.resetShareToken) {
      showError(error?.message || "Failed to reset token")
    }

    if (data?.resetShareToken) {
      showSuccess(`Token reset successfully`)
    }
  }

  const [, updateWheelMembers] = useUpdateRandomWheelMembersMutation()
  const updateMembers = async (members: RandomWheelMemberInput[]) => {
    if (!wheelId) {
      return
    }

    const { data, error } = await updateWheelMembers(
      {
        randomWheelId: wheelId,
        members: members,
      },
      {
        additionalTypenames: ["RandomWheelMember"],
      }
    )

    if (error) {
      console.warn(error)
      showError(error.message)
    }

    if (data?.updateRandomWheelMembers) {
      showSuccess("Successfully updated members")
    }

    return data?.updateRandomWheelMembers
  }

  return {
    clear,
    updateWheel,
    updateMembers,
    deleteEntry,
    deleteWheel,
    resetShareToken,
    fetchingReset,
  } as RandomWheelActions
}
