import { BooleanFieldPlain } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { CustomRewardIcon, RewardLinksDialog } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { useChannelRewards } from "@/hooks"
import { Box, Button, Card, CardContent, Chip, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiCollection, HiLink, HiOutlineCollection, HiPencil, HiTrash } from "react-icons/hi"
import { TiChartBar, TiMediaFastForward } from "react-icons/ti"

interface Props {
  reward: CustomRewardFragment
  readonly?: boolean
  onEdit?: (reward: CustomRewardFragment) => void
  onDelete?: (rewardId: string) => void
}

export const CustomRewardListItem: FC<Props> = ({ reward, readonly = false, onEdit, onDelete }) => {
  const [linkOpen, setLinkOpen] = useState(false)

  const { updateReward, fetchingUpdate } = useChannelRewards(false)

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
            <CustomRewardIcon reward={reward} size="md" />

            <Box>
              <Typography variant="h6">{reward.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {reward.prompt}
              </Typography>
            </Box>
          </Box>

          {/* Middle */}
          <Box sx={{ width: "80px", display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <ChannelPoints viewBox="0 -2 22 22" color="primary" />
            <Typography color="text.secondary">{reward.cost}</Typography>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "max(10%, 140px)" }}>
            <Tooltip
              arrow
              placement="bottom"
              title={`${redemptionsCount} redemption${redemptions === 1 ? "" : "s"} this stream`}
            >
              <Chip
                size="small"
                variant="outlined"
                label={redemptions ?? 0}
                sx={{ opacity: 0.8, fontWeight: 500 }}
                icon={<TiChartBar />}
              />
            </Tooltip>

            <Tooltip arrow placement="bottom" title={inStock ? "In stock" : "Not in stock"}>
              <SvgIcon color={inStock ? "info" : "disabled"}>
                {inStock ? <HiCollection /> : <HiOutlineCollection />}
                {/* <HiOutlineCollection /> */}
              </SvgIcon>
            </Tooltip>

            {reward.autoFulfill && (
              <Tooltip arrow placement="bottom" title="Skip reward queue">
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
                // console.warn("enabled", ev.target.checked)
                await updateReward(reward.id, {
                  ...reward,
                  isEnabled: ev.target.checked,
                })
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
                await updateReward(reward.id, {
                  ...reward,
                  isPaused: ev.target.checked,
                })
              }}
            />
          </Box>

          {/* right */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            {!readonly && (
              <>
                <Tooltip arrow placement="bottom" title="Generate links">
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

                <Tooltip arrow placement="bottom" title="Delete">
                  <IconButton color="error" onClick={() => onDelete?.(reward.id)}>
                    <HiTrash />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </Box>
      </CardContent>
      {/* </CardActionArea> */}
      {/* </Link> */}
    </Card>
  )
}
