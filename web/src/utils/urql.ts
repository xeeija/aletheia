import { cacheExchange, createClient, fetchExchange } from "@urql/next"
import { registerUrql } from "@urql/next/rsc"
import { cookies } from "next/headers"

// Note: client side urql client is created directly in UrqlProvider/UrqlSsrProvider component

const makeClient = async () => {
  const cookieStore = await cookies()

  return () =>
    createClient({
      url: `${process.env.SERVER_URL || ""}/api/graphql`,
      // exchanges: [devtoolsExchange, cacheExchange, ssrCache, fetchExchange],
      exchanges: [cacheExchange, fetchExchange],
      suspense: true,
      fetchOptions: () => ({
        credentials: "include",
        //  manually include cookies (from server component)
        headers: {
          // cookies() throws an error when it is not called from a server component
          cookie: cookieStore.toString(),
        },
      }),
    })
}

export const getUrqlClient = async () => {
  const makeClientFn = await makeClient()
  const { getClient } = registerUrql(makeClientFn)
  return getClient()
}
