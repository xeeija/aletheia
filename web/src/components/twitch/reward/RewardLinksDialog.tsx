"use client"

import { FormDialog } from "@/components/input"
import { CustomRewardFragment } from "@/generated/graphql"
import { useRewardLinks } from "@/hooks"
import { Box, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import { TiWarning } from "react-icons/ti"
import { RewardLinkOptions } from "./RewardLinkOptions"

interface Props {
  reward: CustomRewardFragment
  open: boolean
  onClose: () => void
}

export const RewardLinksDialog: FC<Props> = ({ reward, open, onClose }) => {
  const { rewardLinks } = useRewardLinks({
    rewardIds: reward.id,
    pause: !open,
    type: "enable",
  })

  const enableLink = rewardLinks?.find((l) => l.type === "enable")
  const pauseLink = rewardLinks?.find((l) => l.type === "pause")

  return (
    <FormDialog
      maxWidth="sm"
      title={`Reward links for ${reward.title}`}
      open={open}
      cancelText="Close"
      onClose={onClose}
      closeOnBackdrop
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
          <SvgIcon color="warning">
            <TiWarning />
          </SvgIcon>
          <Typography sx={{ color: "warning.main" }}>
            <b>Do not share these links publicly! </b>
            Everyone with the link can update the respective channel reward <u>without authentication</u>.
          </Typography>
        </Box>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Enable/Disable reward</Typography>

          <RewardLinkOptions link={enableLink} type="enable" reward={reward} pause={!open} />
        </div>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Pause reward</Typography>

          <RewardLinkOptions link={pauseLink} type="pause" reward={reward} />
        </div>
      </Box>
    </FormDialog>
  )
}
