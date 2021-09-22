import '../../styles/global.css'
import '../../styles/fonts.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../theme'
import { createClient, Provider as UrqlProvider } from 'urql'

function MyApp({ Component, pageProps }: AppProps) {
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
        <Component {...pageProps} />
      </ThemeProvider>
    </UrqlProvider>
  )
}
export default MyApp
