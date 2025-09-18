import { AlertProvider, MuiProvider, UrqlSsrProvider } from "@/components/providers"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <MuiProvider>
      <UrqlSsrProvider>
        <AlertProvider>{children}</AlertProvider>
      </UrqlSsrProvider>
    </MuiProvider>
  )
}
