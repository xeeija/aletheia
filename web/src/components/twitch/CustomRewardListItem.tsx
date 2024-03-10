import { BooleanFieldPlain } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { CustomRewardIcon } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, Button, Card, CardContent, IconButton, Typography } from "@mui/material"
import { FC } from "react"
import { HiPencil, HiTrash } from "react-icons/hi"

interface Props {
  reward: CustomRewardFragment
  readonly?: boolean
  onEdit?: (reward: CustomRewardFragment) => void
}

export const CustomRewardListItem: FC<Props> = ({ reward, readonly = false, onEdit }) => {
  return (
    <Card>
      {/* <Link href={`randomwheel/${wheel.slug}`} passHref legacyBehavior> */}
      {/* <CardActionArea sx={{ height: "100%" }}> */}
      <CardContent sx={{ mx: 1, mb: -1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
          {/* Left */}
          <Box sx={{ width: "40%", display: "flex", gap: 2, alignItems: "center" }}>
            <CustomRewardIcon reward={reward} size="md" />

            <Box>
              <Typography variant="h6">{reward.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {reward.title}
              </Typography>
            </Box>
          </Box>

          {/* Icons für isPaused, isInStock, skipQueue, cooldown expiry etc. */}

          {/* Middle */}
          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <ChannelPoints viewBox="0 -2 22 22" color="primary" />
            <Typography color="text.secondary">{reward.cost}</Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
            <BooleanFieldPlain name="isEnabled" toggle tooltip="Enabled" />
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
