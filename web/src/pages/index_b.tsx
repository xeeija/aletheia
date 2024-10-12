import { LayoutNextPage, defaultLayout } from "@/components"
import { Box, Typography } from "@mui/material"

const IndexPage: LayoutNextPage = () => {
  // Next Components
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  return (
    <Box>
      <Typography variant="h2">Dashboard</Typography>
    </Box>
  )
}

IndexPage.getLayout = defaultLayout({ title: "Dashboard", navTitle: "Dashboard" })

export default IndexPage
