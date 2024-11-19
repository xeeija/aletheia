import {
  MyRandomWheelsDocument,
  RandomWheelDocument,
  RandomWheelFragment,
  RandomWheelListItemFragment,
} from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getRandomWheel = async (slug: string, token?: string) => {
  const client = await getUrqlClient({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  })

  const wheelResult = await client.query(RandomWheelDocument, { slug, token })

  return wheelResult.data?.randomWheel as RandomWheelFragment
}

export const getMyRandomWheels = async (type = "my") => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(MyRandomWheelsDocument, { type })
  return wheelResult.data?.myRandomWheels as RandomWheelListItemFragment[]
}
