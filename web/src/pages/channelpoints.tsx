import { LayoutNextPage, SkeletonList, defaultLayout } from "@/components"
import {
  ChannelRewards,
  ChannelRewardsToolbar,
  NoDataTwitch,
  NoDataTwitchError,
  RewardGroups,
  RewardGroupsToolbar,
} from "@/components/twitch"
import { useAuth, useChannelRewards } from "@/hooks"
import { Box, Tab, Tabs } from "@mui/material"
import { useState } from "react"

export const ChannelPointsPage: LayoutNextPage = () => {
  const [tab, setTab] = useState(0)

  const [filterRewards, setFilterRewards] = useState(false)
  const { user, userAccessToken, fetchingUser, fetchingToken } = useAuth({ includeToken: true })
  const { fetching: fetchingRewards, error } = useChannelRewards(true, filterRewards)

  const tokenAvailable = user?.username && userAccessToken?.twitchUserId
  const fetching = fetchingUser || fetchingToken

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

        {tokenAvailable && !error && (
          <>
            {tab === 0 && (
              <ChannelRewardsToolbar onFilter={(ev) => setFilterRewards(ev.target.value === "manageable")} />
            )}

            {tab === 1 && <RewardGroupsToolbar />}
          </>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tokenAvailable && !error && (
          <>
            {tab === 0 && <ChannelRewards filterRewards={filterRewards} />}

            {tab === 1 && <RewardGroups />}
          </>
        )}

        {fetching && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 6 }}>
            <SkeletonList n={4} height={72} />
          </Box>
        )}

        {!tokenAvailable && !fetching && <NoDataTwitch />}

        {tokenAvailable && !fetchingRewards && error && <NoDataTwitchError error={error} />}
      </Box>
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points", fullWidth: false })

export default ChannelPointsPage
