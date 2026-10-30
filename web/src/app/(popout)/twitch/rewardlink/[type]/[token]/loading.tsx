import { ChannelRewardStatusOverlay } from "@/components/twitch"
import { Skeleton } from "@mui/material"
import { FC } from "react"

const RewardLinkLoading: FC = () => {
  // default xl size (see page)
  const skeletonSize = 84

  return (
    <>
      <ChannelRewardStatusOverlay size={skeletonSize} statusSize={skeletonSize / 2} enabled loading>
        <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
      </ChannelRewardStatusOverlay>
      <Skeleton variant="rounded" animation={false} sx={{ width: skeletonSize, height: skeletonSize }} />
    </>
  )
}

export default RewardLinkLoading
