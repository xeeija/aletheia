import { useDelayedState } from "@/hooks"
import { useEffect } from "react"

export const useDelayedValue = <T>(value: T, delayMs: number, immediatePredicate?: (value: T) => boolean) => {
  const [delayedValue, updateValue] = useDelayedState(value, delayMs)

  // console.log("delayedValue call", value)
  // useEffect(() => {
  //   console.log("delayedValue initial")
  // }, [])

  useEffect(() => {
    // if (previous === delayedValue) {
    //   return
    // }

    const immediate = immediatePredicate?.(value) ?? false
    // console.log("delayedValue update", { value, delayedValue, immediateUpdate: immediate })
    // console.log("delayedValue update", { value, immediate })

    updateValue(value, immediate ? 0 : delayMs)

    // updateValue(
    //   (previousValue) => {
    //     console.log("delayedValue set", { value, immediate, previousValue })
    //     // console.log("delayedValue set", { delayedValue, previousValue, immediateUpdate: immediate })
    //     // setPrevious(previousValue)
    //     return value
    //   },
    //   immediate ? 0 : delayMs
    // )

    // return () => {
    //   console.log("clear")
    //   clear()
    // }
    // return () => {
    //   console.log("delayedValue cleanup", { delayedValue, immediateUpdate })
    // }
  }, [value, delayMs, updateValue, immediatePredicate])
  // }, [value, delayedValue, delayMs, updateValue, immediatePredicate, previous])

  return delayedValue
}
