"use client"

import { ButtonContainer } from "@/components"
import { ChannelRewardStatusOverlay } from "@/components/twitch"
import { AppErrorProps, ItemSize } from "@/types"
import { Skeleton } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { FC } from "react"

const ErrorRewardLink: FC<AppErrorProps> = ({ error, reset }) => {
  const searchParams = useSearchParams()
  const sizeString = searchParams?.get("size")

  const size = ["sm", "md", "lg", "xl"].includes(sizeString ?? "") ? (sizeString as ItemSize) : undefined
  const skeletonSize = { sm: 28, md: 40, lg: 48, xl: 84 }[size ?? "xl"]

  return (
    <ButtonContainer button onClick={() => reset()}>
      <ChannelRewardStatusOverlay
        size={skeletonSize}
        statusSize={skeletonSize / 2}
        enabled
        error={error.message || error.name || "Error"}
        fontSize={11}
      >
        <Skeleton variant="rounded" animation={"pulse"} sx={{ width: skeletonSize, height: skeletonSize }} />
      </ChannelRewardStatusOverlay>

      <Skeleton variant="rounded" animation={"pulse"} sx={{ width: skeletonSize, height: skeletonSize }} />
    </ButtonContainer>
  )
}

export default ErrorRewardLink
