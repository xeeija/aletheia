import { CircularProgress, CircularProgressProps, IconButton, IconButtonProps, Tooltip } from "@mui/material"
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
    <Tooltip arrow placement="bottom" title={!disabled ? tooltip : ""} enterDelay={1000}>
      <span>
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
      </span>
    </Tooltip>
  )
}
