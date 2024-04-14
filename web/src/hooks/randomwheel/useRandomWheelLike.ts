import { useLikeRandomWheelMutation } from "@/generated/graphql"
import { Dispatch, SetStateAction } from "react"

export const useRandomWheelLike = (
  wheelId: string | undefined,
  liked: boolean | undefined,
  setLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  const [, likeRandomWheel] = useLikeRandomWheelMutation()

  const like = async () => {
    if (!wheelId) {
      return
    }
    setLiked(!liked)
    const likeResponse = await likeRandomWheel(
      {
        randomWheelId: wheelId,
        like: !liked,
      },
      {
        // requestPolicy: "cache-and-network",
        additionalTypenames: ["RandomWheel"],
      }
    )
    // TODO: Error when undefined?
    setLiked(Boolean(likeResponse.data?.likeRandomWheel))
  }

  return like
}
