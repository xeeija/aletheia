import { ButtonContainer } from "@/components"
import { ChannelRewardIconTitle, ChannelRewardStatusOverlay } from "@/components/twitch"
import { CustomRewardMenuItemFragment } from "@/generated/graphql"
import { ItemSize } from "@/types"
import { Avatar, Box, SvgIcon } from "@mui/material"
import Image from "next/image"
import { FC, ReactNode } from "react"
import { TiMediaPause, TiPower } from "react-icons/ti"

const defaultImagePattern = /default-[124]\.\w+$/

interface Props {
  reward: CustomRewardMenuItemFragment
  size?: ItemSize
  showTitle?: boolean
  showStatus?: boolean
  loading?: boolean
  error?: ReactNode
  customTitle?: string
  fontSize?: number
  titleBottom?: boolean
  button?: boolean
  onClick?: () => void
}

export const ChannelRewardIcon: FC<Props> = ({
  reward,
  size: sizeInput = "sm",
  showTitle,
  showStatus,
  loading,
  error,
  customTitle,
  fontSize,
  titleBottom,
  button,
  onClick,
}) => {
  const sizes = {
    sm: 28,
    md: 40,
    lg: 48,
    xl: 84,
  }

  const notActive = reward.isPaused || !reward.isEnabled || loading || !!error
  const disabledPaused = (reward.isPaused && !reward.isEnabled && !error) || loading
  const showTitleBottom = sizeInput !== "xl" || titleBottom

  const imageAdjust = (!reward.image || reward.image.match(defaultImagePattern)) && sizeInput !== "xl" ? 1.2 : 1

  const size = sizes[sizeInput]
  const iconSize = (sizeInput === "xl" ? size * 0.5 : size * 0.65) * imageAdjust
  const statusSize = (Math.max(24, size / 2) + 2) * (disabledPaused ? 0.8 : 1)

  const rewardTitle = (
    <ChannelRewardIconTitle fontSize={fontSize} background={!showTitleBottom ? reward.backgroundColor : ""}>
      {customTitle ?? reward.title}
    </ChannelRewardIconTitle>
  )

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      <ButtonContainer button={button} onClick={onClick}>
        {showStatus && (
          <ChannelRewardStatusOverlay
            size={size}
            statusSize={statusSize}
            enabled={notActive}
            loading={loading}
            error={error}
            fontSize={fontSize}
          >
            {!reward.isEnabled && <SvgIcon component={TiPower} fontSize="inherit" viewBox="1 3 20 20" />}
            {reward.isPaused && (
              <SvgIcon
                component={TiMediaPause}
                fontSize="inherit"
                viewBox="1 3 20 20"
                sx={{
                  ml: disabledPaused ? -0.75 : 0,
                }}
              />
            )}
          </ChannelRewardStatusOverlay>
        )}
        <Avatar
          variant="rounded"
          sx={{
            backgroundColor: reward.backgroundColor || "primary.main",
            width: size,
            height: size,
            flexDirection: "column",
          }}
        >
          <Image
            alt={`${reward.title} Reward`}
            src={reward.image || "/img/channelpoints-2.png"}
            width={iconSize}
            height={iconSize}
            style={{
              marginBottom: showTitle && sizeInput === "xl" ? "4px" : undefined,
              marginTop: showTitle && sizeInput === "xl" ? 2 : 0,
            }}
            unselectable="on"
            draggable="false"
          />
          {showTitle && !showTitleBottom && rewardTitle}
        </Avatar>
      </ButtonContainer>

      {showTitle && showTitleBottom && (
        <Box sx={{ width: sizeInput === "xl" ? size * 1.25 : size * 1.75, mt: 0.25 }}>{rewardTitle}</Box>
      )}
    </Box>
  )
}
