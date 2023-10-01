import { PrismaClient } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { SocketServer, SubscriptionType } from "../../types"
import { activeSubscriptions } from "../eventsub"

export const addSubscriptionRedemptionAdd = (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: {
    twitchUserId: string,
    rewardId: string,
    randomWheelId: string,
    useInput: boolean,
    id?: string,
  }) => {
  const addedSubscription = eventSub.onChannelRedemptionAddForReward(subConfig.twitchUserId, subConfig.rewardId, async (event) => {
    console.log(`[eventsub] received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`)

    if (event.status === "unfulfilled") {
      await prisma.randomWheelEntry.create({
        data: {
          name: subConfig.useInput ? (event.input || event.userDisplayName) : event.userDisplayName,
          randomWheelId: subConfig.randomWheelId
        }
      })

      socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
    }
  })

  const id = subConfig.id ?? crypto.randomUUID()

  activeSubscriptions.set(id, addedSubscription)

  // if (showEventSubDebug) {
  //   addedSubscription.getCliTestCommand().then((command) => console.log("CLI", command))
  // }

  return id
}

export const findSubscriptionRedemptionAdd = async (apiClient: ApiClient, userId: string, rewardId: string) => {
  const helixSubs = await apiClient.eventSub.getSubscriptionsForType(SubscriptionType.redemptionAdd)

  return helixSubs.data.find((sub) =>
    (sub.status === "enabled" || sub.status === "webhook_callback_verification_pending") &&
    sub.condition.broadcaster_user_id === userId &&
    sub.condition.reward_id === rewardId
  )
}

export const deleteSubscriptionRedemptionAdd = async (apiClient: ApiClient, prisma: PrismaClient, id: string, skipDelete?: boolean) => {
  const sub = await prisma.eventSubscription.findUnique({
    where: { id },
  })

  if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
    console.warn(`delete redemptionAdd: invalid ID ${id}: a required related ID is undefined`, !!sub?.twitchUserId, !!sub?.rewardId, !!sub?.randomWheelId)
    return false
  }

  const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

  if (helixSub) {
    activeSubscriptions.get(sub.id)?.stop()
    activeSubscriptions.delete(sub.id)
    await apiClient.eventSub.deleteSubscription(helixSub.id)

  }

  if (!skipDelete) {
    await prisma.eventSubscription.delete({
      where: { id }
    })
  }

  return sub
}
