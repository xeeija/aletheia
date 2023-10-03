import { useEffect, useState } from "react"
import { RandomWheelEntry } from "../generated/graphql"
import { RandomWheelActions, useRandomWheelActions } from "./randomwheel/useRandomWheelActions"
import { RandomWheelData, RandomWheelFetch, useRandomWheelData } from "./randomwheel/useRandomWheelData"
import { useRandomWheelLike } from "./randomwheel/useRandomWheelLike"
import { RandomWheelSocketOptions, useRandomWheelSocket } from "./randomwheel/useRandomWheelSocket"
import { useRandomWheelSpin } from "./randomwheel/useRandomWheelSpin"

interface RandomWheelHandlers extends RandomWheelActions, RandomWheelFetch {
  spin: () => Promise<void>,
  like: () => Promise<void>,
}

interface RandomWheelOptions {
  details?: boolean
  entries?: boolean
  winners?: boolean
  members?: boolean
  socket?: RandomWheelSocketOptions | false
}

export const useRandomWheel = (wheelSlug: string | string[], options?: RandomWheelOptions) => {

  // TODO: Maybe return a boolean or Error (message + code) from some mutation wrappers/handlers, like deleteWheel

  const [{ id, wheel, ...randomWheelData }, randomWheelFetch] = useRandomWheelData(wheelSlug, {
    details: options?.details,
    entries: options?.entries,
    winners: options?.winners,
    members: options?.members,
  })

  // TODO FIX: without options.details the actions dont work, because wheel.id is undefined
  const randomWheelActions = useRandomWheelActions(id)

  const [lastWinnerEntry, setLastWinnerEntry] = useState<RandomWheelEntry>()

  const [rotation, setRotation] = useState<number>()
  const [spinning, setSpinning] = useState(false)
  // TODO: onSpinFinished actually not in like here? - or only through incoming websocket spin event? 
  const spin = useRandomWheelSpin(id, spinning)

  const [liked, setLiked] = useState(wheel?.liked)
  useEffect(() => {
    setLiked(wheel?.liked)
  }, [wheel?.liked])

  const like = useRandomWheelLike(id, liked, setLiked)

  useRandomWheelSocket(wheelSlug, setSpinning, setRotation, setLastWinnerEntry, options?.socket)

  return [
    <RandomWheelData>{
      ...randomWheelData,
      id,
      wheel: {
        ...wheel,
        rotation: rotation ?? wheel?.rotation,
        spinning,
        liked: liked ?? wheel?.liked ?? false,
      },
      lastWinnerEntry,
    },
    <RandomWheelHandlers>{
      ...randomWheelActions,
      ...randomWheelFetch,
      spin: spin,
      like: like,
    },
  ] as const
}
