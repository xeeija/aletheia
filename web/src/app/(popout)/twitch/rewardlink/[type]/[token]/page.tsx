import { type MetadataFn, type Page } from "@/types"
import { getRewardLinkToken } from "@/utils/graphql/twitch"
import { NotFoundRewardLink } from "./not-found"
import { Token } from "./token"

export type Params = {
  type: string
  token: string
}

export type SearchParams = {
  size?: string
  fontSize?: string
  customTitle?: string
  hideTitle?: string
  titlePosition?: string
}

// const rewardLinkTypes = ["enable", "pause"]

export const generateMetadata: MetadataFn<Params, SearchParams> = async ({ params }) => {
  const { type, token } = await params

  const reward = await getRewardLinkToken(token, type)

  if (!reward) {
    // notFound()
    return {
      title: "Not Found",
    }
  }

  return {
    title: `${reward?.title} (${type})`,
  }
}

// const RewardLinkPage: Page<Params, SearchParams> = async ({ params, searchParams }) => {
const RewardLinkPage: Page<Params, SearchParams> = async ({ params, searchParams }) => {
  const [{ token, type }] = await Promise.all([params])

  const reward = await getRewardLinkToken(token, type)

  if (!reward) {
    // notFound() does not respect searchParams, so ?size=lg will not still use the default size
    // notFound()
    return <NotFoundRewardLink params={params} searchParams={searchParams} />
  }

  return <Token token={token} type={type} reward={reward} />
}

export default RewardLinkPage
