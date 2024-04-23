import { DeleteDialog } from "@/components"
import { FC } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void | Promise<void>
}

export const DisconnectTwitchDialog: FC<Props> = ({ open, onClose, onDelete }) => {
  return (
    <DeleteDialog
      title="Disconnect from Twitch?"
      id="disconnect-twitch"
      confirmText="Disconnect"
      open={open}
      onClose={onClose}
      onConfirm={async () => {
        await onDelete()
        onClose()
      }}
    >
      Do you really want to disconnect from Twitch?
      <br />
      All your synchronizations for rewards will not work, until you reconnect your account.
    </DeleteDialog>
  )
}
