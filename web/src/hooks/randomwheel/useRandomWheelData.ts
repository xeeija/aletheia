import { Dispatch, SetStateAction } from "react"
import { OperationContext } from "urql"
import {
  RandomWheelDetailsFragment,
  RandomWheelEntry,
  RandomWheelEntryFragment,
  RandomWheelWinnerFragment,
  useRandomWheelBySlugEntriesQuery,
  useRandomWheelBySlugQuery,
  useRandomWheelBySlugWinnersQuery,
  UserNameFragment
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
  viewable: boolean,
  spinning: boolean,
}

export interface RandomWheelData {
  wheel?: RandomWheelDetails,
  entries?: RandomWheelEntryFragment[],
  winners?: RandomWheelWinnerFragment[],
  fetching: {
    wheel: boolean,
    entries: boolean,
    winners: boolean,
  },
  lastWinnerEntry?: RandomWheelEntry,
}

type FetchFunction = (opts?: Partial<OperationContext> | undefined) => void

interface RandomWheelFetch {
  fetchWheel: FetchFunction,
  fetchEntries: FetchFunction,
  fetchWinners: FetchFunction,
  setSpinning: Dispatch<SetStateAction<boolean>>,
  setRotation: Dispatch<SetStateAction<number | undefined>>,
  setLastWinnerEntry: Dispatch<SetStateAction<RandomWheelEntry | undefined>>,
}

interface DataOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  fetchOnly?: boolean
}

export const useRandomWheelData = (wheelSlug: string | string[] | undefined, options?: DataOptions) => {
  const slug = typeof wheelSlug === "string" ? wheelSlug : wheelSlug?.[0] ?? ""

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: { slug },
    pause: !options?.details || options.fetchOnly
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
  const winners = <RandomWheelWinnerFragment[]>winnersData?.randomWheelBySlug?.winners

  const { user } = useAuth()
  const viewable = wheel?.accessType === "PUBLIC"
    || wheel?.owner === null
    || wheel?.owner?.id === user?.id
    || wheel?.members.some(member => member.userId === user?.id)

  return [
    <RandomWheelData>{
      wheel: wheel ? {
        ...wheel,
        viewable,
      } : undefined,
      entries: entries,
      winners: winners,
      fetching: {
        wheel: fetchingWheel,
        entries: fetchingEntries,
        winners: fetchingWinners,
      },
      // lastWinnerEntry,
    },
    <RandomWheelFetch>{
      fetchWheel,
      fetchEntries,
      fetchWinners,
    },
  ] as const
}
