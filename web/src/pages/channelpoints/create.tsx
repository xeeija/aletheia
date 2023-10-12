import { Typography } from "@mui/material"
import { LayoutNextPage, defaultLayout } from "../../components/layout"
import { CreateChannelRewardForm } from "../../components/twitch"

export const CreateChannelPointsPage: LayoutNextPage = () => {

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create Channel Reward
      </Typography>
      <CreateChannelRewardForm />
    </>
  )
}

CreateChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points" })

export default CreateChannelPointsPage
