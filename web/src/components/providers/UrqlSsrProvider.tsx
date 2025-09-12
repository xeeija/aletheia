"use client"

import {
  AddRandomWheelEntryMutation,
  AddRandomWheelEntryMutationVariables,
  ChannelRewardsDocument,
  DeleteChannelRewardMutationVariables,
  DeleteRandomWheelEntryMutationVariables,
  DeleteRewardGroupMutationVariables,
  LoginMutation,
  MeDocument,
  MyRandomWheelsDocument,
  RandomWheelEntriesDocument,
  RandomWheelEntriesQueryVariables,
  RandomWheelWinnersDocument,
  RewardGroupsDocument,
  type RandomWheelWinnersQueryVariables,
  type SpinRandomWheelMutation,
  type SpinRandomWheelMutationVariables,
} from "@/generated/graphql"
import schema from "@/generated/graphql/schema.json"
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
      schema,
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

            cache
              .inspectFields("Query")
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
          // Note: add and delete wheel entry are only useful for "own" updates (triggered from "own" browser tab),
          // not updates through web socket, which is sent to all clients as long I dont know how to exclude,
          // the one client how triggered the add/delete entry
          addRandomWheelEntry: (
            result: AddRandomWheelEntryMutation,
            args: AddRandomWheelEntryMutationVariables,
            cache
          ) => {
            // console.log("addRandomWheelEntry", { _result, _args: args, _info })

            // const todos = cache.resolve("Query", "todos")
            // cache.link("Query", "todos", [...todos, newTodo])

            cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "randomWheel")
              .forEach((field) => {
                if (field.arguments) {
                  const variables = field.arguments as RandomWheelEntriesQueryVariables
                  const wheel = cache.readQuery({ query: RandomWheelEntriesDocument, variables })
                  console.log("q wheel", wheel)

                  if (wheel?.randomWheel?.id !== args.randomWheelId) {
                    return
                  }

                  cache.updateQuery({ query: RandomWheelEntriesDocument, variables }, (data) => {
                    data?.randomWheel?.entries.push(result.addRandomWheelEntry)
                    return data
                  })

                  // cache.link({ __typename: "RandomWheel", id: wheel?.randomWheel?.id ?? "" }, "entries", [
                  //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  //   ...((wheel?.randomWheel?.entries ?? []) as any),
                  //   _result.addRandomWheelEntry,
                  // ])

                  // const en = cache.resolve(
                  //   { __typename: "RandomWheel", id: wheel?.randomWheel?.id ?? "" },
                  //   "entries",
                  //   field.arguments
                  // )
                  // console.log("en wheel", en)
                }

                // const wk = cache.inspectFields({ __typename: "RandomWheel", id:  })
                // console.log("q wk", field, wk)

                // cache.link({ id: _result.addRandomWheelEntry.id }, "")
              })
          },
          deleteRandomWheelEntry: (_result, args: DeleteRandomWheelEntryMutationVariables, cache) => {
            cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "randomWheel")
              .forEach((field) => {
                if (field.arguments) {
                  const variables = field.arguments as RandomWheelEntriesQueryVariables
                  // const wheel = cache.readQuery({ query: RandomWheelEntriesDocument, variables })
                  // console.log("q wheel2", wheel)

                  cache.updateQuery({ query: RandomWheelEntriesDocument, variables }, (data) => {
                    if (!data?.randomWheel?.entries) {
                      return data
                    }

                    data.randomWheel.entries = data.randomWheel.entries.filter((entry) => entry.id !== args.id)
                    return data
                  })
                }
              })
          },
          spinRandomWheel: (result: SpinRandomWheelMutation, args: SpinRandomWheelMutationVariables, cache) => {
            cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "randomWheel")
              .forEach((field) => {
                if (field.arguments) {
                  const variables = field.arguments as RandomWheelWinnersQueryVariables
                  const query = RandomWheelWinnersDocument

                  const wheel = cache.readQuery({ query, variables })

                  if (wheel?.randomWheel?.id !== args.randomWheelId) {
                    return
                  }

                  cache.updateQuery({ query, variables }, (data) => {
                    data?.randomWheel?.winners.unshift(result.spinRandomWheel)
                    return data
                  })
                }
              })
          },
          deleteChannelReward: (_result, args: DeleteChannelRewardMutationVariables, cache) => {
            // const rewards = cache.resolve({ __typename: "Query" }, "channelRewards", { onlyManageable: false })
            // console.log("cache rewards", { _args, rewards })

            cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "channelRewards")
              .forEach((field) => {
                cache.updateQuery(
                  { query: ChannelRewardsDocument, variables: field.arguments ?? undefined },
                  (data) => ({
                    ...data,
                    channelRewards: data?.channelRewards.filter((r) => r.id !== args.rewardId) ?? [],
                  })
                )
              })
          },
          deleteRewardGroup: (_result, args: DeleteRewardGroupMutationVariables, cache) => {
            cache
              .inspectFields("Query")
              .filter((field) => field.fieldName === "rewardGroups")
              .forEach((field) => {
                cache.updateQuery({ query: RewardGroupsDocument, variables: field.arguments ?? undefined }, (data) => ({
                  ...data,
                  rewardGroups: data?.rewardGroups.filter((r) => r.id !== args.id) ?? [],
                }))
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
