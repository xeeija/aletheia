import { MeDocument, UserNameFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getUser = async () => {
  const client = await getUrqlClient()
  // const cookieStore = await cookies()

  const userResult = await client.query(MeDocument, {})
  const user = (userResult.data?.me ?? null) as UserNameFragment | null
  return user
}
