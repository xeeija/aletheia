import {
  LoginMutationVariables,
  useDisconnectAccessTokenMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  UserAccessTokenFragment,
  UserNameFragment,
  useUserAccessTokenQuery,
} from "@/generated/graphql"
import { useAlert, useRouterAsync, useUrqlContextCookies } from "@/hooks"
import { CombinedError } from "urql"

type Config = {
  includeToken?: boolean
  initialUser?: UserNameFragment
}

export const useAuth = (config?: Config) => {
  const context = useUrqlContextCookies()
  const [{ data: user, error: errorUser, fetching: fetchingUser }, fetchUser] = useMeQuery({
    // required for initial page load, as long as initialUser is not provided
    // requestPolicy: "cache-and-network",
    context,
  })

  const [, loginFn] = useLoginMutation()
  const [, logoutFn] = useLogoutMutation()

  // const router = useRouter()
  // const [refresh] = useRouterRefresh()
  const routerAsync = useRouterAsync()

  const { showError } = useAlert()

  // twitch
  const [{ data: token, error: errorToken, fetching: fetchingToken }] = useUserAccessTokenQuery({
    pause: !config?.includeToken,
    context,
  })
  const [{ fetching: fetchingDisconnect }, disconnectAccessToken] = useDisconnectAccessTokenMutation()

  const handleError = (error: CombinedError) => {
    if (error.networkError) {
      showError("Could not connect to server.")
    } else if (error.graphQLErrors) {
      showError(error.graphQLErrors.join("\\n"))
    } else {
      showError("Unknown error, please try again later.")
    }
  }

  return {
    user: user?.me ?? config?.initialUser, // as UserNameFragment | undefined,
    error: errorUser,
    fetchingUser,
    refetchUser: fetchUser,
    // refetchUser: async (force?: boolean) =>
    //   new Promise<void>((resolve) => {
    //     setTimeout(() => {
    //       fetchUser({
    //         requestPolicy: "cache-and-network",
    //         fetchOptions: {
    //           cache: force ? "no-store" : undefined,
    //         },
    //       })

    //       // resolve()
    //       // does not work quite well yet
    //       setTimeout(() => {
    //         router.refresh()
    //         resolve()
    //       }, 250)
    //     })
    //   }),
    authenticated: !!user?.me,
    login: async (vars: LoginMutationVariables, redirectHref?: string) => {
      const response = await loginFn(vars)

      if (response.error) {
        handleError(response.error)
      }

      if (!response.error && response.data?.login.user) {
        await routerAsync.refresh()

        if (redirectHref) {
          await routerAsync.push(redirectHref)
        }
      }

      return response
    },
    logout: async (redirectHref?: string) => {
      // setFetchingLogout(true)

      const response = await logoutFn({})

      if (response.error) {
        console.log({ error: response.error })
        handleError(response.error)
        // Show error snackbar?
        // setLogoutError(true)
      }

      if (!response.data?.logout) {
        // console.log("Logout: ", response.data?.logout)
        // setLogoutError(true)
        showError("Failed to logout correctly")
      }

      if (!response.error && response.data?.logout) {
        await routerAsync.refresh()

        if (redirectHref) {
          await routerAsync.push(redirectHref)
        }
      }

      // setFetchingLogout(true)

      return response
    },
    // twitch
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
