import { useMeQuery } from "../generated/graphql"

export const useAuth = () => {
  const [{ data, error }] = useMeQuery()

  return {
    user: data?.me,
    error,
  }
}
