"use client"

import { AlertProvider } from "@/components"
import { theme } from "@/theme"
import { ThemeProvider } from "@mui/material"
import { FC, ReactNode } from "react"
import { Provider as UrqlProvider, cacheExchange, createClient, fetchExchange } from "urql"

interface Props {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

  const urqlClient = createClient({
    url: `${serverUrl}/api/graphql`,
    fetchOptions: {
      credentials: "include",
    },
    exchanges: [cacheExchange, fetchExchange],
  })

  return (
    <UrqlProvider value={urqlClient}>
      <ThemeProvider theme={theme}>
        <AlertProvider>{children}</AlertProvider>
      </ThemeProvider>
    </UrqlProvider>
  )
}
