"use client"

import { DeleteDialog } from "@/components"
import type { CustomRewardFragment } from "@/generated/graphql"
import { useAlert, useChannelRewardsActions } from "@/hooks"
import { handleTwitchApiError } from "@/utils/twitch"
import { FC } from "react"

interface Props {
  open: boolean
  reward?: CustomRewardFragment
  onClose: () => void
}

export const DeleteChannelRewardDialog: FC<Props> = ({ open, reward, onClose }) => {
  // const [deleteRewardOpen, setDeleteRewardOpen] = useState<string | null>(null)
  const { showSuccess, showError } = useAlert()
  const { deleteReward } = useChannelRewardsActions()

  return (
    <DeleteDialog
      title="Delete Reward"
      open={open}
      onClose={onClose}
      onConfirm={async () => {
        if (reward?.id) {
          // const reward = channelRewards?.find((r) => r.id === deleteRewardOpen)
          const response = await deleteReward(reward.id)

          if (response.deleted) {
            showSuccess(`'${reward?.title}' deleted successfully`)
          } else {
            if (!handleTwitchApiError(response.error, undefined, showError)) {
              showError(response.error?.message || "An error occurred")
            }
          }
        }
      }}
    >
      Do you really want to delete this reward? <br />
      This cannot be undone. It will be lost <b>forever</b>.
    </DeleteDialog>
  )
}
