import type { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getChannelRewards, getUserAccessToken } from "@/utils/graphql/twitch"
import { Metadata } from "next"
import { use } from "react"
import { Channelpoints } from "./channelpoints"

export const metadata: Metadata = {
  title: "Channel Points",
}

const ChannelpointsPage: Page = () => {
  const [channelRewards, error] = use(getChannelRewards())
  const { user } = use(getAuth())
  const accessToken = use(getUserAccessToken())

  return <Channelpoints user={user} channelRewards={channelRewards} userAccessToken={accessToken} error={error} />
}

export default ChannelpointsPage
