import type { ApiHandler } from "@/types"

const handler: ApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).send(null)
    return
  }

  const state = typeof req.query.state === "string" ? req.query.state : req.query.state?.[0]

  console.log("state2", state)

  // handle errors
  const errorCode = typeof req.query.error === "string" ? req.query.error : req.query.error?.[0]
  if (errorCode) {
    console.error("error:", errorCode)
    res.redirect(`/settings#error`)
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
      const body = (await serverRes.json()) as unknown
      console.error("[twitch] error", serverRes.status, body)
      res.redirect(`/settings#error`)
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
      res.redirect(`/settings#error`)
    }
    console.error("unkown error:", err)
  }
}

export default handler
