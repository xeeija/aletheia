import { Box, Typography } from "@mui/material"
import { LayoutNextPage, defaultLayout } from "../../components/layout"

export const CreateChannelPointsPage: LayoutNextPage = () => {

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Channel Reward
      </Typography>
      <Box sx={{ width: 500 }}>
        {/* <Button onClick={() => setCreateDialogOpen(true)} >Create</Button> */}
      </Box>

    </>
  )
}

CreateChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points" })

export default CreateChannelPointsPage
