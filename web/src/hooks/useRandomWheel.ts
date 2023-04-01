import { useEffect, useState } from "react"
import { io } from "socket.io-client"
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
  RandomWheelEntry
} from "../generated/graphql"

interface RandomWheelOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  disableSocket?: boolean
  onSpinFinished?: (self: boolean, entry: RandomWheelEntry) => void
  onSpinStarted?: (self: boolean) => void
}

type RandomWheelDetailsFull = RandomWheelDetailsFragment & {
  spinning: boolean
}

interface RandomWheelData { }

export const useRandomWheel = (wheelSlug: string | string[], options?: RandomWheelOptions) => {

  const slug = typeof wheelSlug === "string" ? wheelSlug : wheelSlug?.[0] ?? ""

  const [{ data: wheelData, fetching: fetchingWheel }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: { slug },
    pause: !options?.details
  })
  const wheel = <RandomWheelDetailsFragment | undefined>wheelData?.randomWheelBySlug

  const [{ data: entriesData, fetching: fetchingEntries }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: { slug },
    pause: !options?.entries,
  })
  const entries = <RandomWheelEntryFragment[]>entriesData?.randomWheelBySlug?.entries

  const [{ data: winnersData, fetching: fetchingWinners }, fetchWinners] = useRandomWheelBySlugWinnersQuery({
    variables: { slug },
    pause: !options?.winners,
  })
  const winners = <RandomWheelWinnerFragment[]>winnersData?.randomWheelBySlug?.winners

  const [, spinRandomWheel] = useSpinRandomWheelMutation()
  const [, deleteEntry] = useDeleteRandomWheelEntryMutation()
  const [, clearRandomWheel] = useClearRandomWheelMutation()
  const [, deleteRandomWheel] = useDeleteRandomWheelMutation()
  const [, likeRandomWheel] = useLikeRandomWheelMutation()

  const [wheelLiked, setWheelLiked] = useState(false)
  useEffect(() => {
    setWheelLiked(wheel?.liked ?? false)
  }, [wheel?.liked])

  const [wheelRotation, setWheelRotation] = useState(0)
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
      options?.onSpinFinished?.(true, data.spinRandomWheel, error)
      // setWinnerDialogOpen(true)
    }, wheel.spinDuration + 500 + 10)

  }

  // handle web socket
  useEffect(() => {
    if (!wheel?.id || options?.disableSocket) {
      // console.log("no wheel")
      return
    }

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ?? process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:4000", {
      path: process.env.NEXT_PUBLIC_SOCKET_SERVER_PATH ?? "/socket",
    })

    socket.on("connect", () => {
      // console.log("connect")
      socket.emit("wheel:join", wheel.id)
      // console.log(`join ${wheel.id.substring(0, 6)}`)
    })

    socket.on("wheel:spin", ({ rotation, entry, winner }) => {
      // console.log("wheel:spin", { rotation, winner, entry })

      const revolutions = ~~(Math.random() * 2 + (wheel.spinDuration / 1000) - 1)
      // console.log(revolutions)

      setSpinning(true)
      setWheelRotation(rotation + (360 * revolutions))

      options?.onSpinStarted?.(false)
      // setWinnerDialogOpen(false)

      // TODO: Refactor to update the "local" winners with winner from socket?
      fetchWinners({ requestPolicy: "cache-and-network" })

      setTimeout(() => {
        setSpinning(false)
        setWheelRotation(rotation)

        options?.onSpinFinished?.(false, entry)
        // setLastWinningEntry(entry)

        // if (wheel.editable || wheel.editAnonymous) {
        //   setWinnerDialogOpen(true)
        // }
      }, wheel.spinDuration + 500 + 20)

    })

    socket.on("wheel:entries", () => {
      // console.log("wheel:entries")

      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      fetchEntries({
        requestPolicy: "cache-and-network",
      })
    })

    socket.on("wheel:update", () => {
      // console.log("wheel")

      fetchWheel({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:spin")
      socket.disconnect()
      // console.log(`disconnect ${wheel.id.substring(0, 6)}`)
    }
  }, [wheel?.id, wheel?.spinDuration, wheel?.editable, wheel?.editAnonymous, fetchEntries, fetchWinners, fetchWheel, options])

  return [
    {
      wheel: wheel ? <RandomWheelDetailsFull>{
        ...wheel,
        liked: wheelLiked,
        spinning: spinning,
        rotation: wheelRotation,
      } : undefined,
      entries: entries,
      winners: winners,
      fetching: {
        wheel: fetchingWheel,
        entries: fetchingEntries,
        winners: fetchingWinners,
      },
    },
    {
      spin: spinHandler,
      like: likeRandomWheel,
      clear: clearRandomWheel,
      deleteWheel: deleteRandomWheel,
      deleteEntry: deleteEntry,
      fetchWheel: fetchWheel,
      fetchEntries: fetchEntries,
      fetchWinners: fetchWinners,
    },
  ] as const
}
