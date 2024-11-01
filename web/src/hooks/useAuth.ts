import {
  useDisconnectAccessTokenMutation,
  useMeQuery,
  UserAccessTokenFragment,
  UserNameFragment,
  useUserAccessTokenQuery,
} from "@/generated/graphql"

export const useAuth = (config?: { includeToken?: boolean }) => {
  const [{ data: user, error: errorUser, fetching: fetchingUser }, fetchUser] = useMeQuery()
  const [{ data: token, error: errorToken, fetching: fetchingToken }] = useUserAccessTokenQuery({
    pause: !config?.includeToken,
  })
  const [{ fetching: fetchingDisconnect }, disconnectAccessToken] = useDisconnectAccessTokenMutation()

  return {
    user: user?.me as UserNameFragment | undefined,
    error: errorUser,
    fetchingUser,
    refetchUser: async () =>
      new Promise<void>((resolve) => {
        console.log("start refetch")
        fetchUser({
          requestPolicy: "cache-and-network",
        })

        // workaround to wait for fetchUser to finish
        const interval = setInterval(() => {
          if (!fetchingUser) {
            resolve()
            setTimeout(() => clearInterval(interval), 50)
          }
        }, 10)
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
