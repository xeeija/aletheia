import { CustomRewardFragment } from "@/generated/graphql"
import { Avatar } from "@mui/material"
import { FC } from "react"

interface Props {
  reward: CustomRewardFragment
  size?: "sm" | "md" | "lg" | "xl"
}

export const ChannelRewardIcon: FC<Props> = ({ reward, size = "sm" }) => {
  const sizes = {
    sm: 28,
    md: 40,
    lg: 48,
    xl: 72,
  }

  return (
    <Avatar
      alt={`${reward.title} Reward`}
      src={reward.image || "/img/channelpoints-2.png"}
      variant="rounded"
      sizes={size}
      sx={{
        backgroundColor: reward.backgroundColor || "primary.main",
        width: sizes[size],
        height: sizes[size],
      }}
    />
  )
}
