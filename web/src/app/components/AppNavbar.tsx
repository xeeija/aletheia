import { Navbar } from "@/components"
import { UserMenuApp } from "@/components/user"
import { Box, Typography } from "@mui/material"
import { FC, ReactNode } from "react"

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

        <UserMenuApp />
      </Navbar>

      <Box sx={{ mt: 8 }} />
    </div>
  )
}
