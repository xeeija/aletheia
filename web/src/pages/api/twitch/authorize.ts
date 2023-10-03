import { ApiHandler } from "../../../types"

const handler: ApiHandler = async (_, res) => {

  // const params = {
  //   client_id: "",
  //   response_type: "code",
  //   redirct_uri: `${"http://localhost:3000"}/api/twitch/authorize`,
  //   scopes: [
  //     "channel:read:redemptions",
  //   ].join(" "),
  //   state: "c3ab8aa609ea11e793ae92361f002672" // randomly generated unique per request
  // }
  // const paramsString = new URLSearchParams(params).toString()

  // res.redirect(`https://id.twitch.tv/oauth2/authorize?${paramsString}`)

  // console.log("server", process.env.SERVER_URL)
  res.redirect(`${process.env.SERVER_URL}/api/twitch/authorize`)
}

export default handler