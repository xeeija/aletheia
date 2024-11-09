import { useDelayedState } from "@/hooks"
import { useEffect } from "react"

export const useDelayedValue = <T>(value: T, delayMs: number, immediatePredicate?: (value: T) => boolean) => {
  const [delayedValue, updateValue] = useDelayedState(value, delayMs)

  useEffect(() => {
    // if (previous === delayedValue) {
    //   return
    // }

    const immediate = immediatePredicate?.(value) ?? false
    // console.log("delayedValue update", { value, delayedValue, immediateUpdate: immediate })
    // console.log("delayedValue update", { value, immediate })

    updateValue(value, immediate ? 0 : delayMs)
  }, [value, delayMs, updateValue, immediatePredicate])

  return delayedValue
}
