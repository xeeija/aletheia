import { Page } from "@/types"
import { Typography } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
}

const IndexPage: Page = () => {
  return (
    <div>
      <Typography variant="h2">Dashboard</Typography>
    </div>
  )
}

export default IndexPage
