import { RewardGroupFragment, useRewardGroupQuery, useRewardGroupsQuery } from "@/generated/graphql"
import { useRewardGroupsActions, useRewardGroupSocket, useUrqlContextCookies } from "@/hooks"

type RewardGroupsConfig = {
  groups?: boolean
  items?: boolean
  id?: string
  socket?: boolean
}

export const useRewardGroups = (config?: RewardGroupsConfig) => {
  // Socket
  const { pausedGroups } = useRewardGroupSocket(!config?.socket)

  // Reward Groups
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetchRewardGroups] = useRewardGroupsQuery({
    variables: {
      items: config?.items ?? true,
    },
    pause: !config?.groups || !!config?.id,
    context,
  })

  const groupsWithoutDate = config?.socket
    ? data?.rewardGroups.map((group) => {
        const paused = pausedGroups.find((g) => g.id === group.id) ?? group
        return {
          ...group,
          cooldownExpiry: paused.cooldownExpiry,
        }
      })
    : (data?.rewardGroups as RewardGroupFragment[] | undefined)

  const rewardGroups = groupsWithoutDate?.map((group) => ({
    ...group,
    cooldownExpiry: new Date(group.cooldownExpiry ?? ""),
  }))

  // Single Reward Group

  const [{ data: dataGroup, fetching: fetchingGroup, error: errorGroup }, refetchRewardGroup] = useRewardGroupQuery({
    variables: {
      id: config?.id ?? "",
    },
    pause: !config?.id,
    context,
  })

  const rewardGroup = config?.socket
    ? pausedGroups.find((g) => g.id === dataGroup?.rewardGroup.id) ?? dataGroup?.rewardGroup
    : (dataGroup?.rewardGroup as RewardGroupFragment | undefined)

  const actions = useRewardGroupsActions()

  return {
    rewardGroups,
    fetching,
    error,
    rewardGroup,
    fetchingGroup,
    errorGroup,
    refetch: () => refetchRewardGroups({ requestPolicy: "cache-and-network" }),
    refetchGroup: () => refetchRewardGroup({ requestPolicy: "cache-and-network" }),
    ...actions,
  }
}
