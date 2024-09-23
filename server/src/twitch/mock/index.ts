import { loggerTwitchAuth as logger } from "@/utils/index.js"
import { HelixCustomReward } from "@twurple/api"
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth"
import { readFile } from "fs/promises"
import { rewards } from "./data/rewards.js"

let mockRewards: HelixCustomReward[] = []

export const getRewards = () => {
  if (mockRewards.length === 0) {
    // const rewardData: any[] = (JSON.parse(await readFile("./src/twitch/mock/rewards.json", "utf-8")))

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rewardData: any[] = rewards
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    mockRewards = rewardData.map((r) => new HelixCustomReward(r))
  }
  return mockRewards
}

export const addMockAccessTokens = async (mockAuthProvider: RefreshingAuthProvider) => {
  // const tokenJson = (await import("./mock/token.json", { assert: { type: "json" } })).default
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tokenJson: AccessToken = JSON.parse(await readFile("./src/twitch/mock/data/token.json", "utf-8"))

    // const token: AccessToken = {
    //   accessToken: tokenJson.access_token,
    //   refreshToken: tokenJson.access_token,
    //   expiresIn: tokenJson.expires_in as unknown as number,
    //   obtainmentTimestamp: Date.now(),
    //   scope: tokenJson.scope as unknown as string[],
    // }
    mockAuthProvider.addUser(process.env.TWITCH_MOCK_USER_ID ?? "", tokenJson)
  } catch (err) {
    logger.error("Failed to load Mock API token:", err)
  }
}
