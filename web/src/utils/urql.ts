import { cacheExchange, createClient, fetchExchange } from "@urql/next"
import { registerUrql } from "@urql/next/rsc"

// Note: client side urql client is created directly in UrqlProvider/UrqlSsrProvider component

const makeClient = async (fetchOptions?: RequestInit, requestCookies?: string) => {
  // accessing cookies or connection() fails in cache components, and all calls to makeClient/getUrlClient are cached
  // so just pass the cookies from outside
  // await connection()
  // const cookie = requestCookies ?? (await cookies()).toString()
  const cookie = requestCookies ?? ""

  return () =>
    createClient({
      url: `${process.env.SERVER_URL || ""}/api/graphql`,
      // exchanges: [devtoolsExchange, cacheExchange, ssrCache, fetchExchange],
      exchanges: [cacheExchange, fetchExchange],
      suspense: true,
      fetchOptions: () => ({
        ...fetchOptions,
        credentials: "include",
        //  manually include cookies (from server component)
        headers: {
          // cookies() throws an error when it is not called from a server component
          ...fetchOptions?.headers,
          cookie: cookie,
        },
      }),
    })
}

type UrqlClientConfig = {
  options?: RequestInit
  cookies?: string
}

export const getUrqlClient = async (config?: UrqlClientConfig) => {
  const makeClientFn = await makeClient(config?.options, config?.cookies)
  const { getClient } = registerUrql(makeClientFn)
  return getClient()
}

// TODO: Maybe use cache() to immediately cache the urql client,
// and subsequently directly get always cached results for client.query() calls for all queries?
