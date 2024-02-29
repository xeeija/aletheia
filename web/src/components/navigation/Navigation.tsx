import { Box, SvgIcon, Typography, useTheme } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import { HiClock, HiDuplicate, HiViewGridAdd } from "react-icons/hi"
import { TiChartPie, TiHome, TiPipette, TiScissors, TiThList } from "react-icons/ti"
import { Footer, LinkItem, Navbar, Sidebar, UserMenu } from "../components"
import { ChannelPoints } from "../icons"

export interface NavigationProps {
  noAppbar?: boolean
  noPadding?: boolean
  navTitle?: ReactNode
}

const sidebarItems: LinkItem[] = [
  { name: "Home", href: "/", icon: <SvgIcon component={TiHome} color="primary" /> },
  {
    name: "Random Wheel",
    href: "/randomwheel",
    icon: <SvgIcon component={TiChartPie} color="secondary" viewBox="0 1 22 22" />,
  },
  { name: "Channel Points", href: "/channelpoints", icon: <ChannelPoints color="info" viewBox="0 0 20 20" /> },
  {
    name: "Bingo",
    href: "/bingo",
    icon: <SvgIcon component={HiViewGridAdd} color="success" viewBox="0 0 20 20" />,
    disabled: true,
  },
  { name: "Color Palette", icon: <SvgIcon component={TiPipette} color="info" />, disabled: true },
  {
    name: "Pile of Shame",
    icon: <SvgIcon component={HiDuplicate} color="warning" viewBox="0 0 20 20" />,
    disabled: true,
  },
  { name: "Notes", icon: <SvgIcon component={TiThList} color="error" />, disabled: true },
  { name: "Countdown", icon: <SvgIcon component={HiClock} color="primary" viewBox="0 0 20 20" />, disabled: true },
  {
    name: "Rock Paper Scissors",
    icon: <SvgIcon component={TiScissors} color="secondary" viewBox="2 2 20 20" />,
    disabled: true,
  },
  // { divider: true },
]

const sidebarWidth = 240

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Navigation: FC<NavigationProps> = ({ children, noAppbar, noPadding, navTitle }) => {
  const theme = useTheme()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navbarBorderRadius =
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : `calc(${theme.shape.borderRadius} * 2)`

  return (
    <Sidebar items={sidebarItems} openedWidth={sidebarWidth} open={sidebarOpen} setOpen={setSidebarOpen}>
      {!noAppbar && (
        <Navbar marginLeft={sidebarWidth} open={sidebarOpen} borderRadius={navbarBorderRadius}>
          {/* Title */}
          {typeof navTitle === "string" || navTitle === undefined ? (
            <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
              {navTitle}
            </Typography>
          ) : (
            navTitle
          )}

          <UserMenu />
        </Navbar>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          ...(!noAppbar && { mt: 8 }),
          ...(!noPadding && { p: 2 }),
          minHeight: "calc(100vh - 64px)",
          gap: 2,
        }}
      >
        <Box component="main" sx={{ height: "100%" }}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Sidebar>
  )
}
