"use client"

import { BooleanFieldPlain, CooldownTimer, Tooltip } from "@/components"
import { RewardGroupFragment } from "@/generated/graphql"
import { useAlert, useRewardGroupsActions } from "@/hooks"
import { Box, Button, Card, CardContent, Chip, IconButton, Typography } from "@mui/material"
import { FC } from "react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { TiThList } from "react-icons/ti"

interface Props {
  rewardGroup: RewardGroupFragment
  readonly?: boolean
  onEdit?: (reward: RewardGroupFragment) => void
  onDelete?: (reward: RewardGroupFragment) => void
}

export const RewardGroupListItem: FC<Props> = ({ rewardGroup, readonly = false, onEdit, onDelete }) => {
  const { updateGroup, fetchingUpdate } = useRewardGroupsActions()

  const { showError } = useAlert()

  return (
    <Card>
      <CardContent sx={{ mx: 1, mb: -1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
          {/* Left */}
          <Box sx={{ width: "max(30%, 260px)", display: "flex", gap: 2, alignItems: "center" }}>
            <Typography variant="h6">{rewardGroup.name}</Typography>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "max(12%, 180px)" }}>
            <Tooltip placement="bottom" title={`${rewardGroup.items?.length ?? 0} rewards`} enterDelay={0}>
              <Chip
                size="small"
                variant="outlined"
                label={rewardGroup.items?.length ?? 0}
                sx={{ opacity: 0.8, fontWeight: 500 }}
                icon={<TiThList />}
              />
            </Tooltip>

            <CooldownTimer expiry={rewardGroup.cooldownExpiry} />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
            <BooleanFieldPlain
              name="isEnabled"
              toggle
              checked={rewardGroup.active}
              tooltip={rewardGroup.active ? "Active" : "Not active"}
              disabled={readonly || fetchingUpdate}
              onChange={async (ev) => {
                const response = await updateGroup(rewardGroup.id, {
                  active: ev.target.checked,
                })
                if (response.rewardGroup) {
                  // setShowSuccess(`'${response.reward}' created successfully`)
                } else {
                  showError(response.error?.message || "An error occurred")
                }
              }}
            />
          </Box>

          {/* right */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {!readonly && (
              <>
                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<HiPencil />}
                  sx={{ boxShadow: "none" }}
                  onClick={() => onEdit?.(rewardGroup)}
                >
                  Edit
                </Button>

                <Tooltip placement="bottom" title="Delete">
                  <IconButton color="error" onClick={() => onDelete?.(rewardGroup)}>
                    <HiTrash />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {readonly && (
              <IconButton color="info" onClick={() => onEdit?.(rewardGroup)}>
                <HiPencil />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
