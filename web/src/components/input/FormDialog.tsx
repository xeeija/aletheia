import { FC, ReactNode } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"

interface Props {
  open: boolean
  onClose: () => void
  id?: string
  form?: string
  title?: ReactNode
  // actionsRef?: RefObject<FormikProps<FormikValues>>
}

// onClose, id, form, title, children
export const FormDialog: FC<Props> = ({ open }) => {
  return (
    <Dialog
      keepMounted
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") {
          return
        }
        // closeHandler()
      }}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description">
      <DialogTitle id="edit-dialog-title">Edit Random Wheel</DialogTitle>
      <DialogContent>
        {/* <EditWheelForm slug={slug} dialogActionsRef={actionsRef} formRef={formRef} /> */}
      </DialogContent>
      <DialogActions
      //  ref={actionsRef}
      >
        <Button color="secondary" variant="outlined"
        // onClick={closeHandler}
        >
          Cancel
        </Button>

      </DialogActions>
    </Dialog>
  )
}