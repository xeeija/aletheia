import { useEffect, useState, useTransition } from "react"

/**
 * `useTransition` wrapper for synchronous functions to use as Promise. Resolves when `pending` from `useTransition` is finished
 * @returns a tuple with the async callback and a pending flag
 */
// see https://github.com/vercel/next.js/discussions/58520

export const usePromise = (callback: () => void) => {
  const [isPending, startTransition] = useTransition()
  const [isTriggered, setIsTriggered] = useState(false)

  const [resolve, setResolve] = useState<() => void>()

  const callbackAsync = () => {
    return new Promise<void>((resolve) => {
      // setResolve(resolve)
      setResolve(() => resolve)
      startTransition(() => {
        callback()
      })
    })
  }

  useEffect(() => {
    if (isTriggered && !isPending) {
      if (resolve) {
        resolve()

        setIsTriggered(false)
        setResolve(undefined)
      }
    }

    if (isPending) {
      setIsTriggered(true)
    }
  }, [isTriggered, isPending, resolve])

  return [callbackAsync, isPending] as const
}

/**
 * `useTransition` wrapper for synchronous functions with arguments to use as Promise. Resolves when `pending` from `useTransition` is finished
 * @returns a tuple with the async callback and a pending flag
 */
export const usePromiseArgs = <T>(callback: (value: T) => void) => {
  const [isPending, startTransition] = useTransition()
  const [isTriggered, setIsTriggered] = useState(false)

  const [resolve, setResolve] = useState<() => void>()
  const [args, setArgs] = useState<T>()

  const callbackAsync = (args: T) => {
    return new Promise<void>((resolve) => {
      // setResolve(resolve)
      setResolve(resolve)
      setArgs(args)
      startTransition(() => {
        callback(args)
      })
    })
  }

  useEffect(() => {
    if (isTriggered && !isPending) {
      if (resolve && args) {
        resolve()

        setIsTriggered(false)
        setResolve(undefined)
        setArgs(undefined)
      }
    }

    if (isPending) {
      setIsTriggered(true)
    }
  }, [isTriggered, isPending, resolve, args])

  return [callbackAsync, isPending] as const
}
