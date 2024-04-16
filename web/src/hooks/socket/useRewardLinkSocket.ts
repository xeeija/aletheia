import { useSocket } from "@/hooks"
import { useEffect } from "react"

// rewardData?: CustomRewardMenuItemFragment,
export const useRewardLinkSocket = (token: string, disable?: boolean, fn?: () => void) => {
  const socket = useSocket({
    disableSocket: disable,
    onConnect: (socket) => {
      socket.emit("rewardlink:join", token)
    },
  })

  // const [reward, setReward] = useState(rewardData)
  // useEffect(() => {
  //   console.log("reward update from component", rewardData)
  //   // setReward(rewardData)
  // }, [rewardData])

  useEffect(() => {
    if (disable) {
      return
    }

    socket.on("reward:update", () => {
      fn?.()

      // if (updatedRewardData) {
      //   // setReward(updatedRewardData)
      // }
    })

    return () => {
      socket.off("reward:update")
    }
  }, [socket, disable, fn])

  // return reward
}
