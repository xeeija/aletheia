"use client"

import { ChannelRewardIcon } from "@/components/twitch"
import { useInterval, useRewardLinkSocket, useRewardLinkToken } from "@/hooks"
import { ItemSize, RewardLinkType } from "@/types"
import { getTitle } from "@/utils"
import { Box, Skeleton } from "@mui/material"
import Head from "next/head"
import { notFound, useParams, useSearchParams } from "next/navigation"
import { FC, ReactNode, useState } from "react"

type Params = {
  type: string
  token: string
}

export const Token: FC = () => {
  const params = useParams<Params>()
  const type = params?.type
  const token = params?.token

  const searchParams = useSearchParams()

  const customTitle = searchParams?.get("title") ?? undefined
  const fontSize = Number(searchParams?.get("fontSize")) || null
  const sizeString = searchParams?.get("size")
  const hideTitle = searchParams?.get("hideTitle") === "1"
  const titleBottom = searchParams?.get("titlePosition") === "bottom"

  const size = ["sm", "md", "lg", "xl"].includes(sizeString ?? "") ? (sizeString as ItemSize) : undefined
  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size ?? "xl"]

  const { reward, fetching, updateReward, refetch } = useRewardLinkToken({
    token: token ?? "",
    type: type as RewardLinkType,
  })

  useRewardLinkSocket(token ?? "", !token, () => {
    refetch()
  })

  const [error, setError] = useState<ReactNode>(null)

  // refetch the reward every 10 minutes, to check if status changed
  useInterval(() => refetch(), {
    ms: 10 * 60 * 1000,
    disable: true, // || !reward,
  })

  if (!reward && !fetching) {
    notFound()
  }

  const handleUpdate = async () => {
    const { error } = await updateReward()

    if (error) {
      setError(error.message)
      console.error(error.message)

      setTimeout(() => setError(null), 5000)
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
            error={error}
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
