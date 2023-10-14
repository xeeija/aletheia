import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle } from "@mui/material"
import { FormikProps } from "formik"
import { FC, ReactNode, RefObject } from "react"

type Props = DialogProps & {
  open: boolean
  onClose: (reason: "backdropClick" | "escapeKeyDown" | "cancelClick") => void
  id?: string
  title?: ReactNode
  formRef?: RefObject<FormikProps<any>>
  actionsRef?: RefObject<Element>
  closeOnBackdrop?: boolean
}

// onClose, id, form, title, children
export const FormDialog: FC<Props> = ({ id, open, title, onClose, closeOnBackdrop, formRef, actionsRef, children, ...props }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      {...props}
      open={open}
      onClose={(_, reason) => {
        if (!closeOnBackdrop && reason === "backdropClick") {
          return
        }

        onClose(reason)

        if (formRef) {
          setTimeout(() => formRef?.current?.resetForm(), 350)
        }
      }}
      aria-labelledby={`${id}-dialog-title`}
      aria-describedby={`${id}-dialog-description`}>
      <DialogTitle id={`${id}-dialog-title`}>{title}</DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions ref={actionsRef}>
        <Button color="secondary" variant="outlined"
          onClick={() => {
            onClose("cancelClick")

            if (formRef) {
              setTimeout(() => formRef?.current?.resetForm(), 350)
            }
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}