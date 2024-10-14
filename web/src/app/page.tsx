import { getTitle } from "@/components"
import { EnvInfoBadge } from "@/components/common/EnvInfoBadgeApp"
import { Typography } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

export const metadata: Metadata = {
  title: getTitle("Dashboard"),
}

const IndexPage: FC = () => {
  return (
    <div>
      <Typography variant="h2">Dashboard</Typography>
      <EnvInfoBadge />
    </div>
  )
}

export default IndexPage
