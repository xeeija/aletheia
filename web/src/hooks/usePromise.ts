import { useCallback, useEffect, useRef, useTransition } from "react"

/**
 * `useTransition` wrapper for synchronous functions to use as Promise. Resolves when `pending` from `useTransition` is finished
 * @returns a tuple with the async callback and a pending flag
 */
// see https://github.com/vercel/next.js/discussions/58520

export const usePromise = (callback: () => void) => {
  const [isPending, startTransition] = useTransition()

  const triggerRef = useRef(false)
  const resolveRef = useRef<(() => void) | undefined>(undefined)

  const callbackAsync = () => {
    return new Promise<void>((resolve) => {
      resolveRef.current = resolve

      startTransition(() => {
        callback()
      })
    })
  }

  useEffect(() => {
    if (!isPending && triggerRef.current) {
      resolveRef.current?.()

      triggerRef.current = false
      resolveRef.current = undefined
    }

    if (isPending) {
      // setIsTriggered(true)
      triggerRef.current = true
    }
  }, [isPending])

  return [callbackAsync, isPending] as const
}

/**
 * `useTransition` wrapper for synchronous functions with arguments to use as Promise. Resolves when `pending` from `useTransition` is finished
 * @returns a tuple with the async callback and a pending flag
 */
export const usePromiseArgs = <T>(callback: (value: T) => void) => {
  const [isPending, startTransition] = useTransition()

  const triggeredRef = useRef(false)
  const resolveRef = useRef<((value: T) => void) | undefined>(undefined)
  const argsRef = useRef<T | undefined>(undefined)

  const callbackAsync = useCallback(
    (args: T) => {
      return new Promise<void>((resolve) => {
        resolveRef.current = () => resolve
        argsRef.current = args
        startTransition(() => {
          callback(args)
        })
      })
    },
    [callback],
  )

  useEffect(() => {
    if (!isPending && triggeredRef.current) {
      if (resolveRef.current && argsRef.current !== undefined) {
        resolveRef.current?.(argsRef.current)

        triggeredRef.current = false
        resolveRef.current = undefined
        argsRef.current = undefined
      }
    }

    if (isPending) {
      triggeredRef.current = true
    }
  }, [isPending])

  return [callbackAsync, isPending] as const
}
