import { useEffect } from "react"

export type IntervalConfig = {
  ms: number
  duration?: number
  disable?: boolean
}

export const useInterval = (fn: () => void, config: IntervalConfig) => {
  useEffect(() => {
    if (config?.disable) {
      return
    }

    const interval = setInterval(fn, config.ms)

    let timeout: NodeJS.Timeout

    if (config.duration || Number.isNaN(config.duration)) {
      timeout = setTimeout(() => clearInterval(interval), Math.max(0, config.duration || 0))
    }

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [fn, config])
}
