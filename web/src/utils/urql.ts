import { registerUrql } from "@urql/next/rsc"
import { cookies } from "next/headers"
import { cacheExchange, createClient, fetchExchange } from "urql"

// Note: client side urql client is created directly in UrqlProvider/UrqlSsrProvider component

const makeClient = () => {
  return createClient({
    url: `${process.env.SERVER_URL || ""}/api/graphql`,
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({
      credentials: "include",
      //  manually include cookies (from server component)
      headers: {
        // cookies() throws an error when it is not called from a server component
        cookie: cookies().toString(),
      },
    }),
  })
}

export const { getClient: getUrqlClient } = registerUrql(makeClient)
