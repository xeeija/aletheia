import { FC, useRef } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { EditWheelForm } from "./EditWheelForm"
import { FormikProps, FormikValues } from "formik"

interface Props {
  open: boolean
  onClose: () => void
  slug: string
}

export const EditWheelDialog: FC<Props> = ({ open, onClose, slug }) => {

  const actionsRef = useRef(null)
  const formRef = useRef<FormikProps<FormikValues>>(null)

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      formRef.current?.resetForm()
    }, 350)
  }

  // TODO: Dialog Provider
  // for dialogActionsRef, 

  return (
    <>
      <Dialog
        keepMounted
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={(_, reason) => {
          if (reason === "backdropClick") {
            return
          }
          closeHandler()
        }}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description">
        <DialogTitle id="edit-dialog-title">Edit Random Wheel</DialogTitle>
        <DialogContent>
          <EditWheelForm slug={slug} dialogActionsRef={actionsRef} formRef={formRef} />
        </DialogContent>
        <DialogActions ref={actionsRef}>
          <Button color="secondary" variant="outlined" onClick={closeHandler}>
            Close
          </Button>

        </DialogActions>
      </Dialog>

      {/* <FormDialog open={open} onClose={onClose} id="editWheel2" form="editRandomWheelForm" title="Edit Random Wheel 2">
        <EditWheelForm slug={slug} formRef={formRef} />
      </FormDialog> */}
    </>
  )
}
