"use client"
// use client in this component because of error:
// Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server"
// component={TiWarning}

import { ChannelRewardIconTitle } from "@/components/twitch"
import { Box, CircularProgress, SvgIcon, SxProps } from "@mui/material"
import { FC, ReactNode } from "react"
import { TiWarning } from "react-icons/ti"

interface Props {
  size: number
  statusSize: number
  fontSize?: number
  enabled?: boolean
  loading?: boolean
  stale?: boolean
  error?: ReactNode
  errorIcon?: ReactNode
  errorSx?: SxProps
  children?: ReactNode
}

// TODO: Error Message

export const ChannelRewardStatusOverlay: FC<Props> = ({
  size,
  statusSize,
  fontSize,
  enabled,
  loading,
  stale,
  error,
  errorIcon,
  errorSx,
  children,
}) => {
  const hasErrorMessage = error && typeof error !== "boolean"
  return (
    <Box
      sx={{
        position: "absolute",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        height: size,
        width: size,
        zIndex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: statusSize,
        opacity: stale ? "0.5" : enabled ? "1" : "0",
        transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: 1,
      }}
    >
      {loading && <CircularProgress color="inherit" size={Math.max(statusSize - 8, 20)} />}

      {!loading && error && (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {errorIcon ?? <SvgIcon component={TiWarning} color="warning" fontSize="inherit" viewBox="0 2 24 24" />}

          {hasErrorMessage && (
            <ChannelRewardIconTitle fontSize={fontSize} sx={{ mb: -1, ...errorSx }}>
              {error}
            </ChannelRewardIconTitle>
          )}
        </Box>
      )}

      {!loading && !error && children}
    </Box>
  )
}
