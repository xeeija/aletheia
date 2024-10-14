"use client"

import { ErrorFallback, getTitle } from "@/components"
import { productSans } from "@/styles/fonts"
import { theme } from "@/theme"
import { AppErrorProps } from "@/types"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

import "@/styles/global.css"

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: getTitle(),
}

const GlobalError: FC<AppErrorProps> = ({ error, reset }) => {
  return (
    <html lang="en" className={`${productSans.className} ${productSans.variable}`}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorFallback global showReset error={error} reset={reset} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export default GlobalError
