import { ConfirmDialog, ConfirmDialogProps } from "@/components"
import { ThemeColor } from "@/types"
import { FC, ReactNode } from "react"
import { TiWarning } from "react-icons/ti"

type Props = Omit<ConfirmDialogProps, "confirmText" | "type"> & {
  confirmText?: ReactNode
  type?: ThemeColor
}

export const DeleteDialog: FC<Props> = ({ confirmText, type, icon, ...props }) => {
  return (
    <ConfirmDialog
      type={type ?? "error"}
      confirmText={confirmText ?? "Delete"}
      icon={icon ?? TiWarning}
      iconViewBox="1 0.5 22 22"
      {...props}
    />
  )
}
