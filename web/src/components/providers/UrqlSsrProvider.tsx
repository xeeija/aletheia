"use client"

import { cacheExchange, createClient, fetchExchange, ssrExchange, UrqlProvider } from "@urql/next"
import { FC, ReactNode, useMemo } from "react"

interface Props {
  children: ReactNode
}

export const UrqlSsrProvider: FC<Props> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

    const ssr = ssrExchange({
      isClient: typeof window !== "undefined",
    })

    const client = createClient({
      url: `${serverUrl}/api/graphql`,
      exchanges: [cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: {
        credentials: "include",
      },
    })

    return [client, ssr]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}
