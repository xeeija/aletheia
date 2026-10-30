import type { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getChannelRewards, getUserAccessToken } from "@/utils/graphql/twitch"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { Channelpoints } from "./channelpoints"

export const metadata: Metadata = {
  title: "Channel Points",
}

const ChannelpointsPage: Page = async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.toString()

  const [channelRewards, error] = await getChannelRewards(undefined, cookie)
  const { user } = await getAuth(cookie)
  const accessToken = await getUserAccessToken(cookie)

  return <Channelpoints user={user} channelRewards={channelRewards} userAccessToken={accessToken} error={error} />
}

export default ChannelpointsPage
