import { ConfirmDialog, ConfirmDialogProps } from "@/components"
import { ThemeColor } from "@/types"
import { FC } from "react"
import { TiWarning } from "react-icons/ti"

type Props = Omit<ConfirmDialogProps, "confirmText" | "type"> & {
  confirmText?: string
  type?: ThemeColor
}

export const DeleteDialog: FC<Props> = ({ confirmText, type, icon, ...props }) => {
  return (
    <ConfirmDialog icon={icon ?? TiWarning} confirmText={confirmText ?? "Delete"} type={type ?? "error"} {...props} />
  )
}
