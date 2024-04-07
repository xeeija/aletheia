import { AlertPopup, BooleanFieldPlain } from "@/components"
import { RewardGroupFragment } from "@/generated/graphql"
import { useRewardGroups } from "@/hooks"
import { Box, Button, Card, CardContent, Chip, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { FC, ReactNode, useState } from "react"
import { HiPencil, HiTrash } from "react-icons/hi"
import { TiStopwatch, TiThList } from "react-icons/ti"

interface Props {
  rewardGroup: RewardGroupFragment
  readonly?: boolean
  onEdit?: (reward: RewardGroupFragment) => void
  onDelete?: (reward: RewardGroupFragment) => void
}

export const RewardGroupListItem: FC<Props> = ({ rewardGroup, readonly = false, onEdit, onDelete }) => {
  const [showError, setShowError] = useState<ReactNode>(null)

  const { updateGroup, fetchingUpdate } = useRewardGroups()

  const groupActive = rewardGroup.active
  const cooldownActive = !!rewardGroup.cooldownExpiry && rewardGroup.cooldownExpiry > new Date()
  const cooldownExpiry = rewardGroup.cooldownExpiry?.toLocaleString()

  return (
    <Card>
      <CardContent sx={{ mx: 1, mb: -1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
          {/* Left */}
          <Box sx={{ width: "max(30%, 260px)", display: "flex", gap: 2, alignItems: "center" }}>
            {/* <ChannelRewardIcon reward={rewardGroup} size="md" /> */}

            <Box>
              <Typography variant="h6">{rewardGroup.name}</Typography>
              {/* <Typography variant="body2" color="text.secondary">
                {rewardGroup.id}
              </Typography> */}
            </Box>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "max(12%, 180px)" }}>
            <Tooltip arrow placement="bottom" title={`${rewardGroup.items?.length ?? 0} rewards`}>
              <Chip
                size="small"
                variant="outlined"
                label={rewardGroup.items?.length ?? 0}
                sx={{ opacity: 0.8, fontWeight: 500 }}
                icon={<TiThList />}
              />
            </Tooltip>

            {cooldownActive && (
              <Tooltip arrow placement="bottom" title={`Cooldown until ${cooldownExpiry}`}>
                <SvgIcon color="info">
                  <TiStopwatch />
                </SvgIcon>
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
                  setShowError(response.error?.message || "An error occurred")
                }
              }}
            />

            <AlertPopup severity="warning" messageState={[showError, setShowError]} hideDuration={8000} />
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

                <Tooltip arrow placement="bottom" title="Delete">
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
