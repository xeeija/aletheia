import { MeDocument, UserNameFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"
import { cache } from "react"

const getAuthInternal = async () => {
  const client = await getUrqlClient()
  // const cookieStore = await cookies()

  const userResult = await client.query(MeDocument, {})
  const user = (userResult.data?.me ?? undefined) as UserNameFragment | undefined
  return {
    user,
    authenticated: !!user,
  }
}

export const getAuth = cache(getAuthInternal)
