import { RandomWheelEntry, type RandomWheelWinner } from "@/generated/graphql"
import { useRandomWheelData } from "@/hooks/randomwheel"
import type { RandomWheelDetailsSpin, SpinResult } from "@/types"
import { socket } from "@/utils/socket"
import { useEffect, useState } from "react"

export interface RandomWheelSocketOptions {
  disableSocket?: boolean
  enabled?: boolean
  token?: string
  onSpinFinished?: SpinFinishedFn
  onSpinStarted?: (self: boolean) => void
}

export type SpinFinishedFn = (options: {
  entry: RandomWheelEntry
  winner: RandomWheelWinner
  wheel: RandomWheelDetailsSpin
  self: boolean
}) => void

export const useRandomWheelSocket = (wheelSlug: string | string[] | undefined, options?: RandomWheelSocketOptions) => {
  const token = options?.token

  const [{ wheel }, { fetchWheel, fetchEntries }] = useRandomWheelData(wheelSlug, {
    details: true,
    token,
  })

  const [rotation, setRotation] = useState<number>()
  const [spinning, setSpinning] = useState(false)
  const [lastWinnerEntry, setLastWinnerEntry] = useState<RandomWheelEntry>()

  const [isConnected, setIsConnected] = useState(false)

  const disableSocket = !options?.enabled || options?.disableSocket

  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return () => {}
    }

    const onConnect = () => {
      // console.log("socket:connect")
      setIsConnected(true)

      socket.emit("wheel:join", wheel.id)
    }

    const onDisconnect = () => {
      // console.log("socket:disconnect")

      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    socket.connect()

    return () => {
      // console.log("socket:off effect")
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)

      socket.disconnect()
    }
  }, [wheel?.id, disableSocket])

  // handle web socket
  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return () => {}
    }
    // console.log("socket wheel:spin on")

    const onWheelSpin = ({ wheel, entry, winner }: SpinResult) => {
      // console.log("socket wheel:spin", { wheel, entry, winner, options })
      const revolutions = ~~(Math.random() * 2 + wheel.spinDuration / 1000 - 1)
      setSpinning(true)
      setRotation(wheel.rotation + 360 * revolutions)

      options?.onSpinStarted?.(false)

      setTimeout(
        () => {
          setSpinning(false)
          setRotation(wheel.rotation)
          setLastWinnerEntry(entry)
          options?.onSpinFinished?.({ entry, winner, wheel, self: false })

          // TODO: update urql cache
        },
        wheel.spinDuration + 500 + 20
      )
    }

    socket.on("wheel:spin", onWheelSpin)

    return () => {
      // console.log("socket wheel:spin off")
      socket.off("wheel:spin", onWheelSpin)
    }
  }, [
    wheel?.id,
    options,
    disableSocket,
    // isConnected,
  ])

  useEffect(() => {
    if (!wheel?.id || disableSocket) {
      return
    }

    socket.on("wheel:entries", () => {
      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      // Does it actually work, because updating cache is only possible in the graphcache config
      fetchEntries({ requestPolicy: "cache-and-network" })
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
      fetchWheel({ requestPolicy: "cache-and-network" })
    })

    return () => {
      socket.off("wheel:update")
    }
  }, [wheel?.id, disableSocket, fetchWheel])

  return {
    isConnected,
    rotation,
    spinning,
    lastWinnerEntry,
  }
}
