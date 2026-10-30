import {
  ChannelRewardsDocument,
  RewardByTokenDocument,
  UserAccessTokenDocument,
  type CustomRewardFragment,
  type CustomRewardMenuItemFragment,
  type UserAccessTokenFragment,
} from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"
import { cacheLife } from "next/cache"
import { cache } from "react"

const getUserAccessTokenInternal = async (cookies?: string) => {
  "use cache"
  cacheLife("seconds")

  const client = await getUrqlClient({ cookies })

  const result = await client.query(UserAccessTokenDocument, {})
  return result.data?.userAccesToken as UserAccessTokenFragment | undefined
}

export const getUserAccessToken = cache(getUserAccessTokenInternal)

const getRewardLinkTokenInternal = async (token: string, type: string, cookies?: string) => {
  "use cache"
  cacheLife("seconds")

  const client = await getUrqlClient({ cookies })
  const result = await client.query(RewardByTokenDocument, { token, type })

  return result.data?.rewardByToken as CustomRewardMenuItemFragment | undefined
}

export const getRewardLinkToken = cache(getRewardLinkTokenInternal)

const getChannelRewardsInternal = async (onlyManageable?: boolean, cookies?: string) => {
  "use cache"
  cacheLife("seconds")

  const client = await getUrqlClient({ cookies })
  const result = await client.query(ChannelRewardsDocument, { onlyManageable })

  const channelRewards = result.data?.channelRewards as CustomRewardFragment[] | undefined
  const error = result.error
    ? {
        name: result.error.name,
        message: result.error.message,
        networkError: result.error.networkError,
        graphQLErrors: result.error.graphQLErrors,
      }
    : undefined

  return [channelRewards, error] as const
}

export const getChannelRewards = cache(getChannelRewardsInternal)
