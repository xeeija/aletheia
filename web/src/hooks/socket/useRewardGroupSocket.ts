import { RewardGroupFragment } from "@/generated/graphql"
import { useSocket } from "@/hooks"
import { useEffect, useState } from "react"

export const useRewardGroupSocket = (disable?: boolean) => {
  const socket = useSocket({
    disableSocket: disable,
    onConnect: (socket) => {
      socket.emit("rewardgroup:join")
    },
  })

  const [pausedGroups, setPausedGroups] = useState<RewardGroupFragment[]>([])

  useEffect(() => {
    if (disable) {
      return
    }

    socket.on("rewardgroup:pause", (updatedGroups, paused) => {
      // console.log("reward group pause", updatedGroups, paused)

      if (paused) {
        setPausedGroups((groups) => [...groups, ...updatedGroups])
      } else {
        setPausedGroups((groups) => groups.filter((group) => updatedGroups.some((g) => g.id === group.id)))
      }
    })

    // either fetch group (or all groups) new,
    // or update the groups in useRewardGroups with info from pausedGroups

    return () => {
      socket.off("rewardgroup:pause")
    }
  }, [socket, disable])

  return {
    pausedGroups,
  }
}
