import { HelixCustomReward } from "@twurple/api"
import { readFile } from "fs/promises"

let mockRewards: HelixCustomReward[] = []

export const getRewards = async () => {
  if (mockRewards.length === 0) {
    const rewardData: any[] = (JSON.parse(await readFile("./src/twitch/mock/rewards.json", "utf-8")))
    mockRewards = rewardData.map(r => new HelixCustomReward(r))
  }
  return mockRewards
}
