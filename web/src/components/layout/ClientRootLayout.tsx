"use client"

import { Navigation } from "@/components"
import { CssBaseline } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const ClientRootLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <CssBaseline />

      {/* sx={{ maxWidth: "1360px", mx: "auto" }} */}
      <Navigation>
        <div>{children}</div>
      </Navigation>
    </>
  )
}
