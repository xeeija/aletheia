import { LayoutNextPage, defaultLayout } from "@/components"
import { ChannelRewards, ChannelRewardsToolbar, RewardGroups, RewardGroupsToolbar } from "@/components/twitch"
import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"

export const ChannelPointsPage: LayoutNextPage = () => {
  const [tab, setTab] = useState(0)

  const [filterRewards, setFilterRewards] = useState(false)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <AlertPopup severity="warning" messageState={[showError, setShowError]} hideDuration={8000} /> */}

        <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
          {/* itemType prop for new variant, because there is no variant prop */}
          <Tab label="Rewards" itemType="capitalize" />
          <Tab label="Reward Groups" itemType="capitalize" />
        </Tabs>

        {tab === 0 && <ChannelRewardsToolbar onFilter={(ev) => setFilterRewards(ev.target.value === "manageable")} />}

        {tab === 1 && <RewardGroupsToolbar />}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && <ChannelRewards filterRewards={filterRewards} />}

        {tab === 1 && <RewardGroups />}
      </Box>
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points", fullWidth: false })

export default ChannelPointsPage
