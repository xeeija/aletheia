import { activeSubscriptions } from "@/twitch"
import { SubscriptionType, type SocketServer, type SubscriptionConfig } from "@/types"
import { PrismaClient } from "@prisma/client"
import { ApiClient, HelixPaginatedEventSubSubscriptionsResult } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import crypto from "crypto"

export const addSubscriptionRedemptionAdd = (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: SubscriptionConfig
) => {
  const addedSubscription = eventSub.onChannelRedemptionAddForReward(
    subConfig.twitchUserId,
    subConfig.rewardId,
    async (event) => {
      console.log(
        `[eventsub] received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
      )

      if (event.status === "unfulfilled") {
        await prisma.randomWheelEntry.create({
          data: {
            name: subConfig.useInput ? event.input || event.userDisplayName : event.userDisplayName,
            randomWheelId: subConfig.randomWheelId,
          },
        })

        // console.log(`[socket] to wheel/${subConfig.randomWheelId}`)
        socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
      }
    }
  )

  const id = subConfig.id ?? crypto.randomUUID()

  activeSubscriptions.set(id, addedSubscription)

  // if (showEventSubDebug) {
  //   addedSubscription.getCliTestCommand().then((command) => console.log("CLI", command))
  // }

  return id
}

export const findSubscriptionRedemptionAdd = async (
  apiClient: ApiClient,
  userId: string,
  rewardId: string,
  existingResult?: HelixPaginatedEventSubSubscriptionsResult
) => {
  const helixSubs = existingResult ?? (await apiClient.eventSub.getSubscriptionsForType(SubscriptionType.redemptionAdd))

  return helixSubs.data.find(
    (sub) =>
      (sub.status === "enabled" || sub.status === "webhook_callback_verification_pending") &&
      sub.condition.broadcaster_user_id === userId &&
      sub.condition.reward_id === rewardId
  )
}

export const deleteSubscriptionRedemptionAdd = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  id: string,
  skipDelete?: boolean
) => {
  const sub = await prisma.eventSubscription.findUnique({
    where: { id },
  })

  if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
    console.warn(
      `[eventsub] delete redemptionAdd: invalid ID ${id}: a required related ID is undefined`,
      !!sub?.twitchUserId,
      !!sub?.rewardId,
      !!sub?.randomWheelId
    )
    return null
  }

  const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

  if (helixSub) {
    activeSubscriptions.get(sub.id)?.stop()
    // await apiClient.eventSub.deleteSubscription(helixSub.id)

    if (!skipDelete) {
      activeSubscriptions.delete(sub.id)
    }
  }

  if (!skipDelete) {
    await prisma.eventSubscription.delete({
      where: { id },
    })
  }

  return sub
}

export const deleteManySubscriptionRedemptionAdd = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  ids: string[],
  skipDelete?: boolean
) => {
  const subs = await prisma.eventSubscription.findMany({
    where: {
      id: { in: ids },
    },
  })

  const validSubs = subs.filter((s) => s.twitchUserId && s.rewardId && s.randomWheelId)

  if (validSubs.length === 0) {
    console.warn(`[eventsub] delete many redemptionAdd: no valid subscriptions`)
    return false
  }

  const helixSubs = await apiClient.eventSub.getSubscriptionsForType(SubscriptionType.redemptionAdd)

  console.log(`[eventsub] deleting ${validSubs.length} subscriptions`)

  // validSubs.forEach(async (sub) => {
  for (const sub of validSubs) {
    const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId ?? "", helixSubs)

    if (helixSub) {
      // await apiClient.eventSub.deleteSubscription(helixSub.id)
      activeSubscriptions.get(sub.id)?.stop()

      if (!skipDelete) {
        activeSubscriptions.delete(sub.id)
      }
    } else {
      console.log(`[eventsub] found no matching subscription to delete`)
    }
  }

  if (!skipDelete) {
    const deleted = await prisma.eventSubscription.deleteMany({
      where: {
        id: { in: validSubs.map((s) => s.id) },
      },
    })

    console.log(`[eventsub] deleted ${deleted.count} subscriptions`)
  }

  return true
}

export const addExistingRedemptions = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: SubscriptionConfig
) => {
  const redemptions = apiClient.channelPoints.getRedemptionsForBroadcasterPaginated(
    subConfig.twitchUserId,
    subConfig.rewardId,
    "UNFULFILLED",
    {}
  )

  await redemptions.getNext()

  if ((redemptions.current?.length ?? 0) === 0) {
    return
  }

  let redemptionsCount = 0

  console.log(
    `[eventsub] adding existing redemptions of ${redemptions.current?.[0].broadcaster_name} for ${redemptions.current?.[0].reward.title}`
  )

  while (redemptions.current?.length !== 0) {
    await prisma.randomWheelEntry.createMany({
      data: (redemptions.current ?? []).map((r) => ({
        name: subConfig.useInput ? r.user_input || r.user_name : r.user_name,
        randomWheelId: subConfig.randomWheelId,
      })),
    })

    redemptionsCount += redemptions.current?.length ?? 0

    await redemptions.getNext()
  }

  console.log(`[eventsub] added ${redemptionsCount} existing redemptions`)

  socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
}
