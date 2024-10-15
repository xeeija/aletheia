import { ClientRootLayout, getTitle, Providers } from "@/components"
import { Metadata } from "next"
import { FC, ReactNode } from "react"

import { productSans } from "@/styles/fonts"
// import "@/styles/fonts.css"
import "@/styles/global.css"

export const metadata: Metadata = {
  icons: "/favicon.svg",
  title: getTitle(),
}

interface Props {
  children: ReactNode
}

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" className={`${productSans.className} ${productSans.variable}`}>
      <body>
        <Providers>
          <ClientRootLayout>{children}</ClientRootLayout>
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
