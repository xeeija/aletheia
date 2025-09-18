import { useCallback, useEffect, useRef } from "react"

// hook that works like setInterval
// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// and  https://www.joshwcomeau.com/snippets/react-hooks/use-interval/
export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef(callback)
  const intervalRef = useRef<NodeJS.Timeout>(undefined)

  // Remember the latest callback, this is set every time when callback changes
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    // call the latest callback that is stored in savedCallback in setInterval
    const tick = () => savedCallback.current()

    if (delay !== null) {
      intervalRef.current = setInterval(tick, delay)
      return () => clearInterval(intervalRef.current)
    }
  }, [delay])

  const cancel = useCallback(() => clearInterval(intervalRef.current), [])

  // should not be needed usually
  // pause the interval by setting delay to null
  return cancel
}

// export type IntervalConfig = {
//   ms: number
//   duration?: number
//   disable?: boolean
// }

// works a bit weird, sometimes stale or interval is cancelled
// export const useInterval = (fn: () => void, config: IntervalConfig) => {
//   useEffect(() => {
//     if (config?.disable) {
//       return
//     }

//     const interval = setInterval(fn, config.ms)

//     let timeout: NodeJS.Timeout

//     if (config.duration || Number.isNaN(config.duration)) {
//       timeout = setTimeout(() => clearInterval(interval), Math.max(0, config.duration || 0))
//     }

//     return () => {
//       clearInterval(interval)
//       clearTimeout(timeout)
//     }
//   }, [fn, config])
// }
