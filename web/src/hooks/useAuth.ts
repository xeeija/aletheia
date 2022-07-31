import { useMeQuery } from "../generated/graphql"

export const useAuth = () => {
  const [{ data, error, fetching }] = useMeQuery()

  return {
    user: data?.me,
    error,
    fetchingUser: fetching
  }
}
