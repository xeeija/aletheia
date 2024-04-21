import { NoData } from "@/components"
import { parseTwitchApiError } from "@/utils/twitch"
import { Typography } from "@mui/material"
import { FC, useMemo } from "react"
import { CombinedError } from "urql"

interface Props {
  error: CombinedError
}

export const NoDataTwitchError: FC<Props> = ({ error }) => {
  const twitchError = parseTwitchApiError(error)

  const errorMessage = twitchError?.message.replace("The broadcaster", "You")

  const requestFailedPattern = useMemo(() => /request to ([\w.:/?=&]+) failed/, [])

  const requestFailedMatch = error.message.match(requestFailedPattern)?.[1]
  const requestFailed = requestFailedMatch ? new URL(requestFailedMatch) : null
  const requestFailedMessage = `request to ${requestFailed?.protocol}${requestFailed?.host}${requestFailed?.pathname} failed`

  return (
    <NoData
      image={twitchError ? "/img/warning.svg" : "/img/server_down.svg"}
      iconSize={twitchError ? 200 : 240}
      sx={{ mt: 4 }}
    >
      {twitchError && (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
            {errorMessage}
          </Typography>

          <Typography color="textSecondary" sx={{ mt: -2 }}>
            Status {twitchError.status} {twitchError.error}
          </Typography>
        </>
      )}

      {requestFailed?.host && (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
            Failed to connect to server.
          </Typography>

          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            {requestFailedMessage}
          </Typography>
        </>
      )}

      {!twitchError && !requestFailed?.host && (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
            {error.message}
          </Typography>
        </>
      )}
    </NoData>
  )
}
