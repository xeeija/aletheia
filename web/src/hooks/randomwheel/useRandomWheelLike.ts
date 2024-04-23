import { useLikeRandomWheelMutation } from "@/generated/graphql"
import { useAlert } from "@/hooks"
import { Dispatch, SetStateAction } from "react"

export const useRandomWheelLike = (
  wheelId: string | undefined,
  liked: boolean | undefined,
  setLiked: Dispatch<SetStateAction<boolean | undefined>>
) => {
  const [, likeRandomWheel] = useLikeRandomWheelMutation()
  const { showError } = useAlert()

  const like = async () => {
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
  }

  return like
}
