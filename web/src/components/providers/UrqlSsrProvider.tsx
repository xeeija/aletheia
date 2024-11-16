"use client"

import { LoginMutation, MeDocument, MyRandomWheelsDocument } from "@/generated/graphql"
import { devtoolsExchange } from "@urql/devtools"
import { cacheExchange } from "@urql/exchange-graphcache"
import { createClient, fetchExchange, ssrExchange, UrqlProvider } from "@urql/next"
import { FC, ReactNode, useMemo } from "react"

interface Props {
  children: ReactNode
}

// const isClient = typeof window !== "undefined"
// export const ssrCache = ssrExchange({ isClient })

export const UrqlSsrProvider: FC<Props> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""

    const isClient = typeof window !== "undefined"
    const ssrCache = ssrExchange({ isClient })

    const graphCache = cacheExchange({
      keys: {
        RandomWheelCount: () => null,
      },
      updates: {
        Mutation: {
          login: (result: LoginMutation, _args, cache) => {
            // console.log("login", { result, _args, _info })

            cache.updateQuery({ query: MeDocument }, (data) => ({
              ...data,
              me: result.login.user,
            }))

            // const queryFields = cache.inspectFields("Query")
            // console.log({ queryFields })

            // const cachedWheel = cache.resolve("Query", "myRandomWheels", { type: "my" })
            // const cachedMe = cache.resolve("Query", "me")

            // console.log({ cachedWheel, cachedMe })

            const key = "Query"
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "myRandomWheels")
              .forEach((field) => {
                cache.invalidate(key, field.fieldKey)
                // or alternatively:
                cache.invalidate(key, field.fieldName, field.arguments)
              })
          },
          logout: (_result, _args, cache) => {
            cache.updateQuery({ query: MeDocument }, (data) => ({
              ...data,
              me: null,
            }))

            const key = "Query"
            cache
              .inspectFields(key)
              .filter((field) => field.fieldName === "myRandomWheels")
              .forEach((field) => {
                cache.updateQuery(
                  { query: MyRandomWheelsDocument, variables: field.arguments ?? undefined },
                  (data) => ({ ...data, myRandomWheels: [] })
                )

                //     // cache.invalidate(key, field.fieldKey)
                //     // or alternatively:
                //     // cache.invalidate(key, field.fieldName, field.arguments)
              })
          },
        },
      },
    })

    const client = createClient({
      url: `${serverUrl}/api/graphql`,
      exchanges: [devtoolsExchange, graphCache, ssrCache, fetchExchange],
      // exchanges: [devtoolsExchange, cacheExchange, ssr, fetchExchange],
      suspense: true,
      fetchOptions: {
        credentials: "include",
        // cookies are missing on server side
      },
    })

    return [client, ssrCache]
  }, [])

  return (
    <UrqlProvider client={client} ssr={ssr}>
      {children}
    </UrqlProvider>
  )
}

// const serializeOpResult = (op: OperationResult): SerializedResult => ({
//   data: JSON.stringify(op.data),
//   error: op.error
//     ? {
//         graphQLErrors: op.error.graphQLErrors, //.map((e) => e.toJSON() as string),
//         networkError: op.error.networkError
//           ? `${op.error.networkError.name}: ${op.error.networkError.message}`
//           : undefined,
//       }
//     : undefined,
//   extensions: JSON.stringify(op.extensions),
//   hasNext: op.hasNext,
// })

// // use in client component:
// if (typeof window === "undefined") {
//   const ssrData = ssrCache.extractData()
//   console.log("ssrData", ssrData)
// } else if (opResult) {
//   ssrCache.restoreData({
//     [opResult.operation.key]: serialize(opResult),
//   })
// }
