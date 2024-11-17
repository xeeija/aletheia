"use client"

import { Tooltip } from "@/components"
import { RewardGroupDialog } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, Button, IconButton, SvgIcon } from "@mui/material"
import { FC, useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

interface Props {
  channelRewards?: CustomRewardFragment[]
}

export const RewardGroupsToolbar: FC<Props> = ({ channelRewards }) => {
  const [createGroupOpen, setCreateGroupOpen] = useState(false)

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      {/* {!rewardGroupsEmpty && ( */}
      <Button
        variant="outlined"
        color="success"
        endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
        onClick={() => setCreateGroupOpen(true)}
      >
        New Group
      </Button>

      <RewardGroupDialog
        onClose={() => setCreateGroupOpen(false)}
        open={createGroupOpen}
        type="create"
        channelRewards={channelRewards}
      />

      {/* )} */}
      <Tooltip placement="bottom-end" title="More options">
        <IconButton color="secondary" disabled>
          <HiDotsVertical />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
