import '../../styles/global.css'
import '../../styles/fonts.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../theme'
import { createClient, Provider as UrqlProvider } from 'urql'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Navigation, NavigationProps } from '../components/Navigation'

export type LayoutNextPage = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type LayoutAppProps = AppProps & {
  Component: LayoutNextPage
}

function MyApp({ Component, pageProps }: LayoutAppProps) {

  const getLayout = Component.getLayout ?? defaultLayout()

  const urqlClient = createClient({
    url: "http://localhost:4000/graphql",
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

// Helper to pass props to Navigation
// eslint-disable-next-line react/display-name
export const defaultLayout = (navProps?: NavigationProps) => (page: ReactElement) => (
  <Navigation {...navProps}>{page}</Navigation>
)

export default MyApp
