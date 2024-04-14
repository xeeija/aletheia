import { LayoutNextPage, getTitle } from "@/components"
import { ChannelRewardIcon } from "@/components/twitch"
import { useRewardLinkToken } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { ItemSize, RewardLinkType } from "@/types"
import { ButtonBase, Skeleton } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"

const RewardLinkPage: LayoutNextPage = () => {
  const router = useRouter()
  const {
    action: typeQuery,
    token: tokenQuery,
    size: sizeQuery,
    title: titleQuery,
    fontSize: fontSizeQuery,
  } = router.query

  const type = typeof typeQuery === "string" ? typeQuery : typeQuery?.[0]
  const token = typeof tokenQuery === "string" ? tokenQuery : tokenQuery?.[0]
  const titleOverride = typeof titleQuery === "string" ? titleQuery : titleQuery?.[0]
  const fontSize = typeof fontSizeQuery === "string" ? fontSizeQuery : fontSizeQuery?.[0]
  const sizeString = typeof sizeQuery === "string" ? sizeQuery : sizeQuery?.[0]

  const size = ["sm", "md", "lg", "xl"].includes(sizeString ?? "") ? (sizeString as ItemSize) : undefined
  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size ?? "xl"]

  const { reward, fetching, updateReward } = useRewardLinkToken({
    token: token ?? "",
    type: type as RewardLinkType,
  })

  const [showError, setShowError] = useState<ReactNode>(null)

  if (!reward && !fetching) {
    return <NotFoundPage />
  }

  return (
    <div>
      <Head>
        <title>{getTitle(`Reward ${reward?.title} (${type})`)}</title>
      </Head>

      {reward && !fetching && (
        <ButtonBase
          sx={{ borderRadius: 1 }}
          onClick={async () => {
            //
            const { error } = await updateReward()

            if (error) {
              setShowError(error.message)
              console.error(error.message)

              setTimeout(() => {
                setShowError(null)
              }, 5000)
            }
          }}
        >
          <ChannelRewardIcon
            reward={reward}
            size={size ?? "xl"}
            showTitle
            showStatus
            error={!!showError}
            titleOverride={titleOverride}
            fontSize={Number(fontSize) || undefined}
          />
        </ButtonBase>
      )}

      {fetching && <Skeleton variant="rounded" sx={{ width: skeletonSize, height: skeletonSize }} />}
    </div>
  )
}

RewardLinkPage.getLayout = (page) => page

export default RewardLinkPage
