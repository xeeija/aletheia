import '../../styles/global.css'
import '../../styles/fonts.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../theme'
import { createClient, Provider as UrqlProvider } from 'urql'
import { defaultLayout, LayoutNextPage } from '../components/layout'

type LayoutAppProps = AppProps & {
  Component: LayoutNextPage
}

function App({ Component, pageProps }: LayoutAppProps) {

  const getLayout = Component.getLayout ?? defaultLayout()

  const urqlClient = createClient({
    url: `/api/graphql`,
    fetchOptions: {
      credentials: "include"
    }
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
