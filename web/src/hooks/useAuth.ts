import {
  useDisconnectAccessTokenMutation,
  useMeQuery,
  UserAccessTokenFragment,
  UserNameFragment,
  useUserAccessTokenQuery,
} from "@/generated/graphql"

export const useAuth = (config?: { includeToken?: boolean }) => {
  const [{ data: user, error: errorUser, fetching: fetchingUser }] = useMeQuery()
  const [{ data: token, error: errorToken, fetching: fetchingToken }] = useUserAccessTokenQuery({
    pause: !config?.includeToken,
  })
  const [{ fetching: fetchingDisconnect }, disconnectAccessToken] = useDisconnectAccessTokenMutation()

  return {
    user: user?.me as UserNameFragment | undefined,
    error: errorUser,
    fetchingUser,
    authenticated: !!user?.me,
    userAccessToken: token?.userAccesToken as UserAccessTokenFragment | undefined,
    errorUserAccessToken: errorToken,
    fetchingToken,
    fetchingDisconnect,
    disconnectAccessToken: () =>
      disconnectAccessToken(
        {},
        {
          additionalTypenames: ["UserAccessToken"],
        }
      ),
  }
}
