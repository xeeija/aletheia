import { ApiHandler } from "../../../../types"
import { randomBase64Url } from "../../../../utils/random"

const handler: ApiHandler = (_, res) => {
  if (!process.env.TWITCH_REDIRECT_URI) {
    res.status(500).send({ message: "redirect_uri is not set" })
    return
  }

  const state = randomBase64Url(32)

  const params = {
    response_type: "code",
    client_id: process.env.TWITCH_CLIENT_ID ?? "",
    scope: ["channel:read:redemptions", "channel:manage:redemptions"].join(" "),
    // force_verify: "true",
    state: state,
  }

  const paramsString = new URLSearchParams(params).toString()

  const redirectUrl = `redirect_uri=${process.env.TWITCH_REDIRECT_URI ?? "http://localhost:3000"}/api/twitch/oauth2/token`

  res.redirect(`https://id.twitch.tv/oauth2/authorize?${paramsString}&${redirectUrl}`)
}

export default handler
