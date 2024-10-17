import { AppNavbar } from "@/components"
import { EnvInfoBadge } from "@/components/common/EnvInfoBadgeApp"
import { Typography } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

export const metadata: Metadata = {
  title: "Dashboard",
}

const IndexPage: FC = () => {
  return (
    <div>
      <AppNavbar>Dashboard</AppNavbar>

      <Typography variant="h2">Dashboard</Typography>
      <EnvInfoBadge />
    </div>
  )
}

export default IndexPage
