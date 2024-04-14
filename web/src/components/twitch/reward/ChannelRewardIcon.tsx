import { CustomRewardMenuItemFragment } from "@/generated/graphql"
import { Avatar, Box, CircularProgress, SvgIcon, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"
import { TiMediaPause } from "react-icons/ti"

interface Props {
  reward: CustomRewardMenuItemFragment
  size?: "sm" | "md" | "lg" | "xl"
  showTitle?: boolean
  showStatus?: boolean
  xlIcon?: boolean
  loading?: boolean
}

export const ChannelRewardIcon: FC<Props> = ({
  reward,
  size: sizeInput = "sm",
  showTitle,
  showStatus,
  xlIcon,
  loading,
}) => {
  const sizes = {
    sm: 28,
    md: 40,
    lg: 48,
    xl: 84,
  }

  const size = sizes[sizeInput]

  const notActive = reward.isPaused || reward.isEnabled || loading
  const statusSize = Math.max(24, size / 2) + 2

  return (
    <Box>
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
          }}
        >
          {loading && <CircularProgress color="inherit" size={Math.max(statusSize - 8, 20)} />}
          {!loading && <SvgIcon component={TiMediaPause} fontSize="inherit" viewBox="1.5 3 20 20" />}
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
          width={Math.min(size, xlIcon ? size : 48)}
          height={Math.min(size, xlIcon ? size : 48)}
          style={{ marginBottom: showTitle ? "-4px" : undefined }}
          unselectable="on"
          draggable="false"
        />
        {showTitle && (
          <Typography
            variant="body2"
            className="line-clamp line-clamp-2"
            sx={{
              fontWeight: 500,
              fontSize: 12,
              textAlign: "center",
              lineHeight: 1,
              mx: 0.25,
              color: (theme) => theme.palette.getContrastText(reward.backgroundColor || theme.palette.primary.main),
            }}
          >
            {reward.title}
          </Typography>
        )}
      </Avatar>
    </Box>
  )
}
