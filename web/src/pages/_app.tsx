import '../../styles/global.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
