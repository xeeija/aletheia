import React from "react"
import { AppBar, Toolbar, Typography, Button, useTheme } from "@mui/material"
import { transitionMixin } from "./MiniDrawer"

interface Props {
  drawerWidth?: number
  open?: boolean
}

export const Navbar: React.FC<Props> = ({ children, drawerWidth = 0, open = false }) => {

  const theme = useTheme()

  return (
    <AppBar position="fixed" sx={{
      // zIndex: theme.zIndex.drawer + 1 // Set Appbar above Drawer
      // background: "transparent"
    }}>
      <Toolbar sx={{
        ...(open && {
          ml: `${drawerWidth}px`
        }),
        ...(!open && {
          ml: `calc(${theme.spacing(7)} + 1px)`,
          [theme.breakpoints.up('sm')]: {
            ml: `calc(${theme.spacing(8)} + 1px)`,
          },
        }),
        ...transitionMixin(theme)
      }}>

        {children}

      </Toolbar>
    </AppBar>
  )
}
