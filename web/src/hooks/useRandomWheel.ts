import { useEffect, useState } from "react"
import {
  useRandomWheelBySlugQuery,
  useRandomWheelBySlugWinnersQuery,
  useRandomWheelBySlugEntriesQuery,
  useSpinRandomWheelMutation,
  useDeleteRandomWheelEntryMutation,
  useClearRandomWheelMutation,
  useDeleteRandomWheelMutation,
  useLikeRandomWheelMutation,
  RandomWheelDetailsFragment,
  RandomWheelEntryFragment,
  RandomWheelWinnerFragment,
  RandomWheelEntry,
  UserNameFragment
} from "../generated/graphql"
import { socket } from "../utils/socket"
import { useAuth } from "./useAuth"

type RandomWheelDetailsFull = RandomWheelDetailsQuery & {
  spinning: boolean
  viewable: boolean
}

type RandomWheelDetailsQuery = RandomWheelDetailsFragment & {
  owner: UserNameFragment
  members: {
    userId: string
    roleName: string
  }[]
}

interface RandomWheelData {
  wheel?: RandomWheelDetailsFull,
  entries?: RandomWheelEntryFragment[],
  winners?: RandomWheelWinnerFragment[],
  fetching: {
    wheel: boolean,
    entries: boolean,
    winners: boolean,
  }
}

interface RandomWheelHandlers {
  spin: () => Promise<void>,
  like: () => Promise<void>,
  clear: () => Promise<void>,
  deleteWheel: () => Promise<void>,
  deleteEntry: (entryId: string) => Promise<void>,
}

interface RandomWheelOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  disableSocket?: boolean
  onSpinFinished?: (self: boolean, entry: RandomWheelEntry) => void
  onSpinStarted?: (self: boolean) => void
}

