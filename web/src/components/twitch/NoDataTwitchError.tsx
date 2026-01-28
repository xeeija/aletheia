"use client"

import { NoData } from "@/components"
import type { UserAccessTokenFragment } from "@/generated/graphql"
import { parseTwitchApiError } from "@/utils/twitch"
import { Typography } from "@mui/material"
import { useNow } from "next-intl"
import { FC } from "react"
import { CombinedError } from "urql"

const invalidTokenPattern = /user context for the user \d+ has been disabled/
const requestFailedPattern = /request to ([\w.:/?=&]+) failed/

interface Props {
  error: CombinedError
  accessToken?: UserAccessTokenFragment
}

export const NoDataTwitchError: FC<Props> = ({ error, accessToken }) => {
  const twitchError = parseTwitchApiError(error)

  const twitchErrorMessage = twitchError?.message.replace("The broadcaster", "You")

  const invalidToken = error.message.match(invalidTokenPattern)?.[0] !== null

  const date = useNow()
  const expiryTimestamp = Number(accessToken?.obtainmentTimestamp ?? 0) + (accessToken?.expiresIn ?? 0) * 1000
  const isTokenExpired = expiryTimestamp < date.getTime()
  const invalidTokenMessage = `Access token for user ${accessToken?.twitchUsername} became invalid${isTokenExpired ? " (expired)" : ""} and refreshing it failed.`

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
            {twitchErrorMessage}
          </Typography>

          <Typography color="textSecondary" sx={{ mt: -2 }}>
            Status {twitchError.status} {twitchError.error}
          </Typography>
        </>
      )}

      {invalidToken && !twitchError && (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
            Invalid access token.
          </Typography>

          <Typography color="text.secondary" sx={{ textAlign: "center" }}>
            {invalidTokenMessage}
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

      {!twitchError && !requestFailed?.host && !invalidToken && (
        <>
          <Typography variant="h5" color="text.secondary" sx={{ textAlign: "center" }}>
            {error.message}
          </Typography>
        </>
      )}
    </NoData>
  )
}
