import { Tooltip } from "@/components"
import { CircularProgress, CircularProgressProps, IconButton, IconButtonProps } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = IconButtonProps & {
  loading?: boolean
  loadingIndicator?: ReactNode
  progressProps?: CircularProgressProps
  children?: ReactNode
  tooltip?: ReactNode
}

export const LoadingIconButton: FC<Props> = ({
  children,
  loading,
  loadingIndicator,
  tooltip,
  progressProps,
  ...props
}) => {
  const disabled = loading || props.disabled

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
    <Tooltip placement="bottom" title={tooltip}>
      <IconButton
        {...props}
        sx={{
          mx: loading ? 0.25 : 0,
          ...props.sx,
        }}
        disabled={disabled}
      >
        {loading ? loadingSpinner : children}
      </IconButton>
    </Tooltip>
  )
}
