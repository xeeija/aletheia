import { ApiHandler } from "@/types"

const handler: ApiHandler = async (req, res) => {
  const headersList = req.rawHeaders.reduce<[string, string][]>((acc, header, i) => {
    if (i % 2 === 0) {
      acc.push([header, req.rawHeaders[i + 1]])
    }
    return acc
  }, [])

  const serverRes = await fetch(
    process.env.GRAPHQL_SERVER_URL ?? `${process.env.SERVER_URL ?? "http://localhost:4000"}/graphql`,
    {
      method: req.method,
      headers: headersList,
      body: !(req.method === "GET" || req.method === "HEAD") ? JSON.stringify(req.body) : null,
    }
  )

  serverRes.headers.forEach((value, key) => res.setHeader(key, value))
  res.status(serverRes.status).send(await serverRes.text())
}

export default handler
