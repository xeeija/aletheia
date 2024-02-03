import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { Dispatch, FC, ReactNode, SetStateAction } from "react"

interface Props {
  open: [boolean, Dispatch<SetStateAction<boolean>>]
  description: ReactNode
  onClose?: () => void //(event: {}, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => void
  onRemove?: () => void
  hideClose?: boolean
  hideRemove?: boolean
}

// TODO: Add autoHide duration property

export const WinnerDialog: FC<Props> = ({
  open: openState,
  description,
  onClose = () => {},
  onRemove = () => {},
  hideClose,
  hideRemove,
}) => {
  const [open, setOpen] = openState

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={() => onClose()}
      aria-labelledby="winner-dialog-title"
      aria-describedby="winner-dialog-description"
    >
      <DialogTitle color="textSecondary" id="winner-dialog-title">
        Congratulations
      </DialogTitle>
      <DialogContent>
        <Typography variant="h2" id="winner-dialog-description">
          {description}
        </Typography>
      </DialogContent>
      <DialogActions>
        {!hideClose && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setOpen(false)
              onClose()
            }}
          >
            Close
          </Button>
        )}
        {!hideRemove && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setOpen(false)
              onClose()
              onRemove()
            }}
          >
            Remove
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
