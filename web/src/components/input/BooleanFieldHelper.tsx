import { FormHelperText } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  hasError?: boolean
  toggle?: boolean
  labelPlacement?: "end" | "start" | "top" | "bottom"
  size?: "small" | "medium"
  margin: number
  disabled?: boolean
  required?: boolean
  children?: ReactNode
}

export const BooleanFieldHelper: FC<Props> = ({
  hasError,
  toggle,
  labelPlacement,
  size,
  margin,
  disabled,
  required,
  children,
}) => {
  const helperMarginLeftToggle =
    (labelPlacement === "end" || labelPlacement === undefined) && toggle ? (size === "small" ? 2.5 : 4.5) : 0
  const helperMarginLeftCheckbox =
    (labelPlacement === "end" || labelPlacement === undefined) && !toggle ? (size === "small" ? 1.75 : 2) : 0

  return (
    <FormHelperText
      disabled={disabled}
      required={required}
      error={hasError}
      sx={{ mt: -0.75, ml: (margin ?? 1.75) + helperMarginLeftToggle + helperMarginLeftCheckbox }}
    >
      {children}
    </FormHelperText>
  )
}
