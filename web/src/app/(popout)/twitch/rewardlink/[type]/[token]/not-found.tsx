import { ChannelRewardStatusOverlay } from "@/components/twitch"
import { ItemSize, Page } from "@/types"
import { Skeleton } from "@mui/material"
import { Metadata } from "next"
import type { Params, SearchParams } from "./page"

export const metadata: Metadata = {
  title: "Not Found",
}

const NotFoundRewardLink: Page<Params, SearchParams> = async (props) => {
  const [searchParams] = await Promise.all([props.searchParams])

  const size = ["sm", "md", "lg", "xl"].includes(searchParams?.size ?? "") ? (searchParams.size as ItemSize) : "xl"
  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size]

  return (
    <>
      <ChannelRewardStatusOverlay size={skeletonSize} statusSize={skeletonSize / 2} enabled error="Not Found">
        <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
      </ChannelRewardStatusOverlay>

      <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
    </>
  )
}

export default NotFoundRewardLink
