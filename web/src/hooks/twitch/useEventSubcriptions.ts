import { EventSubscriptionFragment, useDeleteEntriesRedemptionSyncMutation, useEventSubscriptionsForWheelQuery, usePauseEntriesRedemptionSyncMutation, useSyncEntriesWithRedemptionMutation } from "../../generated/graphql"

export const useEventSubscriptionsWheel = (config: {
  randomWheelId: string,
  fetchSubscriptions?: boolean
}) => {

  const [{ data, fetching, error }, refetch] = useEventSubscriptionsForWheelQuery({
    variables: {
      randomWheelId: config.randomWheelId
    },
    pause: config.fetchSubscriptions === false
  })

  const [{ fetching: fetchingSync, error: errorSync }, syncEntries] = useSyncEntriesWithRedemptionMutation()
  const [{ fetching: fetchingPause, error: errorPause }, pauseEntriesSync] = usePauseEntriesRedemptionSyncMutation()
  const [{ fetching: fetchingDelete, error: errorDelete }, deleteEntriesSync] = useDeleteEntriesRedemptionSyncMutation()

  return {
    subscriptions: <EventSubscriptionFragment[] | undefined>data?.eventSubscriptionsForWheel,
    fetching,
    fetchingSync,
    fetchingPause,
    fetchingDelete,
    error,
    errorSync,
    errorPause,
    errorDelete,
    syncEntries: async (rewardId: string) => {
      await syncEntries({ rewardId, randomWheelId: config.randomWheelId }, {
        additionalTypenames: ["EventSubscription"]
      })
      refetch({ requestPolicy: "cache-and-network" })
    },
    pauseEntriesSync: (id: string, pause: boolean) => pauseEntriesSync({ id, pause }, {
      additionalTypenames: ["EventSubscription"]
    }),
    deleteEntriesSync: (ids: string | string[]) => deleteEntriesSync({ ids }, {
      additionalTypenames: ["EventSubscription"]
    }),
  }
}