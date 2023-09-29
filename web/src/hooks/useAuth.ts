import { useDisconnectAccessTokenMutation, useMeQuery, UserAccessTokenFragment, UserNameFragment, useUserAccessTokenQuery } from "../generated/graphql"

export const useAuth = (config?: { includeToken?: boolean }) => {
  const [{ data: user, error: errorUser, fetching: fetchingUser }] = useMeQuery()
  const [{ data: token, error: errorToken, fetching: fetchingToken }] = useUserAccessTokenQuery({
    pause: !config?.includeToken
  })
  const [, disconnectAccessToken] = useDisconnectAccessTokenMutation()

  return {
    user: <UserNameFragment>user?.me,
    error: errorUser,
    fetchingUser,
    authenticated: !!user?.me,
    userAccessToken: <UserAccessTokenFragment | undefined>token?.userAccesToken,
    errorUserAccessToken: errorToken,
    fetchingToken,
    disconnectAccessToken: () => disconnectAccessToken({}, {
      additionalTypenames: ["UserAccessToken"]
    })
  }
}
