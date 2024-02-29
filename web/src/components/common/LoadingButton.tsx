import { Box, Button, ButtonProps, CircularProgress, CircularProgressProps, useTheme } from "@mui/material"
import { FC } from "react"

type Props = ButtonProps & {
  loading?: boolean
  position?: "start" | "end"
  startIcon?: JSX.Element
  endIcon?: JSX.Element
  loadingIndicator?: string | JSX.Element
  noProgress?: boolean
  progressProps?: CircularProgressProps
  fade?: boolean // if true, overlaps children, otherwise hides children
}

export const LoadingButton: FC<Props> = ({
  children,
  loading,
  position = "end",
  startIcon,
  endIcon,
  loadingIndicator,
  noProgress,
  fade,
  progressProps,
  ...props
}) => {
  const theme = useTheme()

  const loadingSpinner = (
    <CircularProgress
      size={theme.typography.fontSize + 2}
      sx={{
        m: 1,
        my: 0.5,
        color: theme.palette.grey[500],
        ...(loadingIndicator === "" && { position: "absolute" }),
      }}
      {...progressProps}
    />
  )

  const childrenWrapper =
    loading && loadingIndicator === "" ? <Box sx={{ opacity: fade ? 0.3 : 0 }}>{children}</Box> : children

  return (
    <Button {...props} disabled={loading || props.disabled}>
      {loading && !noProgress && position === "start" ? loadingSpinner : startIcon}

      {loading && loadingIndicator ? loadingIndicator : childrenWrapper}

      {loading && !noProgress && position === "end" ? loadingSpinner : endIcon}
    </Button>
  )
}
