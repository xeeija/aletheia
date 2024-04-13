import "dotenv/config"
import { writeFile } from "fs/promises"

const port = process.env.TWITCH_MOCK_SERVER_PORT ?? "8080"
const clientId = process.env.TWITCH_MOCK_CLIENT_ID
const secret = process.env.TWITCH_MOCK_CLIENT_SECRET
const userId = process.argv[2] || process.env.TWITCH_MOCK_USER_ID
const scope = process.argv[3]?.split(",") || ["channel:read:redemptions", "channel:manage:redemptions"]

const params = new URLSearchParams({
  client_id: clientId ?? "",
  client_secret: secret ?? "",
  grant_type: "user_token",
  user_id: userId ?? "",
  scope: scope.join(" "),
}).toString()

const main = async () => {
  const response = await fetch(
    // `http://localhost:${port}/auth/authorize?client_id=${clientId}&client_secret=${secret}&grant_type=user_token&user_id=${userId}&scope=${scopeList}`,
    `http://localhost:${port}/auth/authorize?${params}`,
    { method: "POST" }
  )

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const tokenJson: Record<string, string> = await response.json()

  // const newToken: AccessToken = {
  //   accessToken: tokenJson.access_token,
  //   refreshToken: tokenJson.access_token,
  //   expiresIn: tokenJson.expires_in as unknown as number,
  //   obtainmentTimestamp: Date.now(),
  //   scope: tokenJson.scope as unknown as string[],
  // }
  const newToken = {
    accessToken: tokenJson.access_token,
    refreshToken: tokenJson.access_token,
    expiresIn: tokenJson.expires_in as unknown as number,
    obtainmentTimestamp: Date.now(),
    scope: tokenJson.scope as unknown as string[],
    tokenType: tokenJson.token_type,
  }

  await writeFile(`./src/twitch/mock/data/token.json`, JSON.stringify(newToken, null, 2), "utf-8")

  console.log("Fetched new user access token for", userId)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
