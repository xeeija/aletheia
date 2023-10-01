import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormikProps } from "formik"
import { FC, useRef } from "react"
import { RedemptionSyncForm } from "./RedemptionSyncForm"

interface Props {
  open: boolean
  onClose: () => void
  slug: string
  readonly?: boolean
}

export const RedemptionSyncDialog: FC<Props> = ({ open, onClose, slug, readonly }) => {

  const actionsRef = useRef(null)
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
        // keepMounted
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={() => {
          closeHandler()
        }}
        aria-labelledby="redemption-sync-dialog-title"
        aria-describedby="redemption-sync-dialog-description">
        <DialogTitle id="redemption-sync-dialog-title">
          Synchronize Channel Rewards
        </DialogTitle>
        <DialogContent>
          <RedemptionSyncForm slug={slug} formRef={formRef} dialogActionsRef={actionsRef} />
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
