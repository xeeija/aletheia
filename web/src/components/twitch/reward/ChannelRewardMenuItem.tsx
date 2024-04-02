import { ChannelRewardIcon } from "@/components/twitch"
import { CustomRewardMenuItemFragment } from "@/generated/graphql"
import { Box, ListItemText, MenuItem, MenuItemProps } from "@mui/material"
import { FC } from "react"

type Props = MenuItemProps & {
  reward: CustomRewardMenuItemFragment
  noMenuItem?: boolean
}

export const ChannelRewardMenuItem: FC<Props> = ({ reward, noMenuItem, ...props }) => {
  // const colorList = typeof colors === "string" ? [colors] : colors
  const label = (
    <Box
      sx={{
        width: "100%",
        // height: 36,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
      }}
    >
      <ChannelRewardIcon reward={reward} />
      <ListItemText primary={reward.title}>{reward.title}</ListItemText>
    </Box>
  )

  return noMenuItem ? label : <MenuItem {...props}>{label}</MenuItem>
}
