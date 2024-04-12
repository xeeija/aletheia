import { LayoutNextPage, defaultLayout } from "@/components"
import "@/styles/fonts.css"
import "@/styles/global.css"
import { theme } from "@/theme"
import { CssBaseline, ThemeProvider } from "@mui/material"
import type { AppProps } from "next/app"
import { Provider as UrqlProvider, createClient } from "urql"

type LayoutAppProps = AppProps & {
  Component: LayoutNextPage
}

function App({ Component, pageProps }: LayoutAppProps) {
  const getLayout = Component.getLayout ?? defaultLayout()

  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

  const urqlClient = createClient({
    url: `${serverUrl}/api/graphql`,
    fetchOptions: {
      credentials: "include",
    },
  })

  return (
    <UrqlProvider value={urqlClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </UrqlProvider>
  )
}

export default App
