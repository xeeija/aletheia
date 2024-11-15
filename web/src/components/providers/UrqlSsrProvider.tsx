"use client"

import { devtoolsExchange } from "@urql/devtools"
import { cacheExchange, createClient, fetchExchange, ssrExchange, UrqlProvider } from "@urql/next"
import { FC, ReactNode, useMemo } from "react"

interface Props {
  children: ReactNode
}

const isClient = typeof window !== "undefined"
export const ssrCache = ssrExchange({ isClient })

export const UrqlSsrProvider: FC<Props> = ({ children }) => {
  const [client, ssr] = useMemo(() => {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? ""
    // const isClient = typeof window !== "undefined"

    // const ssr = ssrExchange({ isClient })

    const client = createClient({
      url: `${serverUrl}/api/graphql`,
      exchanges: [devtoolsExchange, cacheExchange, ssrCache, fetchExchange],
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
