import React from "react"
import { Box, CSSObject, Divider, Drawer, Theme, Tooltip, useTheme } from "@mui/material"
import { LinkList, LinkListItem, LinkItem } from "./LinkList"
import { LogoIcon } from "./LogoIcon"

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

interface Props {
  items: LinkItem[]
  drawerWidth: number
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// #BetterMiniDrawer
export const MiniDrawer: React.FC<Props> = ({ children, items, drawerWidth, open, setOpen }) => {
  const theme = useTheme()
  const itemWidth = `calc(100% - ${theme.spacing(2)})`

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

        <Tooltip title="Aletheia" arrow placement="right" enterDelay={1000}>
          <LinkListItem name="Aletheia"
            onClick={() => setOpen(!open)}
            // margin left (px): (width - base size) / 2
            icon={<LogoIcon sx={{ width: 30, height: "auto", ml: -(3 / 8) }} />}
            sx={{ width: itemWidth, mt: 1.75, mb: 1.25, }}
            textProps={{ primaryTypographyProps: { fontWeight: 500 } }}
          />
        </Tooltip>

        <Divider variant="middle" sx={{ borderBottomWidth: 4 }} />

        <LinkList items={items} sx={{ p: 0 }}>
          {({ name = "", divider, ...props }) => (
            divider ?
              <LinkListItem divider={divider} /> :
              <Tooltip title={name} arrow placement="right" enterDelay={1000}>
                <LinkListItem name={name} {...props} sx={{ width: itemWidth }} />
              </Tooltip>
          )}
        </LinkList>

      </Drawer>

      {children}

    </Box>
  )
}
