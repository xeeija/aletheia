import { RewardGroupFragment } from "@/generated/graphql"
import { SocketSetupFn, useSocket } from "@/hooks"
import { useCallback, useEffect, useState } from "react"

export const useRewardGroupSocket = (disable?: boolean) => {
  const setup = useCallback<SocketSetupFn>(
    (socket) => {
      if (disable) {
        return
      }

      socket.on("connect", () => {
        socket.emit("rewardgroup:join")
      })
    },
    [disable]
  )

  const socket = useSocket(setup)

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
