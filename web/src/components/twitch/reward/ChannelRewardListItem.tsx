"use client"

import { BooleanFieldPlain, Tooltip } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { ChannelRewardIcon, RewardLinksDialog } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { useAlert, useChannelRewardsActions } from "@/hooks"
import { handleTwitchApiError } from "@/utils/twitch"
import { Box, Button, Card, CardContent, Chip, IconButton, SvgIcon, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiCollection, HiLink, HiOutlineCollection, HiPencil, HiTrash } from "react-icons/hi"
import { TiChartBar, TiMediaFastForward } from "react-icons/ti"

interface Props {
  reward: CustomRewardFragment
  readonly?: boolean
  onEdit?: (reward: CustomRewardFragment) => void
  onDelete?: (rewardId: string) => void
}

export const ChannelRewardListItem: FC<Props> = ({ reward, readonly = false, onEdit, onDelete }) => {
  const [linkOpen, setLinkOpen] = useState(false)

  const { showError } = useAlert()

  const { updateReward, fetchingUpdate } = useChannelRewardsActions()

  const inStock = reward.isInStock
  const redemptions = reward.redemptionsThisStream
  const maxRedemptions = reward.maxRedemptionsPerStream

  const redemptionsCount = `${redemptions ?? 0}${maxRedemptions ? `/${maxRedemptions}` : ""}`

  return (
    <Card>
      {/* <Link href={`randomwheel/${wheel.slug}`} passHref legacyBehavior> */}
      {/* <CardActionArea sx={{ height: "100%" }}> */}
      <CardContent sx={{ mx: 1, mb: -1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
          {/* Left */}
          <Box sx={{ width: "max(40%, 260px)", display: "flex", gap: 2, alignItems: "center" }}>
            <ChannelRewardIcon reward={reward} size="md" />

            <Box>
              <Typography variant="h6" sx={{ lineHeight: 1.4, mt: reward.prompt ? "-2.8px" : undefined }}>
                {reward.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                className="line-clamp line-clamp-1"
                sx={{ lineHeight: 1.4, mb: reward.prompt ? "-2px" : undefined }}
              >
                {reward.prompt}
              </Typography>
            </Box>
          </Box>

          {/* Middle */}
          <Box sx={{ width: "80px", display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <ChannelPoints viewBox="0 -2 22 22" color="primary" />
            <Typography color="text.secondary" sx={{ fontWeight: 500, fontSize: "0.925em" }}>
              {reward.cost}
            </Typography>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "max(10%, 140px)" }}>
            <Tooltip
              placement="bottom"
              title={`${redemptionsCount} redemption${redemptions === 1 ? "" : "s"} this stream`}
              enterDelay={0}
            >
              <Chip
                size="small"
                variant="outlined"
                label={redemptions ?? 0}
                sx={{ opacity: 0.8, fontWeight: 500 }}
                icon={<TiChartBar />}
              />
            </Tooltip>

            <Tooltip placement="bottom" title={inStock ? "In stock" : "Out of stock"} enterDelay={0}>
              <SvgIcon color={inStock ? "info" : "disabled"}>
                {inStock ? <HiCollection /> : <HiOutlineCollection />}
              </SvgIcon>
            </Tooltip>

            {reward.autoFulfill && (
              <Tooltip placement="bottom" title="Skip reward queue" enterDelay={0}>
                <SvgIcon color="info">
                  <TiMediaFastForward />
                </SvgIcon>
              </Tooltip>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
            <BooleanFieldPlain
              name="isEnabled"
              toggle
              checked={reward.isEnabled}
              tooltip={reward.isEnabled ? "Enabled" : "Disabled"}
              disabled={readonly || fetchingUpdate}
              onChange={async (ev) => {
                const response = await updateReward(reward.id, {
                  ...reward,
                  isEnabled: ev.target.checked,
                })

                if (response.reward) {
                  // showAlert(`'${response.reward.title}' ${response.reward.isEnabled ? "enabled" : "disabled"}`)
                } else {
                  if (!handleTwitchApiError(response.error, undefined, showError)) {
                    showError(response.error?.message || "An error occurred")
                  }
                }
              }}
            />

            <BooleanFieldPlain
              name="isPaused"
              toggle
              checked={reward.isPaused}
              tooltip={reward.isPaused ? "Paused" : "Not paused"}
              disabled={readonly || fetchingUpdate}
              onChange={async (ev) => {
                // console.warn("paused", ev.target.checked)
                const response = await updateReward(reward.id, {
                  ...reward,
                  isPaused: ev.target.checked,
                })

                if (response.reward) {
                  // showAlert(`'${response.reward.title}' ${response.reward.isPaused ? "paused" : "unpaused"}`)
                } else {
                  if (!handleTwitchApiError(response.error, undefined, showError)) {
                    showError(response.error?.message || "An error occurred")
                  }
                }
              }}
            />
          </Box>

          {/* right */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {!readonly && (
              <>
                <Tooltip placement="bottom" title="Manage Reward links">
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      // setLinkAnchor(ev.currentTarget)
                      setLinkOpen(true)
                    }}
                  >
                    <HiLink />
                    {/* <HiAdjustments /> */}
                  </IconButton>
                </Tooltip>

                <RewardLinksDialog
                  reward={reward}
                  // anchor={linkAnchor}
                  // setAnchor={setLinkAnchor}
                  open={linkOpen}
                  onClose={() => setLinkOpen(false)}
                />

                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<HiPencil />}
                  sx={{ boxShadow: "none" }}
                  onClick={() => onEdit?.(reward)}
                >
                  Edit
                </Button>

                <Tooltip placement="bottom" title="Delete">
                  <IconButton color="error" onClick={() => onDelete?.(reward.id)}>
                    <HiTrash />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {readonly && (
              <IconButton color="info" onClick={() => onEdit?.(reward)}>
                <HiPencil />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
      {/* </Link> */}
    </Card>
  )
}
