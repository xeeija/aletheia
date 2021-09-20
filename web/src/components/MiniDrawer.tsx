import React from "react"
import { TiThMenu } from "react-icons/ti"
import {
  Box, CSSObject, Divider, Drawer, List, ListItem, ListItemIcon,
  ListItemText, SvgIcon, Theme, Tooltip, useTheme
} from "@mui/material"

// Animate expand (transition)
export const transitionMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "margin-left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
})

// Open drawer style
const openedMixin = (theme: Theme, width: number): CSSObject => ({
  ...transitionMixin(theme),
  overflowX: "hidden",
  width: width,
})

// Closed drawer style
const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

export interface DrawerItem {
  name?: string,
  icon?: JSX.Element,
  divider?: boolean,
  onClick?: React.MouseEventHandler
}

interface Props {
  items: DrawerItem[]
  drawerWidth: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// #BetterMiniDrawer
export const MiniDrawer: React.FC<Props> = ({ children, items, drawerWidth, open, setOpen }) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: "flex" }}>

      {/* CSS Style Mixins customize open/closed Drawer and add transition */}
      <Drawer variant="permanent" open={open} sx={{
        whiteSpace: "nowrap",
        ...(open && {
          ...openedMixin(theme, drawerWidth),
          "& .MuiDrawer-paper": openedMixin(theme, drawerWidth)
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme)
        }),
      }}>
        <List>
          <Tooltip title="Aletheia" arrow placement="right">
            <ListItem button onClick={() => setOpen(!open)} sx={{
              width: `calc(100% - ${theme.spacing(2)})`,
              borderRadius: 1.5,
              m: theme.spacing(-0.125, 1, 1.125),
              p: theme.spacing(1, 1.5),
            }}>
              <ListItemIcon>
                {/* TODO: Replace menu with logo icon? */}
                <SvgIcon component={TiThMenu} />
              </ListItemIcon>
              <ListItemText aria-label="Open sidebar" primary="Aletheia" />
            </ListItem>
          </Tooltip>

          <Divider variant="middle" sx={{ mt: -0.25, borderBottomWidth: theme.spacing(0.5) }} />

          {items.map(({ name = "", icon, divider, onClick }, index) => (
            divider ?
              <Divider key={`divider-${index}`} variant="middle" sx={{ borderBottomWidth: theme.spacing(0.25) }} /> :
              <Tooltip key={name} title={name} arrow placement="right" enterDelay={1000} >
                <ListItem button key={name} onClick={onClick} sx={{
                  width: `calc(100% - ${theme.spacing(2)})`,
                  borderRadius: 1.5,
                  m: 1, // theme.spacing(0.75, 1),
                  p: theme.spacing(0.5, 1.5),
                }}>
                  <ListItemIcon>
                    {/* <SvgIcon component={icon?.type} /> */}
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Tooltip>
          ))}
        </List>
      </Drawer>

      {children}

    </Box>
  )
}
