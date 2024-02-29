import { useSpinRandomWheelMutation } from "../../generated/graphql"

export const useRandomWheelSpin = (wheelId: string | undefined, spinning: boolean) => {
  const [, spinRandomWheel] = useSpinRandomWheelMutation()
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

    if (!data) {
      // error handling
      console.warn(error)
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
