import { AppNavbar } from "@/components/navigation"
import { Box } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  title?: ReactNode
  maxWidth?: string | number
  fullWidth?: boolean
}

/**
 * @deprecated Use import from `@/app/components` instead. Workaround for error "Can only import next/headers in Server Component"
 */
export const PageContainer: FC<Props> = ({ children, title, maxWidth = 1360, fullWidth }) => {
  return (
    <>
      <AppNavbar>{title}</AppNavbar>
      <Box sx={{ maxWidth: fullWidth ? undefined : maxWidth, mx: "auto" }}>{children}</Box>
    </>
  )
}
