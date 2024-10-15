import type { ApiHandler } from "@/types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send(null)
    return
  }

  // handle errors
  const errorCode = typeof req.query.error === "string" ? req.query.error : req.query.error?.[0]
  if (errorCode) {
    console.error("error:", errorCode)
    res.redirect(`/settings#error=${errorCode}`)
    return
  }

  const headersList = req.rawHeaders.reduce<[string, string][]>((acc, header, i) => {
    if (i % 2 === 0) {
      acc.push([header, req.rawHeaders[i + 1]])
    }
    return acc
  }, [])
  // .filter(header => header[0] !== "Content-Length")

  const requestUrl = `${process.env.SERVER_URL ?? "http://localhost:4000"}${req.url}`
  // console.log("token:", req.method, requestUrl)

  try {
    const serverRes = await fetch(requestUrl, {
      method: req.method,
      headers: headersList,
    })

    if (serverRes.ok) {
      res.redirect("/settings")
    } else {
      if (serverRes.status < 500) {
        const body = (await serverRes.json()) as unknown
        console.error("[twitch] error", serverRes.status, body)
      } else {
        const body = await serverRes.text()
        console.error("[twitch] error", serverRes.status, body)
      }

      res.redirect(`/settings#error=${serverRes.status}`)
    }
  } catch (err: unknown) {
    console.error("unkown error:", err)
    res.redirect(`/settings#error=unknown`)
  }
}

export default handler
