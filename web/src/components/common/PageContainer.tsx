import { AppNavbar } from "@/components"
import { Box } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  title?: ReactNode
  maxWidth?: string | number
}

export const PageContainer: FC<Props> = ({ children, title, maxWidth = 1360 }) => {
  return (
    <>
      <AppNavbar>{title}</AppNavbar>
      <Box sx={{ maxWidth, mx: "auto" }}>{children}</Box>
    </>
  )
}
