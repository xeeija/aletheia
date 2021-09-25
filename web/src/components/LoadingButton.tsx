import React from "react"
import { Button, ButtonProps, CircularProgress, useTheme } from "@mui/material"

type Props = ButtonProps & {
  loading?: boolean
  position?: "start" | "end"
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  loadingIndicator?: string | JSX.Element
  noProgress?: boolean
}

export const LoadingButton: React.FC<Props> = ({ children, loading, position, startIcon, endIcon, loadingIndicator, noProgress, ...props }) => {
  const theme = useTheme()

  const loadingSpinner = <CircularProgress size={theme.typography.fontSize + 2} sx={{ m: 1, mt: 0.875, color: theme.palette.grey[500] }} />

  return (
    <Button disabled={loading} {...props}>
      {loading && !noProgress && position === "start" ? loadingSpinner : startIcon}

      {loading && loadingIndicator !== undefined ? loadingIndicator : children}

      {loading && !noProgress && position === "end" ? loadingSpinner : endIcon}
    </Button>
  )
}