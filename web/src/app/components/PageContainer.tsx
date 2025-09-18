import { AppNavbar } from "@/app/components"
import { Box } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  title?: ReactNode
  maxWidth?: string | number
  fullWidth?: boolean
}

export const PageContainer: FC<Props> = ({ children, title, maxWidth = 1360, fullWidth }) => {
  return (
    <>
      <AppNavbar>{title}</AppNavbar>
      <Box sx={{ maxWidth: fullWidth ? undefined : maxWidth, mx: "auto" }}>{children}</Box>
    </>
  )
}
