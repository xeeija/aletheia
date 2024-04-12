import type { ApiHandler } from "@/types"
import { AuthCodeParams, scopes } from "@/utils/twitch"

const handler: ApiHandler = async (_, res) => {
  if (!process.env.TWITCH_REDIRECT_URI) {
    res.status(500).send({ message: "redirect_uri is not set" })
    return
  }

  // const state = randomBase64Url(32)
  const stateResponse = await fetch(`${process.env.SERVER_URL ?? "http://localhost:4000"}/api/twitch/state`, {
    method: "POST",
  })

  if (!stateResponse.ok) {
    console.error(
      "Failed to generate state",
      stateResponse.status,
      stateResponse.statusText,
      stateResponse.url,
      await stateResponse.text()
    )
    // res.status(500).send({ message: "Failed to generate state" })
    res.redirect(`/settings#error=state`)
    // return
  }

  const state = await stateResponse.text()

  const params: AuthCodeParams = {
    response_type: "code",
    client_id: process.env.TWITCH_CLIENT_ID ?? "",
    scope: scopes.join(" "),
    state: state,
    // force_verify: "true",
  }

  const paramsString = new URLSearchParams(params).toString()

  const redirectUrl = `redirect_uri=${process.env.TWITCH_REDIRECT_URI}/api/twitch/oauth2/token`

  res.redirect(`https://id.twitch.tv/oauth2/authorize?${paramsString}&${redirectUrl}`)
}

export default handler
