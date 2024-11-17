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
} from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"
import { useAuth } from "@/hooks/useAuth"
import { OperationContext } from "urql"

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

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: { slug, token: options?.token },
    pause: !options?.details || options.fetchOnly,
    // requestPolicy: "cache-and-network",
    context,
  })
  const wheel = wheelData?.randomWheelBySlug as RandomWheelDetailsQuery | undefined

  // const [{ data: shareTokenData, fetching: fetchingShareToken }, fetchShareToken] = useRandomWheelBySlugShareTokenQuery({
  //   variables: { slug, token: options?.token },
  //   pause: !options?.details || options.fetchOnly,
  // })
  // const shareToken = shareTokenData?.randomWheelBySlug?.shareToken

  const [{ data: entriesData, fetching: fetchingEntries }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: { slug, token: options?.token },
    pause: !options?.entries || options.fetchOnly,
    // requestPolicy: "cache-and-network",
    context,
  })
  const entries = entriesData?.randomWheelBySlug?.entries as RandomWheelEntryFragment[] | undefined

  const [{ data: winnersData, fetching: fetchingWinners }, fetchWinners] = useRandomWheelBySlugWinnersQuery({
    variables: { slug, token: options?.token },
    pause: !options?.winners || options.fetchOnly,
    context,
  })
  const winners = winnersData?.randomWheelBySlug?.winners as RandomWheelWinnerFragment[] | undefined

  const [{ data: membersData, fetching: fetchingMembers }, fetchMembers] = useRandomWheelBySlugMembersQuery({
    variables: { slug, token: options?.token },
    pause: !options?.members || options.fetchOnly,
    context,
  })
  const members = membersData?.randomWheelBySlug?.members as RandomWheelMemberFragment[] | undefined

  const id = wheel?.id ?? (entriesData ?? winnersData ?? membersData)?.randomWheelBySlug?.id

  const { user } = useAuth()
  const viewable =
    wheel?.accessType === "PUBLIC" ||
    wheel?.owner === null ||
    wheel?.owner?.id === user?.id ||
    wheel?.members.some((member) => member.userId === user?.id) ||
    wheel?.shareToken === options?.token

  return [
    {
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
    } as RandomWheelData,
    {
      fetchWheel,
      fetchEntries,
      fetchWinners,
      fetchMembers,
    } as RandomWheelFetch,
  ] as const
}
