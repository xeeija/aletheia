import { getTitle } from "@/components"
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
    </div>
  )
}

export default IndexPage
