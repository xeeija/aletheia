import { RandomWheelEntry } from "@/generated/graphql"
import { useRandomWheelData } from "@/hooks/randomwheel"
import { socket } from "@/utils/socket"
import { Dispatch, SetStateAction, useEffect } from "react"

export interface RandomWheelSocketOptions {
  disableSocket?: boolean
  token?: string
  onSpinFinished?: (entry: RandomWheelEntry, self: boolean) => void
  onSpinStarted?: (self: boolean) => void
}

export const useRandomWheelSocket = (
  wheelSlug: string | string[] | undefined,
  setSpinning: Dispatch<SetStateAction<boolean>>,
  setRotation: Dispatch<SetStateAction<number | undefined>>,
  setLastWinnerEntry: Dispatch<SetStateAction<RandomWheelEntry | undefined>>,
  options?: RandomWheelSocketOptions | false
) => {
  const token = typeof options === "object" ? options.token : undefined

  const [{ wheel }, { fetchWheel, fetchEntries, fetchWinners }] = useRandomWheelData(wheelSlug, {
    details: true,
    token,
  })

  const disableSocket = options === false || options?.disableSocket

  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return
    }

    socket.connect()

    socket.on("connect", () => {
      socket.emit("wheel:join", wheel.id)
    })

    return () => {
      socket.off("connect")
      socket.disconnect()
    }
  }, [wheel?.id, disableSocket])

  // handle web socket
  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return
    }

    // TODD: make listener functions named, so they can be removed specifically?
    // actually bad currently, because socket.off("foo") removes all listeners for this event (also possibly in other components)
    socket.on("wheel:spin", ({ rotation, entry /*winner*/ }) => {
      const revolutions = ~~(Math.random() * 2 + wheel.spinDuration / 1000 - 1)
      setSpinning(true)
      setRotation(rotation + 360 * revolutions)

      options?.onSpinStarted?.(false)

      // TODO: Refactor to update the "local" winners with winner from socket?
      fetchWinners({ requestPolicy: "cache-and-network" })

      setTimeout(
        () => {
          setSpinning(false)
          setRotation(rotation)
          setLastWinnerEntry(entry)
          options?.onSpinFinished?.(entry, false)
        },
        wheel.spinDuration + 500 + 20
      )
    })

    return () => {
      socket.off("wheel:spin")
    }
  }, [
    wheel?.id,
    wheel?.spinDuration,
    setSpinning,
    setRotation,
    setLastWinnerEntry,
    fetchWinners,
    options,
    disableSocket,
  ])

  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return
    }

    socket.on("wheel:entries", () => {
      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      fetchEntries({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:entries")
    }
  }, [wheel?.id, disableSocket, fetchEntries])

  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return
    }

    socket.on("wheel:update", () => {
      fetchWheel({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:update")
    }
  }, [wheel?.id, disableSocket, fetchWheel])
}
