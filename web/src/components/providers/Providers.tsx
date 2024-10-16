import { AlertProvider, MuiProvider, UrqlProvider } from "@/components/providers"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <MuiProvider>
      <UrqlProvider>
        <AlertProvider>{children}</AlertProvider>
      </UrqlProvider>
    </MuiProvider>
  )
}
