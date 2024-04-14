import { LayoutNextPage, getTitle } from "@/components"
import { ChannelRewardIcon } from "@/components/twitch"
import { useChannelRewards } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { ButtonBase } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"

const RewardLinkPage: LayoutNextPage = () => {
  const router = useRouter()
  const { action: actionQuery, token: tokenQuery } = router.query

  const action = typeof actionQuery === "string" ? actionQuery : actionQuery?.[0]
  const token = typeof tokenQuery === "string" ? tokenQuery : tokenQuery?.[0]

  const { channelRewards, fetching } = useChannelRewards()

  const reward = channelRewards?.[0]

  if (!reward && !fetching) {
    return <NotFoundPage />
  }

  return (
    <div>
      <Head>
        <title>{getTitle(`Reward ${reward?.title}`)}</title>
      </Head>

      {reward && (
        <ButtonBase sx={{ borderRadius: 1 }}>
          <ChannelRewardIcon reward={reward} showTitle showStatus size="xl" />
        </ButtonBase>
      )}
    </div>
  )
}

RewardLinkPage.getLayout = (page) => page

export default RewardLinkPage
