import { Navbar } from "@/components"
import { UserMenuApp } from "@/components/user"
import { Box, Skeleton, Typography } from "@mui/material"
import { FC, ReactNode, Suspense } from "react"

interface Props {
  children?: ReactNode
}

export const AppNavbar: FC<Props> = ({ children }) => {
  const sidebarWidth = 240

  return (
    <div>
      <Navbar marginLeft={sidebarWidth} borderRadius={8}>
        <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
          {children}
        </Typography>

        <Suspense
          fallback={
            <Box sx={{ display: "flex", gap: 2 }}>
              <Skeleton variant="text" sx={{ width: 80 }} />
              <Skeleton variant="circular" sx={{ width: 36, height: 36 }} />
            </Box>
          }
        >
          <UserMenuApp />
        </Suspense>
      </Navbar>

      <Box sx={{ mt: 8 }} />
    </div>
  )
}
