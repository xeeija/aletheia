import type { RandomWheelEntryFragment, RandomWheelFragment } from "@/generated/graphql"
import { RandomWheelSocketOptions, useRandomWheelSocket } from "@/hooks"
import {
  RandomWheelActions,
  RandomWheelData,
  RandomWheelDetails,
  RandomWheelFetch,
  useRandomWheelActions,
  useRandomWheelData,
  useRandomWheelLike,
  useRandomWheelSpin,
} from "@/hooks/randomwheel"
import { useMemo } from "react"

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
  initialWheel?: RandomWheelFragment
  initialEntries?: RandomWheelEntryFragment[]
  id?: string
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
    initialWheel: options?.initialWheel,
    initialEntries: options?.initialEntries,
    id: options?.id ?? options?.initialWheel?.id,
  })

  // const wheel = useMemo(() => wheelClient ?? options?.initialWheel, [wheelClient, options?.initialWheel])

  // TODO FIX: without options.details the actions dont work, because wheel.id is undefined
  const randomWheelActions = useRandomWheelActions(id)

  const [liked, like] = useRandomWheelLike(id, wheel?.liked)

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

  const wheelExtended = useMemo<RandomWheelDetails | undefined>(
    () =>
      wheel
        ? {
            ...wheel,
            rotation: rotation ?? wheel?.rotation,
            spinning,
            liked: liked ?? wheel?.liked ?? false,
          }
        : undefined,
    [wheel, rotation, spinning, liked]
  )

  return [
    {
      ...randomWheelData,
      id,
      wheel: wheelExtended,
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
