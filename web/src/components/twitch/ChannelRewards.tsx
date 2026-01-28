"use client"

import { NoData, SkeletonList } from "@/components"
import { ChannelRewardDialog, ChannelRewardListItem, DeleteChannelRewardDialog } from "@/components/twitch"
import type { CustomRewardFragment } from "@/generated/graphql"
import { useChannelRewards } from "@/hooks"
import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { FC, useState } from "react"
import { TiPlus } from "react-icons/ti"

interface Props {
  channelRewards?: CustomRewardFragment[]
  filterRewards?: boolean
}

export const ChannelRewards: FC<Props> = ({ filterRewards, channelRewards: initialRewards }) => {
  const [createRewardOpen, setCreateRewardOpen] = useState(false)
  const [editRewardOpen, setEditRewardOpen] = useState(false)
  const [editReward, setEditReward] = useState<string | null>(null)
  const [deleteRewardId, setDeleteRewardId] = useState<string | null>(null)

  const { channelRewards, fetching } = useChannelRewards({
    onlyManageble: filterRewards,
    initialRewards,
  })

  const channelRewardsEmpty = (channelRewards?.length ?? 0) === 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {(fetching || !channelRewardsEmpty) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            color: "text.secondary",
            gap: 1,
            mx: 3,
          }}
        >
          <Typography sx={{ width: "max(40%, 260px)" }}>Title</Typography>
          <Typography sx={{ width: "80px" }}>Cost</Typography>
          <Typography sx={{ width: "max(10%, 140px)" }}>Status</Typography>
          <Typography sx={{ width: "130px" }}>Enabled / Paused</Typography>
          <Typography sx={{ width: "178px" }}></Typography>
          {/* <Typography sx={{ width: "0" }}></Typography> */}
        </Box>
      )}

      {fetching && !channelRewards && <SkeletonList n={4} height={72} />}

      {!channelRewardsEmpty &&
        channelRewards?.map((reward) => (
          <ChannelRewardListItem
            key={reward.id}
            reward={reward}
            onEdit={() => {
              setEditRewardOpen(true)
              setEditReward(reward.id)
            }}
            onDelete={(rewardId) => {
              setDeleteRewardId(rewardId)
              // console.warn("delete", rewardId)
            }}
          />
        ))}

      {channelRewardsEmpty && !fetching && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <NoData>{"You don't have any channel point rewards yet."}</NoData>

          <Box>
            <Button
              variant="contained"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateRewardOpen(true)}
            >
              New Reward
            </Button>
          </Box>
        </Box>
      )}

      <ChannelRewardDialog
        onClose={() => {
          setCreateRewardOpen(false)
          setEditRewardOpen(false)
          setTimeout(() => {
            setEditReward(null)
          }, 350)
        }}
        open={createRewardOpen || editRewardOpen}
        type={editReward ? "edit" : "create"}
        reward={channelRewards?.find((r) => r.id === editReward)}
      />

      <DeleteChannelRewardDialog
        open={deleteRewardId !== null}
        onClose={() => setDeleteRewardId(null)}
        reward={channelRewards?.find((r) => r.id === deleteRewardId)}
      />
    </Box>
  )
}
