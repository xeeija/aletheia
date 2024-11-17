import {
  MyRandomWheelsDocument,
  RandomWheelDocument,
  RandomWheelFragment,
  RandomWheelListItemFragment,
} from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getRandomWheel = async (slug: string, token?: string) => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(RandomWheelDocument, { slug, token })
  const wheel = wheelResult.data?.randomWheel as RandomWheelFragment
  return wheel
}

export const getMyRandomWheels = async (type = "my") => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(MyRandomWheelsDocument, { type })
  const wheel = wheelResult.data?.myRandomWheels as RandomWheelListItemFragment[]
  return wheel
}
