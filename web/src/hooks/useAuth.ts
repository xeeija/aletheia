import {
  useDisconnectAccessTokenMutation,
  useMeQuery,
  UserAccessTokenFragment,
  UserNameFragment,
  useUserAccessTokenQuery,
} from "@/generated/graphql"

type Config = {
  includeToken?: boolean
  initialUser?: UserNameFragment
}

export const useAuth = (config?: Config) => {
  const [{ data: user, error: errorUser, fetching: fetchingUser }, fetchUser] = useMeQuery({
    // required for initial page load, as long as initialUser is not provided
    requestPolicy: "cache-and-network",
  })
  const [{ data: token, error: errorToken, fetching: fetchingToken }] = useUserAccessTokenQuery({
    pause: !config?.includeToken,
  })
  const [{ fetching: fetchingDisconnect }, disconnectAccessToken] = useDisconnectAccessTokenMutation()

  return {
    user: user?.me ?? config?.initialUser, // as UserNameFragment | undefined,
    error: errorUser,
    fetchingUser,
    refetchUser: async () =>
      new Promise<void>((resolve) => {
        fetchUser({
          requestPolicy: "cache-and-network",
        })

        // does not work quite well yet
        setTimeout(resolve, 250)
      }),
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
