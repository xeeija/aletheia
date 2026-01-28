import { Providers, WebVitals } from "@/components"
import { getTitle } from "@/utils"
import { CssBaseline } from "@mui/material"
import { Metadata } from "next"

import { productSans } from "@/style/fonts"
// import "@/style/fonts.css"
import "@/style/global.css"
import type { Layout } from "@/types"

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: {
    default: "Aletheia",
    template: getTitle("%s"),
  },
}

const RootLayout: Layout = ({ children }) => {
  return (
    <html lang="en" className={`${productSans.className} ${productSans.variable}`}>
      <body>
        <WebVitals />
        <Providers>
          <CssBaseline />
          {children}
          {/* <ClientRootLayout>{children}</ClientRootLayout> */}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
