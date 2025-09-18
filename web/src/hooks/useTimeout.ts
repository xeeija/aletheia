import { useCallback, useEffect, useRef } from "react"

// hook that works like setTimeout
// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// and  https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
export const useTimeout = (callback: () => void, delay: number | null) => {
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
  }, [delay])

  const cancel = useCallback(() => clearTimeout(timeoutRef.current), [])

  // should not be needed usually
  // pause the timeout by setting delay to null
  return cancel
}
