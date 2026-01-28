import {
  MyRandomWheelsDocument,
  RandomWheelDocument,
  RandomWheelEntriesDocument,
  RandomWheelListItemFragment,
  type RandomWheelEntryFragment,
} from "@/generated/graphql"
import type { RandomWheelDetails } from "@/hooks"
import { getUrqlClient } from "@/utils/urql"

export const getRandomWheel = async (slug: string, token?: string) => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(RandomWheelDocument, { slug, token })

  if (!wheelResult.data?.randomWheel) {
    return null
  }

  return { ...wheelResult.data.randomWheel, spinning: false } as RandomWheelDetails
}

export const getRandomWheelEmtries = async (slug: string, token?: string) => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(RandomWheelEntriesDocument, { slug, token })

  return (wheelResult.data?.randomWheel?.entries ?? null) as RandomWheelEntryFragment[] | null
}

export const getMyRandomWheels = async (type = "my") => {
  const client = await getUrqlClient()

  const wheelResult = await client.query(MyRandomWheelsDocument, { type })
  return wheelResult.data?.myRandomWheels as RandomWheelListItemFragment[] | undefined
}
