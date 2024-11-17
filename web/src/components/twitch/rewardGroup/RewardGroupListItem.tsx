"use client"

import { BooleanFieldPlain, Tooltip } from "@/components"
import { RewardGroupFragment } from "@/generated/graphql"
import { useAlert, useInterval, useRewardGroups } from "@/hooks"
import { Box, Button, Card, CardContent, Chip, IconButton, SvgIcon, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { TiStopwatch, TiThList } from "react-icons/ti"

interface Props {
  rewardGroup: RewardGroupFragment
  readonly?: boolean
  onEdit?: (reward: RewardGroupFragment) => void
  onDelete?: (reward: RewardGroupFragment) => void
}

export const RewardGroupListItem: FC<Props> = ({ rewardGroup, readonly = false, onEdit, onDelete }) => {
  const { updateGroup, fetchingUpdate } = useRewardGroups({ socket: false })

  const { showError } = useAlert()

  const groupActive = rewardGroup.active
  const cooldownActive = !!rewardGroup.cooldownExpiry && rewardGroup.cooldownExpiry > new Date()
  const cooldownExpiry = rewardGroup.cooldownExpiry?.toLocaleString(undefined, {
    dateStyle: rewardGroup.cooldownExpiry > new Date(Date.now() + 24 * 3600 * 100) ? "medium" : undefined,
    timeStyle: "medium",
  })

  const [cooldownLeft, setCooldownLeft] = useState<string>()
  const cooldownMax = new Date((rewardGroup.cooldownExpiry?.getTime() || 0) - Date.now() + 1000)
  const cooldownDaysNum = Math.floor(cooldownMax.getTime() / (24 * 3600 * 1000))
  const cooldownDays = cooldownDaysNum > 0 && cooldownLeft ? `${cooldownDaysNum}d ` : ""

  useInterval(
    () =>
      setCooldownLeft(
        cooldownMax.toLocaleTimeString(undefined, {
          timeZone: "utc",
          second: "2-digit",
          minute: "2-digit",
          hour: cooldownMax.getUTCHours() > 0 ? "2-digit" : undefined,
        })
      ),
    {
      ms: 1000,
      duration: cooldownMax.getTime(),
    }
  )

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

            {cooldownActive && (
              <Tooltip placement="bottom" enterDelay={0} title={`Cooldown until ${cooldownExpiry}`}>
                <Box sx={{ display: "flex", flexDirection: "row", gap: 0.5 }}>
                  <SvgIcon color="info">
                    <TiStopwatch />
                  </SvgIcon>
                  <Typography color="text.secondary">
                    {cooldownDays}
                    {cooldownLeft}
                  </Typography>
                </Box>
              </Tooltip>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
            <BooleanFieldPlain
              name="isEnabled"
              toggle
              checked={groupActive}
              tooltip={groupActive ? "Active" : "Not active"}
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
