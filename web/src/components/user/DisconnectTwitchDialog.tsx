import { DeleteDialog } from "@/components"
import { FC } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void | Promise<void>
}

// TODO: Make a general confirm dialog
// for delete members, and disconnect twitch
export const DisconnectTwitchDialog: FC<Props> = ({ open, onClose, onDelete }) => {
  return (
    <DeleteDialog
      title="Disconnect from Twitch?"
      id="disconnect-twitch"
      confirmText="Disconnect"
      open={open}
      onClose={onClose}
      onConfirm={() => {
        onDelete()
        onClose()
      }}
    >
      Do you really want to disconnect from Twitch?
      <br />
      All your synchronizations for rewards will not work, until you reconnect your account.
    </DeleteDialog>
  )
}
