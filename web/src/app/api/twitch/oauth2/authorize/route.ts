import { RouteHandler } from "@/types"
import { AuthCodeParams, scopes } from "@/utils/twitch"

// make route dynamic
// by default, GET requests without using request object or dynamic functions are cached
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const revalidate = 0
// export const dynamic: RouteConfig["dynamic"] = "force-dynamic"

export const GET: RouteHandler = async () => {
  if (!process.env.TWITCH_REDIRECT_URI) {
    return Response.json({ message: "redirect_uri is not set" }, { status: 500 })
  }

  // const state = randomBase64Url(32)
  const stateResponse = await fetch(`${process.env.SERVER_URL ?? "http://localhost:4000"}/api/twitch/state`, {
    method: "POST",
  })

  if (!stateResponse.ok) {
    console.error(
      "[twitch/ouath2/authorize] Failed to generate state",
      stateResponse.status,
      stateResponse.statusText,
      stateResponse.url,
      await stateResponse.text()
    )

    // return Response.json({ message: "Failed to generate state" }, { status: 500 })
    return Response.redirect(`/settings#error=state`)
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

  return Response.redirect(`https://id.twitch.tv/oauth2/authorize?${paramsString}&${redirectUrl}`)
}
