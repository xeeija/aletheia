import { ChannelRewardStatusOverlay } from "@/components/twitch"
import { Empty, ItemSize, Page } from "@/types"
import { Skeleton } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found",
}

type SearchParams = {
  size?: string
}

const NotFoundRewardLink: Page<Empty, SearchParams> = ({ searchParams }) => {
  const sizeString = searchParams?.size

  const size = ["sm", "md", "lg", "xl"].includes(sizeString ?? "") ? (sizeString as ItemSize) : undefined
  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size ?? "xl"]

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
