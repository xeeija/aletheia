import {
  RandomWheelEntry,
  RandomWheelEntryFragment,
  RandomWheelFragment,
  RandomWheelMemberFragment,
  RandomWheelWinnerFragment,
  useRandomWheelEntriesQuery,
  useRandomWheelMembersQuery,
  useRandomWheelQuery,
  useRandomWheelWinnersQuery,
} from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"
import { OperationContext } from "urql"

// export interface RandomWheelFragmentFull extends RandomWheelFragment, RandomWheelMembersFragment {}
// owner: UserNameFragment
// members: RandomWheelMemberFragment[]

export interface RandomWheelDetails extends RandomWheelFragment {
  // viewable: boolean
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

type FetchFunction = (opts?: Partial<OperationContext>) => void

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
  token?: string
}

export const useRandomWheelData = (wheelSlug: string | string[] | undefined, options?: DataOptions) => {
  const slug = typeof wheelSlug === "string" ? wheelSlug : wheelSlug?.[0] ?? ""

  const context = useUrqlContextCookies()

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelQuery({
    variables: { slug, token: options?.token },
    pause: !options?.details || options.fetchOnly,
    context,
  })
  const wheel = wheelData?.randomWheel as RandomWheelFragment | undefined

  const [{ data: entriesData, fetching: fetchingEntries }, fetchEntries] = useRandomWheelEntriesQuery({
    variables: { slug, token: options?.token },
    pause: !options?.entries || options.fetchOnly,
    context,
  })
  const entries = entriesData?.randomWheel?.entries as RandomWheelEntryFragment[] | undefined

  const [{ data: winnersData, fetching: fetchingWinners }, fetchWinners] = useRandomWheelWinnersQuery({
    variables: { slug, token: options?.token },
    pause: !options?.winners || options.fetchOnly,
    context,
  })
  const winners = winnersData?.randomWheel?.winners as RandomWheelWinnerFragment[] | undefined

  const [{ data: membersData, fetching: fetchingMembers }, fetchMembers] = useRandomWheelMembersQuery({
    variables: { slug, token: options?.token },
    pause: !options?.members || options.fetchOnly,
    context,
  })
  const members = membersData?.randomWheel?.members as RandomWheelMemberFragment[] | undefined

  const id = wheel?.id ?? (entriesData ?? winnersData ?? membersData)?.randomWheel?.id

  const viewable = wheel?.viewable || (wheel?.shareToken && wheel?.shareToken === options?.token)
  // const { user } = useAuth()
  // const viewable =
  //   wheel?.accessType === "PUBLIC" ||
  //   wheel?.owner === null ||
  //   wheel?.owner?.id === user?.id ||
  //   wheel?.members.some((member) => member.userId === user?.id) ||
  //   wheel?.shareToken === options?.token

  return [
    {
      id,
      wheel: wheel ? { ...wheel, viewable } : undefined,
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
    } as RandomWheelData,
    {
      fetchWheel,
      fetchEntries,
      fetchWinners,
      fetchMembers,
    } as RandomWheelFetch,
  ] as const
}
