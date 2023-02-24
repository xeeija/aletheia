import { useMeQuery, UserNameFragment } from "../generated/graphql"

export const useAuth = () => {
  const [{ data, error, fetching }] = useMeQuery()

  return {
    user: <UserNameFragment>data?.me,
    error,
    fetchingUser: fetching,
    authenticated: !!data?.me
  }
}
