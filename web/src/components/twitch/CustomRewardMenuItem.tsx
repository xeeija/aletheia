import { CustomRewardFragment } from "@/generated/graphql"
import { Avatar, Box, ListItemText, MenuItem, MenuItemProps } from "@mui/material"
import { FC } from "react"

type Props = MenuItemProps & {
  reward: CustomRewardFragment
  noMenuItem?: boolean
}

export const CustomRewardMenuItem: FC<Props> = ({ reward, noMenuItem, ...props }) => {
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
      <Avatar
        alt={`${reward.title} Reward`}
        src={reward.image || "/img/channelpoints-2.png"}
        variant="rounded"
        sizes="xs"
        sx={{
          backgroundColor: reward.backgroundColor,
          width: 28,
          height: 28,
        }}
      />
      <ListItemText primary={reward.title}>{reward.title}</ListItemText>
    </Box>
  )

  return noMenuItem ? label : <MenuItem {...props}>{label}</MenuItem>
}
