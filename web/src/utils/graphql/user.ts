import { MeDocument, UserNameFragment } from "@/generated/graphql"
import { getUrqlClient } from "@/utils/urql"

export const getUser = async () => {
  const client = getUrqlClient()

  const userResult = await client.query(MeDocument, {})
  const user = userResult.data?.me as UserNameFragment
  return user
}
