import { useSpinRandomWheelMutation } from "@/generated/graphql"
import { useAlert } from "@/hooks"

export const useRandomWheelSpin = (wheelId: string | undefined, spinning: boolean) => {
  const [, spinRandomWheel] = useSpinRandomWheelMutation()
  const { showError } = useAlert()

  const spin = async () => {
    if (!wheelId) {
      console.warn("no wheel to spin")
      return
    }

    if (spinning) {
      console.warn("already spinning")
      return
    }

    const { data, error } = await spinRandomWheel({
      wheelId: wheelId,
    })

    if (error || !data?.spinRandomWheel) {
      // error handling
      console.warn(error)
      showError(error?.message || "Failed to spin the wheel")

      return
    }

    // setTimeout(() => {
    //   // TODO: onSpinFinished actually not needed here?
    //   // options?.onSpinFinished?.(true, data.spinRandomWheel)
    //   // setWinnerDialogOpen(true)
    // }, wheel.spinDuration + 500 + 10)
  }

  return spin
}
