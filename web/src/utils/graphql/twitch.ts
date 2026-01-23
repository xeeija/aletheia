import { RewardByTokenDocument, type CustomRewardMenuItemFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getRewardLinkToken = async (token: string, type: string) => {
  const client = await getUrqlClient()
  const result = await client.query(RewardByTokenDocument, { token, type })

  return result.data?.rewardByToken as CustomRewardMenuItemFragment | undefined
}
