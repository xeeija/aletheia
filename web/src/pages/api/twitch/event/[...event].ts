import { ApiHandler } from "../../../../types"

// const apiPattern = /^\/api/

const handler: ApiHandler = async (req, res) => {

  if (req.method !== "POST") {
    res.status(405).send(null)
    return
  }

  const headersList = req.rawHeaders.reduce<[string, string][]>((acc, header, i) => {
    if (i % 2 === 0) {
      acc.push([header, req.rawHeaders[i + 1]])
    }
    return acc
  }, [])
    .filter(header => header[0] !== "Content-Length")

  // ?.replace("/api", "")
  const requestUrl = `${process.env.SERVER_URL ?? "http://localhost:4000"}${req.url}`

  const serverRes = await fetch(requestUrl, {
    method: req.method,
    headers: headersList,
    body: JSON.stringify(req.body),
  })

  serverRes.headers.forEach((value, key) => res.setHeader(key, value))
  res.status(serverRes.status).send(await serverRes.text())

  // res.status(200).send(null)
}

export default handler