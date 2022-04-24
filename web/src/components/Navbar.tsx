import React from "react"
import { AppBar, Toolbar, useTheme } from "@mui/material"
import { transitionMixin } from "./Sidebar"

interface Props {
  open?: boolean
  borderRadius?: number | string
  marginLeft?: number
}

export const Navbar: React.FC<Props> = ({ children, open = false, marginLeft = 0, borderRadius }) => {

  const theme = useTheme()

  return (
    <AppBar position="fixed" sx={{
      // zIndex: theme.zIndex.drawer + 1 // Set Appbar above Drawer
      // background: "transparent"
    }}>
      <Toolbar sx={{
        ...(open && {
          ml: `${marginLeft}px`
        }),
        ...(!open && {
          ml: `calc(${theme.spacing(7)} + 1px)`,
          [theme.breakpoints.up('sm')]: {
            ml: `calc(${theme.spacing(8)} + 1px)`,
          },
        }),
        ...transitionMixin(theme),
        ...(borderRadius && {
          "::before, ::after": {
            content: `""`,
            position: "absolute",
            top: 64,
            left: 0,
            width: borderRadius,
            height: borderRadius,
            backgroundColor: theme.palette.background.paper,
          },
          "::after": {
            backgroundColor: theme.palette.background.default,
            borderTopLeftRadius: borderRadius,
          }
        })
      }}>

        {children}

      </Toolbar>
    </AppBar>
  )
}
