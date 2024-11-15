import { useMemo } from "react"
import { OperationContext } from "urql"
import { useCookies } from "./useCookies"

export const useUrqlContextCookies = (context?: Partial<OperationContext>) => {
  const cookie = useCookies()
  const contextMemo = useMemo<Partial<OperationContext>>(
    () => ({
      ...context,
      fetchOptions: {
        credentials: "include",
        headers: cookie ? { cookie: cookie } : undefined,
        ...context?.fetchOptions,
      },
    }),
    [cookie, context]
  )

  return contextMemo
}
