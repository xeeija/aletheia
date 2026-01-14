"use client"

import { ErrorFallback, WebVitals } from "@/components"
import { MuiProvider } from "@/components/providers"
import { AppErrorProps } from "@/types"
import { CssBaseline } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

import { productSans } from "@/style/fonts"
// import "@/style/fonts.css"
import "@/style/global.css"

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: "Aletheia",
}

const GlobalError: FC<AppErrorProps> = ({ error, reset }) => {
  return (
    <html lang="en" className={`${productSans.className} ${productSans.variable}`}>
      <body>
        <WebVitals />
        <MuiProvider>
          <CssBaseline />
          <ErrorFallback global showReset error={error} reset={reset} />
        </MuiProvider>
      </body>
    </html>
  )
}

export default GlobalError
