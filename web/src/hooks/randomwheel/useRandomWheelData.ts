import { OperationContext } from "urql"
import {
  RandomWheelDetailsFragment,
  RandomWheelEntry,
  RandomWheelEntryFragment,
  RandomWheelMemberFragment,
  RandomWheelWinnerFragment,
  useRandomWheelBySlugEntriesQuery,
  useRandomWheelBySlugMembersQuery,
  useRandomWheelBySlugQuery,
  useRandomWheelBySlugWinnersQuery,
  UserNameFragment,
} from "../../generated/graphql"
import { useAuth } from "../useAuth"

export interface RandomWheelDetailsQuery extends RandomWheelDetailsFragment {
  owner: UserNameFragment
  members: {
    userId: string
    roleName: string
  }[]
}

export interface RandomWheelDetails extends RandomWheelDetailsQuery {
  viewable: boolean
  spinning: boolean
}

export interface RandomWheelData {
  id?: string
  wheel?: RandomWheelDetails
  entries?: RandomWheelEntryFragment[]
  winners?: RandomWheelWinnerFragment[]
  members?: RandomWheelMemberFragment[]
  fetching: {
    wheel: boolean
    entries: boolean
    winners: boolean
    members: boolean
  }
  lastWinnerEntry?: RandomWheelEntry
}

type FetchFunction = (opts?: Partial<OperationContext> | undefined) => void

export interface RandomWheelFetch {
  fetchWheel: FetchFunction
  fetchEntries: FetchFunction
  fetchWinners: FetchFunction
  fetchMembers: FetchFunction
}

interface DataOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  members?: boolean
  fetchOnly?: boolean
}

export const useRandomWheelData = (wheelSlug: string | string[] | undefined, options?: DataOptions) => {
  const slug = typeof wheelSlug === "string" ? wheelSlug : wheelSlug?.[0] ?? ""

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: { slug },
    pause: !options?.details || options.fetchOnly,
  })
  const wheel = <RandomWheelDetailsQuery | undefined>wheelData?.randomWheelBySlug

  const [{ data: entriesData, fetching: fetchingEntries }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: { slug },
    pause: !options?.entries || options.fetchOnly,
  })
  const entries = <RandomWheelEntryFragment[] | undefined>entriesData?.randomWheelBySlug?.entries

  const [{ data: winnersData, fetching: fetchingWinners }, fetchWinners] = useRandomWheelBySlugWinnersQuery({
    variables: { slug },
    pause: !options?.winners || options.fetchOnly,
  })
  const winners = <RandomWheelWinnerFragment[] | undefined>winnersData?.randomWheelBySlug?.winners

  const [{ data: membersData, fetching: fetchingMembers }, fetchMembers] = useRandomWheelBySlugMembersQuery({
    variables: { slug },
    pause: !options?.members || options.fetchOnly,
  })
  const members = <RandomWheelMemberFragment[] | undefined>membersData?.randomWheelBySlug?.members

  const id = wheel?.id ?? (entriesData ?? winnersData ?? membersData)?.randomWheelBySlug?.id

  const { user } = useAuth()
  const viewable =
    wheel?.accessType === "PUBLIC" ||
    wheel?.owner === null ||
    wheel?.owner?.id === user?.id ||
    wheel?.members.some((member) => member.userId === user?.id)

  return [
    <RandomWheelData>{
      id,
      wheel: wheel
        ? {
            ...wheel,
            viewable,
          }
        : undefined,
      entries: entries,
      winners: winners,
      members: members,
      fetching: {
        wheel: fetchingWheel,
        entries: fetchingEntries,
        winners: fetchingWinners,
        members: fetchingMembers,
      },
      // lastWinnerEntry,
    },
    <RandomWheelFetch>{
      fetchWheel,
      fetchEntries,
      fetchWinners,
      fetchMembers,
    },
  ] as const
}
