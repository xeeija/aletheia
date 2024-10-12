"use client"

import { LoadingButton } from "@/components"
import { Awaitable, ThemeColor } from "@/types"
import {
  Button,
  ButtonOwnProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SvgIcon,
} from "@mui/material"
import { ElementType, FC, ReactNode, useState } from "react"

export interface ConfirmDialogProps {
  title: ReactNode
  open: boolean
  type: ThemeColor
  confirmText: ReactNode
  onClose: () => void
  onConfirm?: () => Awaitable<void> | Awaitable<boolean>
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  icon?: ElementType
  iconViewBox?: string
  children?: ReactNode
  cancelText?: ReactNode
  hideCancel?: boolean
  confirmVariant?: ButtonOwnProps["variant"]
  cancelVariant?: ButtonOwnProps["variant"]
  id?: string
  closeOnConfirm?: boolean
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  open,
  onClose,
  onConfirm,
  type = "primary",
  maxWidth = "xs",
  icon,
  iconViewBox,
  children,
  hideCancel,
  confirmText,
  cancelText,
  confirmVariant,
  cancelVariant,
  id = "confirm",
  closeOnConfirm = true,
}) => {
  const [deleting, setDeleting] = useState(false)
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      aria-labelledby={`dialog-title-${id}`}
      aria-describedby={`dialog-description-${id}`}
    >
      <DialogTitle
        id={`dialog-title-${id}`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {typeof title === "string" ? (
          <>
            {icon && <SvgIcon component={icon} color={type} viewBox={iconViewBox} />}
            <span>{title}</span>
          </>
        ) : (
          <>
            {icon && <SvgIcon component={icon} color={type} viewBox={iconViewBox} />}
            {title}
          </>
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`dialog-description-${id}`}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!hideCancel && (
          <Button color="secondary" variant={cancelVariant ?? "outlined"} onClick={onClose}>
            {cancelText ?? "Cancel"}
          </Button>
        )}

        <LoadingButton
          color={type}
          variant={confirmVariant ?? "contained"}
          loading={deleting}
          onClick={async () => {
            setDeleting(true)
            const confirmed = await onConfirm?.()

            setDeleting(false)

            if (closeOnConfirm && confirmed !== false) {
              onClose()
            }
          }}
        >
          {confirmText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
