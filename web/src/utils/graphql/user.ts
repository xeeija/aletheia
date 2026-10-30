import { MeDocument, UserNameFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"
import { cacheLife } from "next/cache"
import { cache } from "react"

const getAuthInternal = async (cookies?: string) => {
  "use cache"
  cacheLife("minutes")

  const client = await getUrqlClient({ cookies })
  // const cookieStore = await cookies()

  const userResult = await client.query(MeDocument, {})
  const user = (userResult.data?.me ?? undefined) as UserNameFragment | undefined
  return {
    user,
    authenticated: !!user,
  }
}

export const getAuth = cache(getAuthInternal)
