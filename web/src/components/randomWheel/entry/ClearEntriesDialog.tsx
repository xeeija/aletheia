import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { FC } from "react"

interface Props {
  open: boolean
  onClose: () => void
  onClear: () => void
}

export const ClearEntriesDialog: FC<Props> = ({ open, onClose, onClear }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="clear-dialog-title"
      aria-describedby="clear-dialog-description"
    >
      <DialogTitle id="clear-dialog-title">Clear entries?</DialogTitle>
      <DialogContent>
        <DialogContentText id="clear-dialog-description">
          Do you really want to delete all entries?
          <br />
          This cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="outlined"
          onClick={() => {
            onClear()
            onClose()
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
