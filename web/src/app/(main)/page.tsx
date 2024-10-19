import { AppNavbar } from "@/components"
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
    </div>
  )
}

export default IndexPage
