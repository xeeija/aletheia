import { FC, useRef } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { EditWheelForm } from "./EditWheelForm"
import { FormikProps, FormikValues } from "formik"
import { CreateWheelForm } from "./CreateWheelForm"

interface Props {
  open: boolean
  onClose: () => void
  slug?: string
  type: "create" | "edit"
}

export const CreateEditWheelDialog: FC<Props> = ({ open, onClose, slug, type }) => {

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

  if (type === "edit" && !slug) {
    console.error("Wheel dialog: slug is required when type is 'edit'")
    return null
  }

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
        <DialogTitle id="edit-dialog-title">
          {type === "create" && "Create Random Wheel"}
          {type === "edit" && "Edit Random Wheel"}
        </DialogTitle>
        <DialogContent>
          {type === "edit" && slug &&
            <EditWheelForm slug={slug} dialogActionsRef={actionsRef} formRef={formRef} />
          }
          {type === "create" &&
            <CreateWheelForm dialogActionsRef={actionsRef} formRef={formRef} />
          }
        </DialogContent>
        <DialogActions ref={actionsRef}>
          <Button color="secondary" variant="outlined" onClick={closeHandler}>
            {type === "create" && "Cancel"}
            {type === "edit" && "Close"}
          </Button>

        </DialogActions>
      </Dialog>

      {/* <FormDialog open={open} onClose={onClose} id="editWheel2" form="editRandomWheelForm" title="Edit Random Wheel 2">
        <EditWheelForm slug={slug} formRef={formRef} />
      </FormDialog> */}
    </>
  )
}
