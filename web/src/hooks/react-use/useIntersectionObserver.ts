import { useCallback, useRef } from "react"
import { getTargetElement, useIsomorphicLayoutEffect, useLatest, useStableTarget, type BasicTarget } from "./utils"

// useIntersectionObserver
// https://github.com/childrentime/reactuse/blob/main/packages/core/src/useIntersectionObserver/index.ts

export type UseIntersectionObserver = (
  target: BasicTarget<Element>,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => () => void

export const useIntersectionObserver: UseIntersectionObserver = (
  target,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = {}
): (() => void) => {
  const savedCallback = useLatest(callback)
  const observerRef = useRef<IntersectionObserver>(undefined)
  const { key: targetKey, ref: targetRef } = useStableTarget(target)

  const stop = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
    }
  }, [])

  // useDeepCompareEffect(() => {
  useIsomorphicLayoutEffect(() => {
    const element = getTargetElement(targetRef.current)
    if (!element) {
      return
    }

    observerRef.current = new IntersectionObserver(savedCallback.current, options)
    observerRef.current.observe(element)

    return stop
  }, [targetKey, options])

  return stop
}
