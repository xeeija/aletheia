import { RandomWheelSocketOptions, useRandomWheelSocket } from "@/hooks"
import {
  RandomWheelActions,
  RandomWheelData,
  RandomWheelFetch,
  useRandomWheelActions,
  useRandomWheelData,
  useRandomWheelLike,
  useRandomWheelSpin,
} from "@/hooks/randomwheel"
import { useEffect, useMemo, useState } from "react"

interface RandomWheelHandlers extends RandomWheelActions, RandomWheelFetch {
  spin: () => Promise<void>
  like: () => Promise<void>
}

interface RandomWheelOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  members?: boolean
  socket?: RandomWheelSocketOptions
  fetchOnly?: boolean
  token?: string
}

export const useRandomWheel = (wheelSlug: string | string[], options?: RandomWheelOptions) => {
  // TODO: Maybe return a boolean or Error (message + code) from some mutation wrappers/handlers, like deleteWheel

  const [{ id, wheel, ...randomWheelData }, randomWheelFetch] = useRandomWheelData(wheelSlug, {
    details: options?.details,
    entries: options?.entries,
    winners: options?.winners,
    members: options?.members,
    token: options?.token,
    fetchOnly: options?.fetchOnly,
  })

  // TODO FIX: without options.details the actions dont work, because wheel.id is undefined
  const randomWheelActions = useRandomWheelActions(id)

  const [liked, setLiked] = useState(wheel?.liked)
  useEffect(() => {
    setLiked(wheel?.liked)
  }, [wheel?.liked])

  const like = useRandomWheelLike(id, liked, setLiked)

  const socketOptions = useMemo<RandomWheelSocketOptions>(
    () => ({
      ...options?.socket,
      token: options?.socket?.token || options?.token,
    }),
    [options?.socket, options?.token]
  )

  const { rotation, spinning, lastWinnerEntry, isConnected } = useRandomWheelSocket(wheelSlug, socketOptions)

  // TODO: onSpinFinished actually not in like here? - or only through incoming websocket spin event?
  const spin = useRandomWheelSpin(id, spinning)

  return [
    {
      ...randomWheelData,
      id,
      wheel: wheel
        ? {
            ...wheel,
            rotation: rotation ?? wheel?.rotation,
            spinning,
            liked: liked ?? wheel?.liked ?? false,
          }
        : undefined,
      lastWinnerEntry,
      isConnected,
    } as RandomWheelData,
    {
      ...randomWheelActions,
      ...randomWheelFetch,
      spin: spin,
      like: like,
    } as RandomWheelHandlers,
  ] as const
}
