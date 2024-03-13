import { LayoutNextPage, NoData, defaultLayout } from "@/components"
import { ChannelRewardDialog, CustomRewardListItem } from "@/components/twitch"
import { useChannelRewards } from "@/hooks"
import { Box, Button, IconButton, SvgIcon, Tab, Tabs, Tooltip } from "@mui/material"
import { useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

export const ChannelPointsPage: LayoutNextPage = () => {
  const [tab, setTab] = useState(0)

  // Rewards
  const [createRewardOpen, setCreateRewardOpen] = useState(false)
  const [editRewardOpen, setEditRewardOpen] = useState(false)
  const [editReward, setEditReward] = useState<string | null>(null)

  const { channelRewards, fetching: fetchingRewards, deleteReward } = useChannelRewards()
  const channelRewardsEmpty = (channelRewards?.length ?? 0) === 0

  // TODO: Delete reward

  // Reward Groups
  const [, setCreateGroupDialogOpen] = useState(false)

  const rewardGroupsEmpty = true

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
          {/* itemType prop for new variant, because there is no variant prop */}
          <Tab label="Rewards" itemType="capitalize" />
          <Tab label="Reward Groups" itemType="capitalize" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Button
              variant="outlined"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateRewardOpen(true)}
            >
              New Reward
            </Button>

            <Tooltip placement="bottom-end" title="More options">
              <IconButton color="secondary" sx={{ ml: 1 }} disabled>
                <HiDotsVertical />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {tab === 1 && (
          <Box>
            {/* {!rewardGroupsEmpty && ( */}
            <Button
              variant="outlined"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              New Group
            </Button>
            {/* )} */}
            <Tooltip placement="bottom-end" title="More options">
              <IconButton color="secondary" sx={{ ml: 1 }} disabled>
                <HiDotsVertical />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {channelRewards?.map((reward) => (
              <CustomRewardListItem
                key={reward.id}
                reward={reward}
                onEdit={() => {
                  setEditRewardOpen(true)
                  setEditReward(reward.id)
                }}
                onDelete={(rewardId) => {
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
          </Box>
        )}

        {tab === 1 && (
          <Box>
            {rewardGroupsEmpty && !fetchingRewards && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                <NoData>{"You don't have any reward groups yet."}</NoData>

                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                    onClick={() => setCreateGroupDialogOpen(true)}
                  >
                    New Group
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points", fullWidth: false })

export default ChannelPointsPage
