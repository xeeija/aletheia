import type { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getChannelRewards, getUserAccessToken } from "@/utils/graphql/twitch"
import { Metadata } from "next"
import { Channelpoints } from "./channelpoints"

export const metadata: Metadata = {
  title: "Channel Points",
}

const ChannelpointsPage: Page = async () => {
  const channelRewards = await getChannelRewards()
  const { user } = await getAuth()
  const accessToken = await getUserAccessToken()

  return <Channelpoints user={user} channelRewards={channelRewards} userAccessToken={accessToken} />
}

export default ChannelpointsPage
