import { RouteHandler } from "@/types"

// route is automatically dynamic if request object is used

export const GET: RouteHandler = async (req) => {
  const errorCode = req.nextUrl.searchParams.get("error")

  const serverUrl = process.env.SERVER_URL ?? "http://localhost:4000"
  const origin = req.nextUrl.origin

  console.log({ url: req.url, ...req.nextUrl })

  // handle errors
  if (errorCode) {
    console.error("Error twitch/ouath2/token:", errorCode)
    return Response.redirect(`${origin}/settings#error=${errorCode}`)
  }

  const requestUrl = `${serverUrl}${req.nextUrl.pathname}${req.nextUrl.search}`
  // console.log("token:", req.method, requestUrl)

  try {
    const serverRes = await fetch(requestUrl, {
      method: "GET",
      headers: req.headers,
    })

    if (serverRes.ok) {
      return Response.redirect(`${origin}/settings`)
    } else {
      if (serverRes.status < 500) {
        const body = (await serverRes.json()) as unknown
        console.error("[twitch/ouath2/token] error:", serverRes.status, body)
      } else {
        const body = await serverRes.text()
        console.error("[twitch/oauth2/token] error:", serverRes.status, body)
      }

      return Response.redirect(`${origin}/settings#error=${serverRes.status}`)
    }
  } catch (err: unknown) {
    console.error("[twitch/oauth2/token] unkown error:", err)
    return Response.redirect(`${origin}/settings#error=unknown`)
  }
}