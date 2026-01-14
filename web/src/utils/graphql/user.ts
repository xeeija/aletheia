import { MeDocument, UserNameFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getAuth = async () => {
  const client = await getUrqlClient()
  // const cookieStore = await cookies()

  const userResult = await client.query(MeDocument, {})
  const user = (userResult.data?.me ?? undefined) as UserNameFragment | undefined
  return {
    user,
    authenticated: !!user,
  }
}
