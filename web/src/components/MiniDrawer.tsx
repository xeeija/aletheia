import React, { useState } from "react"
import { TiThMenu } from "react-icons/ti"
import {
  AppBar, Box, CSSObject, Divider, Drawer, List, ListItem, ListItemIcon,
  ListItemText, SvgIcon, Theme, Toolbar, Tooltip, Typography, useTheme
} from "@mui/material"

const drawerWidth = 200;

// Animate expand (transition)
const transitionMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "margin-left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
})

// Open drawer style
const openedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme),
  overflowX: 'hidden',
  width: drawerWidth,
})

// Closed drawer style
const closedMixin = (theme: Theme): CSSObject => ({
  ...transitionMixin(theme),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

export interface DrawerItem {
  name?: string,
  icon?: JSX.Element,
  divider?: boolean,
  onClick?: React.MouseEventHandler
}

interface Props {
  items: DrawerItem[]
}

// #BetterMiniDrawer
export const MiniDrawer: React.FC<Props> = ({ children, items }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex' }}>

      {/* CSS Style Mixins customize open/closed Drawer and add transition */}
      <Drawer variant="permanent" open={open} sx={{
        ...(open && {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme)
        }),
        ...(!open && {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme)
        }),
      }}>
        <List>
          {/* TODO: Rounded IconButtons 
            margin-right: 8px;
            padding-right: 16px;
            margin-left: 8px;
            border-radius: 8px;
            width: calc(100% - 16px);
            mb: 1, pl: 2.5
           */}
          <Tooltip title="Aletheia" arrow placement="right">
            <ListItem button onClick={() => setOpen(!open)} sx={{ mt: -1, py: 2, pl: 2.5 }}>
              <ListItemIcon>
                <SvgIcon component={TiThMenu} />
              </ListItemIcon>
              <ListItemText aria-label="Open sidebar" primary="Aletheia" />
            </ListItem>
          </Tooltip>

          <Divider variant="middle" sx={{ borderBottomWidth: theme.spacing(0.5) }} />

          {items.map(({ name = "", icon, divider, onClick }) => (
            divider ? <Divider variant="middle" sx={{ borderBottomWidth: theme.spacing(0.25) }} /> :
              <Tooltip key={name} title={name} arrow placement="right" enterDelay={1000} >
                <ListItem button key={name} onClick={onClick} sx={{ pl: 2.5, my: 1, }}>

                  <ListItemIcon>
                    <SvgIcon component={icon?.type} />
                  </ListItemIcon>

                  <Typography noWrap> {/* Nowrwap so buttons are not taller when closed */}
                    <ListItemText primary={name} />
                  </Typography>

                </ListItem>
              </Tooltip>
          ))}
        </List>
      </Drawer>

      <AppBar position="fixed" sx={{
        // zIndex: theme.zIndex.drawer + 1 // Set Appbar above Drawer
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
          ...transitionMixin(theme),
        }}>
          {/* Menu Button in Appbar used, if the Appbar is above drawer */}
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
            sx={{
              marginRight: '36px',
              // ...(open && { display: 'none' }),
            }}>
            <TiThMenu />
          </IconButton> */}
          <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        <Toolbar />
        {children}
      </Box>

    </Box>
  )
}
