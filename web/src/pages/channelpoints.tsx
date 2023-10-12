import { Button, SvgIcon, Typography } from "@mui/material"
import Link from "next/link"
import { TiPlus } from "react-icons/ti"
import { LayoutNextPage, defaultLayout } from "../components/layout"
import { useChannelRewards } from "../hooks"

export const ChannelPointsPage: LayoutNextPage = () => {

  const { channelRewards } = useChannelRewards()

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>Rewards</Typography>

      <Link href="/channelpoints/create" passHref>
        <Button
          color="success"
          variant="contained"
          startIcon={<SvgIcon component={TiPlus} inheritViewBox />}
        >
          Create Reward
        </Button>
      </Link>

      {channelRewards?.map((reward) => (
        <pre>
          {reward.title}
        </pre>
      ))}
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points" })

export default ChannelPointsPage
