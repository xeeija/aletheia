import { MyRandomWheelsDocument, RandomWheel, RandomWheelBySlugDocument } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getRandomWheel = async (slug: string, token?: string) => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(RandomWheelBySlugDocument, { slug, token })
  const wheel = wheelResult.data?.randomWheelBySlug as RandomWheel
  return wheel
}

export const getMyRandomWheels = async (type = "my") => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(MyRandomWheelsDocument, { type })
  const wheel = wheelResult.data?.myRandomWheels as RandomWheel[]

  return [wheel, wheelResult] as const
}
