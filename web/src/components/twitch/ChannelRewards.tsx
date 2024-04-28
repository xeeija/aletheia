import { DeleteDialog, NoData, SkeletonList } from "@/components"
import { ChannelRewardDialog, ChannelRewardListItem } from "@/components/twitch"
import { useAlert, useChannelRewards } from "@/hooks"
import { handleTwitchApiError } from "@/utils/twitch"
import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { FC, useState } from "react"
import { TiPlus } from "react-icons/ti"

interface Props {
  filterRewards?: boolean
}

export const ChannelRewards: FC<Props> = ({ filterRewards }) => {
  const [createRewardOpen, setCreateRewardOpen] = useState(false)
  const [editRewardOpen, setEditRewardOpen] = useState(false)
  const [editReward, setEditReward] = useState<string | null>(null)
  const [deleteRewardOpen, setDeleteRewardOpen] = useState<string | null>(null)

  const { showSuccess, showError } = useAlert()

  const { channelRewards, fetching: fetchingRewards, deleteReward } = useChannelRewards(true, filterRewards)
  const channelRewardsEmpty = (channelRewards?.length ?? 0) === 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {(!channelRewardsEmpty || fetchingRewards) && (
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

      {fetchingRewards && <SkeletonList n={4} height={72} />}

      {!fetchingRewards &&
        channelRewards?.map((reward) => (
          <ChannelRewardListItem
            key={reward.id}
            reward={reward}
            onEdit={() => {
              setEditRewardOpen(true)
              setEditReward(reward.id)
            }}
            onDelete={(rewardId) => {
              setDeleteRewardOpen(rewardId)
              // console.warn("delete", rewardId)
            }}
          />
        ))}

      {channelRewardsEmpty && !fetchingRewards && (
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

      <DeleteDialog
        title="Delete Reward"
        open={deleteRewardOpen !== null}
        onClose={() => setDeleteRewardOpen(null)}
        onConfirm={async () => {
          if (deleteRewardOpen) {
            const reward = channelRewards?.find((r) => r.id === deleteRewardOpen)
            const response = await deleteReward(deleteRewardOpen)

            if (response.deleted) {
              showSuccess(`'${reward?.title}' deleted successfully`)
            } else {
              if (!handleTwitchApiError(response.error, undefined, showError)) {
                showError(response.error?.message || "An error occurred")
              }
            }
          }
        }}
      >
        Do you really want to delete this reward? <br />
        This cannot be undone. It will be lost <b>forever</b>.
      </DeleteDialog>
    </Box>
  )
}
