import { ThemeColor } from "@/types"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SvgIcon } from "@mui/material"
import { ElementType, FC, ReactNode } from "react"

export interface ConfirmDialogProps {
  title: ReactNode
  open: boolean
  type: ThemeColor
  confirmText: ReactNode
  onClose: () => void
  onConfirm: () => Promise<void>
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  icon?: ElementType
  children?: ReactNode
  cancelText?: ReactNode
  id?: string
}

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  title,
  open,
  onClose,
  onConfirm,
  type = "primary",
  maxWidth = "xs",
  icon,
  children,
  confirmText,
  cancelText,
  id = "confirm",
}) => {
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
            {icon && <SvgIcon component={icon} color={type} viewBox="0 -2 24 24" />}
            <span>{title}</span>
          </>
        ) : (
          title
        )}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id={`dialog-description-${id}`}>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="outlined" onClick={onClose}>
          {cancelText ?? "Cancel"}
        </Button>

        <Button
          color={type}
          variant="contained"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
