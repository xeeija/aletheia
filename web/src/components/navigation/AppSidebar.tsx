import { Footer, LinkItem, Sidebar } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { Box, SvgIcon } from "@mui/material"
import { FC, ReactNode } from "react"
import { TiChartPie, TiHome } from "react-icons/ti"
import { SidebarProvider } from "../providers"

const sidebarItems: LinkItem[] = [
  {
    name: "Home",
    href: "/",
    icon: (
      <SvgIcon color="primary">
        <TiHome />
      </SvgIcon>
    ),
  },
  {
    name: "Random Wheel",
    href: "/randomwheel",
    icon: (
      <SvgIcon color="secondary" viewBox="0 1 22 22">
        <TiChartPie viewBox="0 1 22 22" />
      </SvgIcon>
    ),
  },
  { name: "Channel Points", href: "/channelpoints", icon: <ChannelPoints color="info" viewBox="0 0 20 20" /> },
  // {
  //   name: "Bingo",
  //   href: "/bingo",
  //   icon: (
  //     <SvgIcon color="success" viewBox="0 0 20 20">
  //       <HiViewGridAdd />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // {
  //   name: "Color Palette",
  //   icon: (
  //     <SvgIcon color="info">
  //       <TiPipette />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // {
  //   name: "Pile of Shame",
  //   icon: (
  //     <SvgIcon color="warning" viewBox="0 0 20 20">
  //       <HiDuplicate />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // {
  //   name: "Notes",
  //   icon: (
  //     <SvgIcon color="error">
  //       <TiThList />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // {
  //   name: "Countdown",
  //   icon: (
  //     <SvgIcon color="primary" viewBox="0 0 20 20">
  //       <HiClock />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // {
  //   name: "Rock Paper Scissors",
  //   icon: (
  //     <SvgIcon color="secondary" viewBox="2 2 20 20">
  //       <TiScissors />
  //     </SvgIcon>
  //   ),
  //   disabled: true,
  // },
  // { divider: true },
]

interface Props {
  children: ReactNode
  fullHeight?: boolean
}

export const AppSidebar: FC<Props> = ({ children, fullHeight = true }) => {
  const sidebarWidth = 240

  return (
    <SidebarProvider>
      <Sidebar items={sidebarItems} openedWidth={sidebarWidth}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            p: 3,
            pb: 2,
            gap: 2,
            minHeight: fullHeight ? "100vh" : undefined,
          }}
        >
          <Box component="main" sx={{ height: "100%" }}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Sidebar>
    </SidebarProvider>
  )
}
