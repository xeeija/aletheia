import { CustomRewardMenuItemFragment } from "@/generated/graphql"
import { ItemSize } from "@/types"
import { Avatar, Box, CircularProgress, SvgIcon, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"
import { TiMediaPause, TiPower, TiWarning } from "react-icons/ti"

const defaultImagePattern = /default-[124]\.\w+$/

interface Props {
  reward: CustomRewardMenuItemFragment
  size?: ItemSize
  showTitle?: boolean
  showStatus?: boolean
  loading?: boolean
  error?: boolean
  customTitle?: string
  fontSize?: number
  titleBottom?: boolean
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
}) => {
  const sizes = {
    sm: 28,
    md: 40,
    lg: 48,
    xl: 84,
  }

  const notActive = reward.isPaused || !reward.isEnabled || loading || error
  const disabledPaused = reward.isPaused && !reward.isEnabled
  const showTitleBottom = sizeInput !== "xl" || titleBottom

  const imageAdjust = !reward.image || reward.image.match(defaultImagePattern) ? 1 : 1

  const size = sizes[sizeInput]
  const iconSize = (sizeInput === "xl" ? size * 0.5 : size * 0.65) * imageAdjust
  const statusSize = (Math.max(24, size / 2) + 2) * (disabledPaused ? 0.8 : 1)

  const rewardTitle = (
    <Typography
      variant="body2"
      className="line-clamp line-clamp-2"
      sx={{
        fontWeight: 500,
        fontSize: fontSize ?? 12,
        textAlign: "center",
        lineHeight: 1,
        height: (fontSize ?? 12) * 2,
        mx: 0.25,
        // mb: -0.5,
        color: (theme) =>
          theme.palette.getContrastText(
            (!showTitleBottom ? reward.backgroundColor : theme.palette.background.default) || theme.palette.primary.main
          ),
      }}
    >
      {customTitle ?? reward.title}
    </Typography>
  )

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5 }}>
      {showStatus && (
        <Box
          sx={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            height: size,
            width: size,
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: statusSize,
            opacity: notActive ? "1" : "0",
            transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: 1,
          }}
        >
          {loading && <CircularProgress color="inherit" size={Math.max(statusSize - 8, 20)} />}
          {!loading && !error && !reward.isEnabled && (
            <SvgIcon component={TiPower} fontSize="inherit" viewBox="1 3 20 20" />
          )}
          {!loading && !error && reward.isPaused && (
            <SvgIcon
              component={TiMediaPause}
              fontSize="inherit"
              viewBox="1 3 20 20"
              sx={{
                ml: disabledPaused ? -0.75 : 0,
              }}
            />
          )}
          {!loading && error && (
            <SvgIcon component={TiWarning} color="warning" fontSize="inherit" viewBox="0 2 24 24" />
          )}
        </Box>
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

      {showTitle && showTitleBottom && <Box sx={{ width: size * 1.75, mt: 0.25 }}>{rewardTitle}</Box>}
    </Box>
  )
}
