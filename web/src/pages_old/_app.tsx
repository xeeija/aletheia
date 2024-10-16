import { LayoutNextPage, defaultLayout } from "@/components"
import { AlertProvider } from "@/components/providers"
import { theme } from "@/style"
import { CssBaseline, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import { Provider as UrqlProvider, cacheExchange, createClient, fetchExchange } from "urql"

import "@/style/fonts.css"
import "@/style/global.css"

type LayoutAppProps = AppProps & {
  Component: LayoutNextPage
}

const App = ({ Component, pageProps }: LayoutAppProps) => {
  const getLayout = Component.getLayout ?? defaultLayout()

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
        <AlertProvider>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </AlertProvider>
      </ThemeProvider>
    </UrqlProvider>
  )
}

export default App
