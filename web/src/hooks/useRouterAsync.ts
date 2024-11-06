import { usePromise, usePromiseArgs } from "@/hooks"
import { useRouter } from "next/navigation"

// see https://github.com/vercel/next.js/discussions/58520

/**
 * async wrapper for `router.refresh()` from `next/navigation` which resolves after refresh is finished
 * @returns a tuple with `[refresh(), isPending]`
 */
export const useRouterRefresh = () => {
  const router = useRouter()
  const [refresh, pending] = usePromise(() => {
    router.refresh()
  })

  return [refresh, pending] as const
}

/**
 * async wrapper for `router.push()` from `next/navigation` which resolves after push is finished
 * @returns a tuple with `[push(), isPending]`
 */
export const useRouterPush = () => {
  const router = useRouter()
  const [push, pending] = usePromiseArgs((href: string) => {
    router.push(href)
  })

  return [push, pending] as const
}

export type AppRouterAsync = {
  refresh: () => Promise<void>
  push: (href: string) => Promise<void>
  pending: boolean
}

export const useRouterAsync = (): AppRouterAsync => {
  // const router = useRouter()
  // const [refresh] = usePromise(() => {
  //   router.refresh()
  // })
  // const [push] = usePromiseArgs((href: string) => {
  //   router.push(href)
  // })

  const [refresh, pendingRefresh] = useRouterRefresh()
  const [push, pendingPush] = useRouterPush()

  return {
    refresh,
    push,
    pending: pendingRefresh || pendingPush,
  }
}