export const useRandomWheel = (wheelSlug: string | string[], options?: RandomWheelOptions) => {

  // TODO: Split up each handler function in its own custom hook
  // TODO: Split up socket useEffect in one for each event?
  // TODO: Maybe return a boolean or Error (message + code) from some mutation wrappers/handlers, like deleteWheel

  const slug = typeof wheelSlug === "string" ? wheelSlug : wheelSlug?.[0] ?? ""

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: { slug },
    pause: !options?.details
  })
  const wheel = <RandomWheelDetailsQuery | undefined>wheelData?.randomWheelBySlug

  const [{ data: entriesData, fetching: fetchingEntries }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: { slug },
    pause: !options?.entries,
  })
  const entries = <RandomWheelEntryFragment[] | undefined>entriesData?.randomWheelBySlug?.entries

  const [{ data: winnersData, fetching: fetchingWinners }, fetchWinners] = useRandomWheelBySlugWinnersQuery({
    variables: { slug },
    pause: !options?.winners,
  })
  const winners = <RandomWheelWinnerFragment[]>winnersData?.randomWheelBySlug?.winners

  const { user } = useAuth()
  const viewable = wheel?.accessType === "PUBLIC"
    || wheel?.owner === null
    || wheel?.owner?.id === user?.id
    || wheel?.members.some(member => member.userId === user?.id)

  const [, deleteEntry] = useDeleteRandomWheelEntryMutation()
  const deleteEntryHandler = async (entryId: string) => {
    const { data } = await deleteEntry({ id: entryId }, {
      additionalTypenames: ["RandomWheelEntry"]
    })

    if (!data?.deleteRandomWheelEntry) {
      // TODO: Error
    }
  }

  const [, clearRandomWheel] = useClearRandomWheelMutation()
  const clearHandler = async () => {
    if (!wheel) {
      return
    }

    const { data } = await clearRandomWheel({
      id: wheel?.id
    })

    console.log(`deleted ${data?.clearRandomWheel} entries`)
  }

  const [, deleteRandomWheel] = useDeleteRandomWheelMutation()
  const deleteWheelHandler = async () => {
    if (!wheel) {
      return
    }

    const { data } = await deleteRandomWheel({
      id: wheel?.id
    })

    // TODO: Proper error handling, or return an error from this function
    if (data?.deleteRandomWheel !== null) {
      console.log("delete error", data?.deleteRandomWheel)
    }
  }

  const [, likeRandomWheel] = useLikeRandomWheelMutation()
  const [wheelLiked, setWheelLiked] = useState(false)
  useEffect(() => {
    setWheelLiked(wheel?.liked ?? false)
  }, [wheel?.liked])

  const likeHandler = async () => {
    if (!wheel) {
      return
    }
    setWheelLiked(!wheelLiked)
    const likeResponse = await likeRandomWheel({
      randomWheelId: wheel.id,
      like: !wheelLiked
    })
    // TODO: Error when undefined?
    setWheelLiked(Boolean(likeResponse.data?.likeRandomWheel))
  }

  const [wheelRotation, setWheelRotation] = useState<number | null>(null)

  const [, spinRandomWheel] = useSpinRandomWheelMutation()
  const [spinning, setSpinning] = useState(false)
  const spinHandler = async () => {
    if (!wheel) {
      console.log("no wheel to spin")
      return
    }

    if (spinning) {
      console.log("already spinning")
      return
    }

    const { data, error } = await spinRandomWheel({
      wheelId: wheel?.id
    })

    if (!data) {
      // error handling
      console.warn(error)
      return
    }

    setTimeout(() => {
      // TODO: onSpinFinished actually not needed here? 
      // options?.onSpinFinished?.(true, data.spinRandomWheel)
      // setWinnerDialogOpen(true)
    }, wheel.spinDuration + 500 + 10)

  }

  useEffect(() => {
    if (!wheel?.id || options?.disableSocket) {
      return
    }

    console.log("connect socket")
    socket.connect()

    socket.on("connect", () => {
      socket.emit("wheel:join", wheel.id)
      console.log("wheel:join")
    })

    return () => {
      console.log("disconnect socket")
      socket.off("connect")
      socket.disconnect()
    }
  }, [wheel?.id, options?.disableSocket])

  // handle web socket
  useEffect(() => {
    if (!wheel?.id || options?.disableSocket) {
      // console.log("no wheel")
      return
    }

    // TODD: make listener functions named, so they can be removed specifically?
    // actually bad currently, because socket.off("foo") removes all listeners for this event (also possibly in other components)
    socket.on("wheel:spin", ({ rotation, entry, /*winner*/ }) => {
      console.log("wheel:spin")

      const revolutions = ~~(Math.random() * 2 + (wheel.spinDuration / 1000) - 1)
      setSpinning(true)
      setWheelRotation(rotation + (360 * revolutions))

      options?.onSpinStarted?.(false)

      // TODO: Refactor to update the "local" winners with winner from socket?
      fetchWinners({ requestPolicy: "cache-and-network" })

      setTimeout(() => {
        console.log("wheel:spin finish")
        setSpinning(false)
        setWheelRotation(rotation)
        options?.onSpinFinished?.(false, entry)
      }, wheel.spinDuration + 500 + 20)

    })

    socket.on("wheel:entries", () => {
      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      console.log("wheel:entries")
      fetchEntries({
        requestPolicy: "cache-and-network",
      })
    })

    socket.on("wheel:update", () => {
      console.log("wheel:update")
      fetchWheel({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:spin")
      socket.off("wheel:entries")
      socket.off("wheel:update")
    }
  }, [wheel?.id, wheel?.spinDuration, wheel?.editable, wheel?.editAnonymous, fetchEntries, fetchWinners, fetchWheel, options])

  return [
    <RandomWheelData>{
      wheel: wheel ? {
        ...wheel,
        liked: wheelLiked,
        spinning: spinning,
        rotation: wheelRotation ?? wheel.rotation,
        viewable: viewable,
      } : undefined,
      entries: entries,
      winners: winners,
      fetching: {
        wheel: fetchingWheel,
        entries: fetchingEntries,
        winners: fetchingWinners,
      },
    },
    <RandomWheelHandlers>{
      spin: spinHandler,
      like: likeHandler,
      clear: clearHandler,
      deleteWheel: deleteWheelHandler,
      deleteEntry: deleteEntryHandler,
    },
    // {
    //   fetchWheel: fetchWheel,
    //   fetchEntries: fetchEntries,
    //   fetchWinners: fetchWinners,
    // }
  ] as const
}
