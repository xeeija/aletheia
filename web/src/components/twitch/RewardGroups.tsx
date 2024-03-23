import { AlertPopup, NoData, SkeletonList } from "@/components"
import { RewardGroupListItem } from "@/components/twitch"
import { useRewardGroups } from "@/hooks"
import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import { TiPlus } from "react-icons/ti"

interface Props {}

export const RewardGroups: FC<Props> = () => {
  const [, setCreateGroupDialogOpen] = useState(false)

  const [showError, setShowError] = useState<ReactNode>(null)

  const { rewardGroups, fetching } = useRewardGroups({ fetchGroups: true })

  const rewardGroupsEmpty = (rewardGroups?.length ?? 0) === 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <AlertPopup severity="warning" messageState={[showError, setShowError]} hideDuration={8000} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "text.secondary",
          gap: 1,
          mx: 3,
        }}
      >
        <Typography sx={{ width: "max(30%, 260px)" }}>Name</Typography>
        <Typography sx={{ width: "max(12%, 180px)" }}>Status</Typography>
        <Typography sx={{ width: "58px" }}>Active</Typography>
        <Typography sx={{ width: "130px" }}></Typography>
        {/* <Typography sx={{ width: "0" }}></Typography> */}
      </Box>

      {!fetching &&
        rewardGroups?.map((group) => (
          <RewardGroupListItem
            key={group.id}
            rewardGroup={group}
            onEdit={() => {
              // setEditRewardOpen(true)
              // setEditReward(reward.id)
            }}
          />
        ))}

      {fetching && <SkeletonList n={4} height={72} />}

      {rewardGroupsEmpty && !fetching && (
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
  )
}
