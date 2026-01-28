import { useLikeRandomWheelMutation } from "@/generated/graphql"
import { useAlert } from "@/hooks"
import { useCallback, useEffect, useState } from "react"

export const useRandomWheelLike = (wheelId: string | undefined, wheelLiked: boolean | undefined) => {
  const [liked, setLiked] = useState(wheelLiked)
  useEffect(() => {
    setLiked(wheelLiked)
  }, [wheelLiked])

  const [, likeRandomWheel] = useLikeRandomWheelMutation()
  const { showError } = useAlert()

  const like = useCallback(async () => {
    if (!wheelId) {
      return
    }
    setLiked(!liked)
    const { data, error } = await likeRandomWheel(
      {
        randomWheelId: wheelId,
        like: !liked,
      },
      {
        // requestPolicy: "cache-and-network",
        additionalTypenames: ["RandomWheel"],
      }
    )

    if (error) {
      showError(error.message)
    }

    // TODO: Error when undefined?
    setLiked(Boolean(data?.likeRandomWheel))
  }, [likeRandomWheel, liked, showError, wheelId])

  return [liked, like] as const
}
