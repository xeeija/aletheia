import { RandomWheel, RandomWheelBySlugDocument } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getRandomWheel = async (slug: string, token?: string) => {
  const client = getUrqlClient()

  const wheelResult = await client.query(RandomWheelBySlugDocument, { slug, token })
  const wheel = wheelResult.data?.randomWheelBySlug as RandomWheel
  return wheel
}
