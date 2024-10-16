import { ClientRootLayout, Providers } from "@/components"
import { getTitle } from "@/utils"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
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
