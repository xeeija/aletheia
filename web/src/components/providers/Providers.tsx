import { AlertProvider, MuiProvider, UrqlSsrProvider } from "@/components/providers"
import { NextIntlClientProvider } from "next-intl"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <MuiProvider>
      <UrqlSsrProvider>
        <NextIntlClientProvider>
          <AlertProvider>{children}</AlertProvider>
        </NextIntlClientProvider>
      </UrqlSsrProvider>
    </MuiProvider>
  )
}
