"use client"

import { ChannelRewardIcon, ChannelRewardStatusOverlay } from "@/components/twitch"
import type { CustomRewardMenuItemFragment } from "@/generated/graphql"
import { useDebounce, useInterval, useRewardLinkSocket, useRewardLinkToken } from "@/hooks"
import { ItemSize, RewardLinkType } from "@/types"
import { Box, Skeleton } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { FC, ReactNode, useState } from "react"

// const errorMessagePattern = /^\[GraphQL\] /

interface Props {
  token?: string
  type?: string
  reward?: CustomRewardMenuItemFragment
}

export const Token: FC<Props> = ({ token, type, reward: initialReward }) => {
  const searchParams = useSearchParams()

  const customTitle = searchParams?.get("title") ?? undefined
  const fontSize = Number(searchParams?.get("fontSize")) || undefined
  const hideTitle = searchParams?.get("hideTitle") === "1"
  const titleBottom = searchParams?.get("titlePosition") === "bottom"

  const size = ["sm", "md", "lg", "xl"].includes(searchParams.get("size") ?? "")
    ? (searchParams.get("size") as ItemSize)
    : "xl"

  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size]

  const { reward, fetching, fetchingUpdate, updateReward, refetch, stale } = useRewardLinkToken({
    token: token ?? "",
    type: type as RewardLinkType,
    initialReward,
  })

  const loading = useDebounce(fetching || fetchingUpdate, 300)
  const [error, setError] = useState<ReactNode>(null)

  useRewardLinkSocket(token ?? "", !token, refetch)
  // refetch the reward every 10 minutes, to check if status changed
  useInterval(refetch, reward ? 10 * 60 * 1000 : null)

  if (!reward && fetching) {
    // notFound()
    return (
      <>
        <ChannelRewardStatusOverlay size={skeletonSize} statusSize={skeletonSize / 2} enabled error="Not Found">
          <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
        </ChannelRewardStatusOverlay>
        <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
      </>
    )
  }

  const handleUpdate = async () => {
    const { error } = await updateReward()

    if (error) {
      // setError(error.message.replace(errorMessagePattern, "gql: "))
      setError(error.graphQLErrors[0].message)
      console.error(error.message)

      // hide error after a few seconds
      // setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div>
      {reward && !fetching && (
        <Box sx={{ width: "fit-content" }}>
          <ChannelRewardIcon
            reward={reward}
            size={size}
            showTitle={!hideTitle}
            showStatus
            error={error}
            loading={loading}
            stale={stale}
            customTitle={customTitle}
            fontSize={fontSize}
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
