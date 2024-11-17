"use client"

import { DeleteDialog, NoData, SkeletonList } from "@/components"
import { RewardGroupDialog, RewardGroupListItem } from "@/components/twitch"
import { useAlert, useRewardGroups } from "@/hooks"
import { Box, Button, SvgIcon, Typography } from "@mui/material"
import { FC, useMemo, useState } from "react"
import { TiPlus } from "react-icons/ti"

interface Props {}

export const RewardGroups: FC<Props> = () => {
  const [createGroupOpen, setCreateGroupDialogOpen] = useState(false)

  const [editGroupOpen, setEditGroupOpen] = useState(false)
  const [editGroup, setEditGroup] = useState<string | null>(null)
  const [deleteGroupOpen, setDeleteGroupOpen] = useState<string | null>(null)

  const { showSuccess, showError } = useAlert()

  const { rewardGroups, fetching, deleteGroup } = useRewardGroups(useMemo(() => ({ groups: true, socket: true }), []))
  const rewardGroupsEmpty = (rewardGroups?.length ?? 0) === 0

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {(!rewardGroupsEmpty || fetching) && (
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
      )}

      {!fetching &&
        rewardGroups?.map((group) => (
          <RewardGroupListItem
            key={group.id}
            rewardGroup={group}
            onEdit={() => {
              setEditGroupOpen(true)
              setEditGroup(group.id)
            }}
            onDelete={(group) => {
              setDeleteGroupOpen(group.id)
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

      <RewardGroupDialog
        onClose={() => {
          setCreateGroupDialogOpen(false)
          setEditGroupOpen(false)
          setTimeout(() => {
            setEditGroup(null)
          }, 350)
        }}
        open={createGroupOpen || editGroupOpen}
        type={editGroup ? "edit" : "create"}
        rewardGroup={rewardGroups?.find((r) => r.id === editGroup)}
      />

      <DeleteDialog
        title="Delete Reward Group"
        open={deleteGroupOpen !== null}
        onClose={() => setDeleteGroupOpen(null)}
        onConfirm={async () => {
          if (deleteGroupOpen) {
            const group = rewardGroups?.find((r) => r.id === deleteGroupOpen)
            const response = await deleteGroup(deleteGroupOpen)

            if (response.deleted) {
              showSuccess(`'${group?.name}' deleted successfully`)
            } else {
              // if (!handleTwitchApiError(response.error, setShowError)) {
              showError(response.error?.message || "An error occurred")
              // }
            }
          }
        }}
      >
        Do you really want to delete this reward group? <br />
        This cannot be undone. It will be lost <b>forever</b>.
      </DeleteDialog>
    </Box>
  )
}
