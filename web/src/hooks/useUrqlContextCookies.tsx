import { useMemo } from "react"
import { OperationContext } from "urql"
import { useCookies } from "./useCookies"

// export const useUrqlContextCookies = (context?: Partial<OperationContext>) => {
export const useUrqlContextCookies = () => {
  const cookieStore = useCookies()
  const cookie = useMemo(() => cookieStore, [cookieStore])

  const contextMemo = useMemo<Partial<OperationContext>>(
    () => ({
      // ...context,
      fetchOptions: {
        credentials: "include",
        headers: cookie ? { cookie: cookie } : undefined,
        // ...context?.fetchOptions,
      },
    }),
    [cookie]
  )

  return contextMemo
}
