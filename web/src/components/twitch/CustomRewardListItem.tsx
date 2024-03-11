import { BooleanFieldPlain } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { CustomRewardIcon } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, Button, Card, CardContent, Chip, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { FC } from "react"
import { HiCollection, HiOutlineCollection, HiPencil, HiTrash } from "react-icons/hi"
import { TiChartBar, TiMediaFastForward } from "react-icons/ti"

interface Props {
  reward: CustomRewardFragment
  readonly?: boolean
  onEdit?: (reward: CustomRewardFragment) => void
}

export const CustomRewardListItem: FC<Props> = ({ reward, readonly = false, onEdit }) => {
  const inStock = reward.isInStock
  const redemptions = reward.redemptionsThisStream
  const maxRedemptions = reward.maxRedemptionsPerStream

  return (
    <Card>
      {/* <Link href={`randomwheel/${wheel.slug}`} passHref legacyBehavior> */}
      {/* <CardActionArea sx={{ height: "100%" }}> */}
      <CardContent sx={{ mx: 1, mb: -1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
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
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <ChannelPoints viewBox="0 -2 22 22" color="primary" />
            <Typography color="text.secondary">{reward.cost}</Typography>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1, width: "max(10%, 140px)" }}>
            <Tooltip
              arrow
              placement="bottom"
              title={`${redemptions ?? 0}/${maxRedemptions ?? 1} redemption${redemptions === 1 ? "s" : ""} this stream`}
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

            <Tooltip arrow placement="bottom" title="Skip reward queue">
              <SvgIcon color="info">
                <TiMediaFastForward />
              </SvgIcon>
            </Tooltip>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 2 }}>
            <BooleanFieldPlain
              name="isPaused"
              toggle
              tooltip={reward.isPaused ? "Paused" : "Not paused"}
              disabled={readonly}
            />

            <BooleanFieldPlain
              name="isEnabled"
              toggle
              tooltip={reward.isEnabled ? "Enabled" : "Disabled"}
              // checked={reward.isEnabled}
              disabled={readonly}
            />
          </Box>

          {/* right */}
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            {!readonly && (
              <>
                <Button
                  variant="contained"
                  color="inherit"
                  endIcon={<HiPencil />}
                  sx={{ boxShadow: "none" }}
                  onClick={() => onEdit?.(reward)}
                >
                  Edit
                </Button>

                <IconButton color="error">
                  <HiTrash />
                </IconButton>
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
