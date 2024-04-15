import { LayoutNextPage, getTitle } from "@/components"
import { ChannelRewardIcon } from "@/components/twitch"
import { useRewardLinkToken } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { ItemSize, RewardLinkType } from "@/types"
import { Box, Skeleton } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { ReactNode, useState } from "react"

const RewardLinkPage: LayoutNextPage = () => {
  const router = useRouter()
  const { type: typeParam, token: tokenParam } = router.query

  const type = typeof typeParam === "string" ? typeParam : typeParam?.[0]
  const token = typeof tokenParam === "string" ? tokenParam : tokenParam?.[0]

  const params = new URLSearchParams(router.asPath.split("?")?.[1])

  const customTitle = params.get("title") ?? undefined
  const fontSize = Number(params.get("fontSize")) || null
  const sizeString = params.get("size")
  const hideTitle = params.get("hideTitle") === "1"
  const titleBottom = params.get("titlePosition") === "bottom"

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

  const handleUpdate = async () => {
    const { error } = await updateReward()

    if (error) {
      setShowError(error.message)
      console.error(error.message)

      setTimeout(() => setShowError(null), 5000)
    }
  }

  return (
    <div>
      <Head>
        <title>{getTitle(`Reward ${reward?.title} (${type})`)}</title>
      </Head>

      {reward && !fetching && (
        <Box sx={{ width: "fit-content" }}>
          <ChannelRewardIcon
            reward={reward}
            size={size ?? "xl"}
            showTitle={!hideTitle}
            showStatus
            error={!!showError}
            customTitle={customTitle}
            fontSize={Number(fontSize) || undefined}
            titleBottom={titleBottom}
            button
            onClick={handleUpdate}
          />
        </Box>
      )}

      {fetching && <Skeleton variant="rounded" sx={{ width: skeletonSize, height: skeletonSize }} />}
    </div>
  )
}

RewardLinkPage.getLayout = (page) => page

export default RewardLinkPage
