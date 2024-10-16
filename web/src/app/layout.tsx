import { ClientRootLayout, getTitle, Providers } from "@/components"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { Metadata } from "next"
import { FC, ReactNode } from "react"

import { productSans } from "@/style/fonts"
// import "@/style/fonts.css"
import "@/style/global.css"

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
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Providers>
            <ClientRootLayout>{children}</ClientRootLayout>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}

export default RootLayout
