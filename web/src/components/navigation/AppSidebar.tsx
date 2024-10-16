"use client"

import { LinkItem, Sidebar } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { Box, SvgIcon } from "@mui/material"
import { FC, ReactNode } from "react"
import { HiClock, HiDuplicate, HiViewGridAdd } from "react-icons/hi"
import { TiChartPie, TiHome, TiPipette, TiScissors, TiThList } from "react-icons/ti"
import { SidebarProvider } from "../providers"

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

interface Props {
  children: ReactNode
}

export const AppSidebar: FC<Props> = ({ children }) => {
  const sidebarWidth = 240

  return (
    <SidebarProvider>
      <Sidebar items={sidebarItems} openedWidth={sidebarWidth}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: 2,
            gap: 2,
          }}
        >
          <Box component="main" sx={{ height: "100%" }}>
            {children}
          </Box>
        </Box>
      </Sidebar>
    </SidebarProvider>
  )
}
