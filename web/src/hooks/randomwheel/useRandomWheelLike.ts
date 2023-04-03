import { Dispatch, SetStateAction } from "react"
import { useLikeRandomWheelMutation } from "../../generated/graphql"

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
    const likeResponse = await likeRandomWheel({
      randomWheelId: wheelId,
      like: !liked
    })
    // TODO: Error when undefined?
    setLiked(Boolean(likeResponse.data?.likeRandomWheel))
  }

  return like
}
