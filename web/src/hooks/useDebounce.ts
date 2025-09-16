import { useTimeout } from "@/hooks"
import { useCallback, useEffect, useRef, useState } from "react"

export const debounce = (callback: () => void, delay: number) => {
  let timeout: NodeJS.Timeout | undefined = undefined

  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(callback, delay)
  }
}

// debounces the callback function, so waits for a delay before calling it, resets the delay when the value changes
// uses the same logic as useInterval/useTimeout, but creates the callback internally from the value
// callback is updated when the value (or delay) changes, instead of on every render
// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// and  https://www.joshwcomeau.com/snippets/javascript/debounce/
export const useDebounce = <T>(value: T, delay: number | null) => {
  const [debounced, setDebounced] = useState(value)

  // update the callback every time the value changes
  const callback = useCallback(() => setDebounced(value), [value])

  const savedCallback = useRef(callback)
  const timeoutRef = useRef<NodeJS.Timeout>(undefined)

  // Remember the latest callback, this is set every time when callback changes
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout
  useEffect(() => {
    // call the latest callback that is stored in savedCallback in setTimeout
    const tick = () => savedCallback.current()

    if (delay !== null) {
      timeoutRef.current = setTimeout(tick, delay)
      return () => clearTimeout(timeoutRef.current)
    }
  }, [delay, value])

  return debounced
}

// useDebounce is essentially a 'useTimeout with extra dependencies when value changes'
export const useDebounceWithTimeout = <T>(value: T, delay: number | null) => {
  const [debounced, setDebounced] = useState(value)
  const [delayWithReset, setDelay] = useState(delay)

  // reset the timeout by setting the delay to null and immediately to the original delay again
  useEffect(() => {
    setDelay(null)
    if (delay) {
      setTimeout(() => setDelay(delay))
    }
  }, [value, delay])

  useTimeout(() => setDebounced(value), delayWithReset)

  return debounced
}
