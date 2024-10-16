import { Providers } from "@/components"
import { getTitle } from "@/utils"
import { CssBaseline } from "@mui/material"
import { Metadata } from "next"
import { FC, ReactNode } from "react"

import { productSans } from "@/style/fonts"
// import "@/style/fonts.css"
import "@/style/global.css"

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: {
    default: "Aletheia",
    template: getTitle("%s"),
  },
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={`${productSans.className} ${productSans.variable}`}>
      <body>
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
