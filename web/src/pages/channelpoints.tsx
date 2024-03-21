import { AlertPopup, FilterSelect, LayoutNextPage, NoData, defaultLayout } from "@/components"
import { ChannelRewardDialog, ChannelRewards } from "@/components/twitch"
import { Box, Button, IconButton, SvgIcon, Tab, Tabs, Tooltip } from "@mui/material"
import { ReactNode, useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

export const ChannelPointsPage: LayoutNextPage = () => {
  const [tab, setTab] = useState(0)

  const [showError, setShowError] = useState<ReactNode>(null)

  const [createRewardOpen, setCreateRewardOpen] = useState(false)
  const [filterRewards, setFilterRewards] = useState(false)

  // TODO: Delete reward

  // Reward Groups
  const [, setCreateGroupDialogOpen] = useState(false)

  const rewardGroupsEmpty = true
  const fetchingRewardGroups = true

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <AlertPopup severity="warning" messageState={[showError, setShowError]} hideDuration={8000} />

        <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
          {/* itemType prop for new variant, because there is no variant prop */}
          <Tab label="Rewards" itemType="capitalize" />
          <Tab label="Reward Groups" itemType="capitalize" />
        </Tabs>

        {tab === 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <FilterSelect
              options={[
                { value: "all", label: "All rewards" },
                { value: "manageable", label: "Manageable rewards" },
              ]}
              onChange={(ev) => {
                setFilterRewards(ev.target.value === "manageable")
              }}
            />

            <Button
              variant="outlined"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateRewardOpen(true)}
            >
              New Reward
            </Button>

            <ChannelRewardDialog onClose={() => setCreateRewardOpen(false)} open={createRewardOpen} type="create" />

            <Tooltip placement="bottom-end" title="More options">
              <IconButton color="secondary" disabled>
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
        {tab === 0 && <ChannelRewards filterRewards={filterRewards} />}

        {tab === 1 && (
          <Box>
            {rewardGroupsEmpty && !fetchingRewardGroups && (
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
