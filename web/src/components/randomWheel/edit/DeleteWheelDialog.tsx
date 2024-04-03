import { DeleteDialog } from "@/components"
import { FC } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void | Promise<void>
}

export const DeleteWheelDialog: FC<Props> = ({ open, onClose, onDelete }) => {
  return (
    <DeleteDialog
      title="Delete wheel?"
      open={open}
      onClose={onClose}
      onConfirm={async () => {
        await onDelete()
        onClose()
      }}
    >
      Do you really want to delete all entries? <br />
      This cannot be undone. It will be lost <b>forever</b>!
    </DeleteDialog>
  )
}
