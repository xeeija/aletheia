import { useEffect, useLayoutEffect, useReducer, useRef, type RefObject } from "react"

// from react-use
// https://github.com/childrentime/reactuse

type TargetValue<T> = T | undefined | null

type TargetType = HTMLElement | Element | Window | Document | EventTarget

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | RefObject<TargetValue<T>>

export const isBrowser = typeof window !== "undefined"

export type Fn = (this: unknown, ...args: unknown[]) => unknown

export function isFunction<T extends Fn>(val: unknown): val is T {
  return typeof val === "function"
}

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isBrowser) {
    return undefined
  }

  if (!target) {
    return defaultElement
  }

  let targetElement: TargetValue<T>

  if (isFunction(target)) {
    targetElement = target()
  } else if ("current" in target) {
    targetElement = target.current
  } else {
    targetElement = target
  }

  return targetElement
}

/**
 * Creates a stable identifier for a BasicTarget that can be safely used in effect dependencies.
 *
 * This hook solves the problem where passing unstable function references like `() => document`
 * would cause infinite re-renders when used directly in effect dependency arrays.
 *
 * @param target - The target element (ref, function, or direct element)
 * @param defaultElement - Default element to use if target is undefined
 * @returns A stable reference that only changes when the actual target element changes
 *
 * @example
 * ```tsx
 * // For ref objects: returns the ref itself (stable)
 * const ref = useRef<HTMLDivElement>(null)
 * const key = useStableTarget(ref) // key === ref (stable)
 *
 * // For functions: returns the resolved actual element
 * const key = useStableTarget(() => document) // key === document (stable)
 *
 * // For direct elements: returns the element itself
 * const key = useStableTarget(divElement) // key === divElement (stable)
 * ```
 */
export function useStableTarget<T extends HTMLElement | Element | Window | Document | EventTarget>(
  target?: BasicTarget<T>,
  defaultElement?: T
) {
  const targetRef = useRef(target)
  targetRef.current = target

  // Calculate stable key without memoization
  // For ref objects: return the ref itself (always stable)
  // For functions/direct elements: resolve to the actual element
  let stableKey: unknown
  if (!target) {
    stableKey = defaultElement ?? null
  } else if (typeof target === "object" && "current" in target) {
    // Ref object - use the ref itself as the stable key
    stableKey = target
  } else {
    // Function or direct element - resolve to actual element
    stableKey = getTargetElement(target, defaultElement)
  }

  return {
    /** The stable key that can be safely used in effect dependencies */
    key: stableKey,
    /** A ref containing the current target (useful for accessing in effects) */
    ref: targetRef,
  }
}

export const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect

// useUpdate

const updateReducer = (num: number): number => (num + 1) % 1_000_000

export function useUpdate(): () => void {
  const [, update] = useReducer(updateReducer, 0)

  return update
}

// useLatest

export type UseLatest = <T>(value: T) => RefObject<T>

export const useLatest: UseLatest = <T>(value: T): RefObject<T> => {
  const ref = useRef(value)
  useIsomorphicLayoutEffect(() => {
    ref.current = value
  }, [value])
  return ref
}

// useCustomCompareEffect

// export type DepsEqualFnType<TDeps extends DependencyList> = (prevDeps: TDeps, nextDeps: TDeps) => boolean

// export type UseCustomCompareEffect = <TDeps extends DependencyList>(
//   effect: EffectCallback,
//   deps: TDeps,
//   depsEqual: DepsEqualFnType<TDeps>
// ) => void

// export const useCustomCompareEffect: UseCustomCompareEffect = <TDeps extends DependencyList>(
//   effect: EffectCallback,
//   deps: TDeps,
//   depsEqual: DepsEqualFnType<TDeps>
// ): void => {
//   if (process.env.NODE_ENV !== "production") {
//     if (!Array.isArray(deps) || !deps.length) {
//       console.warn("`useCustomCompareEffect` should not be used with no dependencies. Use React.useEffect instead.")
//     }

//     if (typeof depsEqual !== "function") {
//       console.warn("`useCustomCompareEffect` should be used with depsEqual callback for comparing deps list")
//     }
//   }

//   const ref = useRef<TDeps | undefined>(undefined)
//   const forceUpdate = useUpdate()

//   if (!ref.current) {
//     ref.current = deps
//   }

//   useIsomorphicLayoutEffect(() => {
//     if (!depsEqual(deps, ref.current as TDeps)) {
//       ref.current = deps
//       forceUpdate()
//     }
//   })

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   useEffect(effect, ref.current)
// }

// useDeepCompareEffect

// export type UseDeepCompareEffect = (effect: EffectCallback, deps: DependencyList) => void

// export const useDeepCompareEffect: UseDeepCompareEffect = (effect: EffectCallback, deps: DependencyList): void => {
//   if (process.env.NODE_ENV !== "production") {
//     if (!Array.isArray(deps) || !deps.length) {
//       console.warn("`useDeepCompareEffect` should not be used with no dependencies. Use `useEffect` instead.")
//     }
//   }

//   // TODO: use lodash-es isEqual?
//   // or any other deep-equal comparison
//   useCustomCompareEffect(effect, deps, (a, b) => a && b && a.length === b.length && a.every((x, i) => x === b[i]))
// }
