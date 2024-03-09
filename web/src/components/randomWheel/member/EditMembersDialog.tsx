import { EditMembersForm } from "@/components/randomWheel"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormikProps } from "formik"
import { FC, useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  slug: string
  readonly?: boolean
}

export const EditMembersDialog: FC<Props> = ({ open, onClose, slug, readonly }) => {
  const actionsRef = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<FormikProps<any>>(null)

  const closeHandler = () => {
    onClose()
    setTimeout(() => {
      formRef.current?.resetForm()
    }, 350)
  }

  return (
    <>
      <Dialog
        keepMounted
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => {
          closeHandler()
        }}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
      >
        <DialogTitle id="edit-dialog-title">{readonly ? "Members" : "Edit Members"}</DialogTitle>
        <DialogContent>
          <EditMembersForm slug={slug} formRef={formRef} dialogActionsRef={actionsRef} readonly={readonly} />
        </DialogContent>
        <DialogActions ref={actionsRef}>
          <Button color="secondary" variant="outlined" onClick={closeHandler}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
