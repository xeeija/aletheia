import { SocketSetupFn, useSocket } from "@/hooks"
import { useCallback, useEffect } from "react"

// export type RewardLinkUpdateFn = (reward: CustomRewardMenuItemFragment | undefined) => void

// rewardData?: CustomRewardMenuItemFragment,
// onUpdate?: RewardLinkUpdateFn //(reward: CustomRewardMenuItemFragment | undefined) => void
export const useRewardLinkSocket = (token: string, disable?: boolean, onUpdate?: () => void) => {
  const setup = useCallback<SocketSetupFn>(
    (socket) => {
      if (!token || disable) {
        return
      }

      socket.on("connect", () => {
        socket.emit("rewardlink:join", token)
      })
    },
    [token, disable]
  )

  const socket = useSocket(setup)

  useEffect(() => {
    socket.on("reward:update", () => {
      // onUpdate?.(reward)
      onUpdate?.()
    })

    return () => {
      socket.off("reward:update")
    }
  }, [socket, onUpdate])

  // return reward
}
