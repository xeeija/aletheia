"use client"

import { AppErrorProps } from "@/types"
import { Box, Button, SvgIcon, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"
import { TiRefresh } from "react-icons/ti"

interface Props {
  global?: boolean
  showReset?: boolean
}

export const ErrorFallback: FC<AppErrorProps & Props> = ({ error, global, reset, showReset }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        py: 4,
        px: 2,
      }}
    >
      <Image
        src={global ? "/img/server_down.svg" : "/img/monitor.svg"}
        alt=""
        width={300}
        height={240}
        draggable="false"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h4" className="muted" sx={{ mt: 2, mb: 0 }}>
          {/* {500} {error.name} */}
          Error
        </Typography>

        <Typography variant="h1" sx={{ mb: 2 }}>
          Oops, something went wrong.
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "1.125em" }} className="muted">
          {"But dont worry, it's not on your end - it's us."}
        </Typography>

        <Typography variant="body1" className="muted">
          {error.name}: {error.message} <br />
          {error.cause ? `Cause: ${JSON.stringify(error.cause ?? null)}` : null}
        </Typography>

        {showReset && (
          <div>
            <Button
              variant="outlined"
              color="error"
              onClick={() => reset()}
              endIcon={<SvgIcon component={TiRefresh} viewBox="4 4 18 18" />}
              sx={{ mt: 2 }}
            >
              Try again
            </Button>
          </div>
        )}
      </Box>
    </Box>
  )
}
