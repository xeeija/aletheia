"use client"

import { SkeletonList } from "@/components"
import {
  ChannelRewards,
  ChannelRewardsToolbar,
  NoDataTwitch,
  NoDataTwitchError,
  RewardGroups,
  RewardGroupsToolbar,
} from "@/components/twitch"
import type { CustomRewardFragment, UserAccessTokenFragment, UserNameFragment } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Box, Tab, Tabs } from "@mui/material"
import { FC, useState } from "react"

interface Props {
  user?: UserNameFragment
  userAccessToken?: UserAccessTokenFragment
  channelRewards?: CustomRewardFragment[]
}

export const Channelpoints: FC<Props> = ({
  user: initialUser,
  channelRewards: initialRewards,
  userAccessToken: initialAccessToken,
}) => {
  const [tab, setTab] = useState(0)

  const [filterRewards, setFilterRewards] = useState(false)
  const { user, userAccessToken, fetchingUser, fetchingToken } = useAuth({
    includeToken: true,
    initialUser,
    initialAccessToken,
  })

  // Workaround for infinite loop with fetching /graphql user when useChannelRewards is commented in
  // const {
  //   channelRewards,
  //   fetching: fetchingRewards,
  //   error,
  // } = useChannelRewards({
  //   onlyManageble: filterRewards,
  //   initialRewards,
  // })
  const channelRewards = initialRewards
  const fetchingRewards = false
  const error = null

  const tokenAvailable = user && userAccessToken?.twitchUserId
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

        {user && (
          <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
            {/* itemType prop for new variant, because there is no variant prop */}
            <Tab label="Rewards" itemType="capitalize" />
            <Tab label="Reward Groups" itemType="capitalize" />
          </Tabs>
        )}

        {tokenAvailable && !error && (
          <>
            {tab === 0 && (
              <ChannelRewardsToolbar onFilter={(ev) => setFilterRewards(ev.target.value === "manageable")} />
            )}

            {tab === 1 && <RewardGroupsToolbar channelRewards={channelRewards} />}
          </>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tokenAvailable && !error && (
          <>
            {tab === 0 && <ChannelRewards channelRewards={channelRewards} filterRewards={filterRewards} />}

            {tab === 1 && <RewardGroups channelRewards={channelRewards} />}
          </>
        )}

        {fetching && !channelRewards && tokenAvailable && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 6 }}>
            <SkeletonList n={4} height={72} />
          </Box>
        )}

        {!tokenAvailable && !fetching && <NoDataTwitch user={user} accessToken={userAccessToken} />}

        {tokenAvailable && !fetchingRewards && error && <NoDataTwitchError error={error} />}
      </Box>
    </>
  )
}
