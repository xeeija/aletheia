import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon } from "@mui/material"
import { FC } from "react"
import { TiWarning } from "react-icons/ti"

interface Props {
  open: boolean
  onClose: () => void
  onDelete: () => void
}

// TODO: Make a general confirm dialog
// for delete members, and disconnect twitch
export const DisconnectTwitchDialog: FC<Props> = ({ open, onClose, onDelete }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      aria-labelledby="disconnect-dialog-title"
      aria-describedby="disconnect-dialog-description">
      <DialogTitle id="disconnect-dialog-title" sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}>
        <SvgIcon component={TiWarning} color="warning" />
        <span>Disconnect from Twitch?</span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="disconnect-dialog-description">
          Do you really want disconnect from Twitch?<br />
          All your synchronizations for rewards will be removed.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button color="error" variant="contained"
          onClick={() => {
            onDelete()
            onClose()
          }}>
          Disconnect
        </Button>
      </DialogActions>
    </Dialog>
  )
}
