"use client"

import { FC, ReactNode } from "react"
import { Provider, cacheExchange, createClient, fetchExchange } from "urql"

interface Props {
  children: ReactNode
}

export const UrqlProvider: FC<Props> = ({ children }) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

  const urqlClient = createClient({
    url: `${serverUrl}/api/graphql`,
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [cacheExchange, fetchExchange],
  })

  return <Provider value={urqlClient}>{children}</Provider>
}
