"use client"

import { FormDialog } from "@/components/input"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, Skeleton, SvgIcon, Typography } from "@mui/material"
import { FC, Suspense } from "react"
import { TiWarning } from "react-icons/ti"
import { RewardLinkOptions } from "./RewardLinkOptions"

interface Props {
  reward: CustomRewardFragment
  open: boolean
  onClose: () => void
}

export const RewardLinksDialog: FC<Props> = ({ reward, open, onClose }) => {
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

          {/* <Skeleton variant="rounded" sx={{ height: 40, width: "calc(100% - 64px - 28px)" }} /> */}
          <Suspense fallback={<Skeleton variant="rounded" sx={{ mb: 2, height: 40, width: "calc(100% - 92px)" }} />}>
            <RewardLinkOptions type="enable" reward={reward} pause={!open} />
          </Suspense>
        </div>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Pause reward</Typography>

          <Suspense fallback={<Skeleton variant="rounded" sx={{ mb: 2, height: 40, width: "calc(100% - 92px)" }} />}>
            <RewardLinkOptions type="pause" reward={reward} />
          </Suspense>
        </div>
      </Box>
    </FormDialog>
  )
}
