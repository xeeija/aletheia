import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon } from "@mui/material"
import { FC } from "react"
import { TiWarning } from "react-icons/ti"

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

export const DeleteWheelDialog: FC<Props> = ({ open, onClose, onDelete }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle
        id="delete-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <SvgIcon component={TiWarning} color="warning" />
        <span>Delete wheel?</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Do you really want to delete this wheel?
          <br />
          This cannot be undone. It will be lost <b>forever</b>.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          variant="contained"
          onClick={() => {
            onDelete()
            onClose()
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
