import { TwitchError } from "@/types"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { CombinedError } from "urql"

// type for twtich auth params
export type AuthCodeParams = {
  response_type: "code"
  client_id: string
  scope: string
  // boolean, but must be string for SearchParams
  force_verify?: "true" | "false"
  state?: string
  // redirect_uri: string
}

export const scopes = ["channel:read:redemptions", "channel:manage:redemptions"]

export const parseTwitchApiError = (error: CombinedError | undefined) => {
  if (error?.message.includes("Encountered HTTP status code")) {
    const errorStr = error?.message.split("Body:")[1].trim()
    const twitchError = JSON.parse(errorStr) as TwitchError
    return twitchError
  }

  return null
}

export const handleTwitchApiError = (
  error: CombinedError | undefined,
  setState?: Dispatch<SetStateAction<ReactNode>>,
  handleError?: (message: ReactNode) => void
) => {
  if (!error) {
    return true
  }

  const twitchError = parseTwitchApiError(error)

  if (twitchError?.message) {
    const errorMessage = `[Twitch] ${twitchError.status} ${twitchError.error}: ${twitchError.message}`

    setState?.(errorMessage)
    handleError?.(errorMessage)
    return true
  }

  return false
}
