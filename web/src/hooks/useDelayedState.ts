import { SetStateAction, useState } from "react"

// other option
// type SetState<T> = Dispatch<SetStateAction<T>>
// type MaybeSetState<T> = (value?: SetStateAction<T>) => void
// export type DelayedState<T> = [T, SetState2<T>, MaybeSetState<T>, SetState<T>]

type SetState<T> = (value: SetStateAction<T>, delayMs?: number) => void
export type DelayedState<T> = [T, SetState<T>, () => void]

export const useDelayedState = <T>(initialState: T | (() => T), delayMs: number) => {
  const [state, setState] = useState(initialState)

  let timeout: NodeJS.Timeout
  // const [timeout, updateTimeout] = useState<NodeJS.Timeout>()

  // useEffect to clear timeouts when inital state or delay changes?

  const updateState: SetState<T> = (stateAction, delayMsUpdate) => {
    const ts = Date.now()
    console.log("updateState", ts, { delayMsUpdate })
    clearTimeout(timeout)

    if (delayMsUpdate === 0) {
      setState(stateAction)
    } else {
      // const to = setTimeout(() => {
      timeout = setTimeout(() => {
        console.log("setState", ts)
        setState(stateAction)
      }, delayMsUpdate ?? delayMs)
      // updateTimeout(to)
    }
  }

  const clearDelay = () => {
    clearTimeout(timeout)
    // updateTimeout(undefined)
  }

  return [state, updateState, clearDelay] as DelayedState<T>

  // const clearDelayAndUpdate: MaybeSetState<T> = (stateAction) => {
  //   clearTimeout(timeout)
  //   if (stateAction) {
  //     setState(stateAction)
  //   }
  //   updateTimeout(undefined)
  // }
  // return [state, updateState, clearDelay, setState] as DelayedState<T>
}
