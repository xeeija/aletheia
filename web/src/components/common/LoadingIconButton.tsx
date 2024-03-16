import { CircularProgress, CircularProgressProps, IconButton, IconButtonProps } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = IconButtonProps & {
  loading?: boolean
  loadingIndicator?: ReactNode
  progressProps?: CircularProgressProps
  children?: ReactNode
}

export const LoadingIconButton: FC<Props> = ({ children, loading, loadingIndicator, progressProps, ...props }) => {
  const loadingSpinner = (
    <CircularProgress
      size={20}
      sx={{
        m: loading ? 0 : 1,
        my: 0,
        color: "text.disabled",
        ...(loadingIndicator === "" && { position: "absolute" }),
      }}
      {...progressProps}
    />
  )

  return (
    <IconButton
      {...props}
      sx={{
        mx: loading ? 0.25 : 0,
        ...props.sx,
      }}
      disabled={loading || props.disabled}
    >
      {loading ? loadingSpinner : children}
    </IconButton>
  )
}
