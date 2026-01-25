import {
  ChannelRewardsDocument,
  RewardByTokenDocument,
  UserAccessTokenDocument,
  type CustomRewardFragment,
  type CustomRewardMenuItemFragment,
  type UserAccessTokenFragment,
} from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"
import { cache } from "react"

const getUserAccessTokenInternal = async () => {
  const client = await getUrqlClient()

  const result = await client.query(UserAccessTokenDocument, {})
  return result.data?.userAccesToken as UserAccessTokenFragment | undefined
}

export const getUserAccessToken = cache(getUserAccessTokenInternal)

const getRewardLinkTokenInternal = async (token: string, type: string) => {
  const client = await getUrqlClient()
  const result = await client.query(RewardByTokenDocument, { token, type })

  return result.data?.rewardByToken as CustomRewardMenuItemFragment | undefined
}

export const getRewardLinkToken = cache(getRewardLinkTokenInternal)

const getChannelRewardsInternal = async (onlyManageable?: boolean) => {
  const client = await getUrqlClient()
  const result = await client.query(ChannelRewardsDocument, { onlyManageable })

  return result.data?.channelRewards as CustomRewardFragment[] | undefined
}

export const getChannelRewards = cache(getChannelRewardsInternal)
