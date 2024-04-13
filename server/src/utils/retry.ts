export const retryWithBackoff = async <T = void>(
  // callback to finish and stop retrying early
  fn: (finish: () => void, retries: number) => T | Promise<T>,
  config?: {
    retries?: number
    maxDelay?: number
    unit?: number
    // runs when finished, just before returning
    finished?: (retries: number) => void | Promise<void>
  }
): Promise<T> => {
  const unit = config?.unit ?? 1000
  const maxRetries = config?.retries ?? 4
  const maxDelay = (config?.maxDelay ?? 8) * unit

  let retries = 0
  let finished = false

  while (retries < maxRetries - 1) {
    const result = await fn(() => {
      finished = true
    }, retries)

    if (finished) {
      await config?.finished?.(retries)
      return result
    }

    await new Promise((resolve) => setTimeout(resolve, Math.min(maxDelay, unit * Math.pow(2, retries))))

    retries++
  }

  const result = await fn(() => {}, retries)
  await config?.finished?.(retries)

  return result
}
