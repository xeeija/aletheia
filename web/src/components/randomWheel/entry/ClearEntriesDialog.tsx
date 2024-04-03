import { DeleteDialog } from "@/components"
import { FC } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onClear: () => void | Promise<void>
}

export const ClearEntriesDialog: FC<Props> = ({ open, onClose, onClear }) => {
  return (
    <DeleteDialog
      title="Clear all entries?"
      open={open}
      onClose={onClose}
      confirmText="Clear"
      // icon={}
      onConfirm={async () => {
        await onClear()
        onClose()
      }}
    >
      Do you really want to delete all entries? <br />
      This cannot be undone.
    </DeleteDialog>
  )
}
