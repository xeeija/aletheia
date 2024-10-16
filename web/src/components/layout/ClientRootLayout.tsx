"use client"

import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const ClientRootLayout: FC<Props> = ({ children }) => {
  return children

  // {/* sx={{ maxWidth: "1360px", mx: "auto" }} */}
  // {/* <Navigation>
  //   <div>{children}</div>
  // </Navigation> */}
}
