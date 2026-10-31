"use client"

import { SkeletonList } from "@/components/common"
import { WheelSyncForm } from "@/components/randomWheel"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import { FormikProps } from "formik"
import { FC, Suspense, useRef } from "react"

interface Props {
  open: boolean
  onClose: () => void
  slug: string
  readonly?: boolean
}

export const WheelSyncDialog: FC<Props> = ({ open, onClose, slug }) => {
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
        maxWidth="sm"
        open={open}
        onClose={() => {
          closeHandler()
        }}
        aria-labelledby="redemption-sync-dialog-title"
        aria-describedby="redemption-sync-dialog-description"
      >
        <DialogTitle id="redemption-sync-dialog-title">Synchronize Channel Rewards</DialogTitle>
        <DialogContent>
          <Suspense
            fallback={
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <SkeletonList n={4} height={40} />
              </Box>
            }
          >
            <WheelSyncForm slug={slug} formRef={formRef} dialogActionsRef={actionsRef} />
          </Suspense>
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
