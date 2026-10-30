import { AppNavbar } from "@/app/components"
import { Box, LinearProgress } from "@mui/material"
import { FC, ReactNode, Suspense } from "react"

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
      <Suspense fallback={<LinearProgress sx={{ mx: -3, mt: -3, mb: 2.5, zIndex: 1100 }} />}>
        <Box sx={{ maxWidth: fullWidth ? undefined : maxWidth, mx: "auto" }}>{children}</Box>
      </Suspense>
    </>
  )
}
