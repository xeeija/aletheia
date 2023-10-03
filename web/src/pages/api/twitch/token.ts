import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (req, res) => {

  // const params = {
  //   client_id: "",
  //   client_secret: "SECRET",
  //   grant_type: "authorization_code",
  //   redirct_uri: `${"http://localhost:3000"}/api/twitch/authorize`,
  //   scopes: [
  //     "channel:read:redemptions",
  //   ].join(" "),
  //   state: "c3ab8aa609ea11e793ae92361f002672" // randomly generated unique per request
  // }
  // const paramsString = new URLSearchParams(params).toString()

  // console.log(req.url)

  // const query = Object.entries(req.query).reduce(([k, v]) => `${k}=${v}`)

  // res.redirect(`https://id.twitch.tv/oauth2/token?${paramsString}`)
  // res.redirect(`${process.env.SERVER_URL}/api/twitch/token?${q}`)
  res.redirect(`${process.env.SERVER_URL}${req.url}`)
}

export default handler