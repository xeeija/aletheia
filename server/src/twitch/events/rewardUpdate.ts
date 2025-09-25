import { PrismaClient } from "@/generated/prisma/client.js"
import { activeSubscriptions } from "@/twitch/index.js"
import { EventSubConfigRewardUpdate, EventSubType, RewardIconData, SocketServer, SubscriptionType } from "@/types.js"
import { loggerEventsub as logger, loggerSocket } from "@/utils/index.js"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { randomUUID } from "crypto"

export const handleSubscriptionRewardUpdate = async (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: EventSubConfigRewardUpdate
) => {
  const existingSub = await prisma.eventSubscription.findFirst({
    where: {
      type: EventSubType.rewardLink,
      twitchUserId: subConfig.twitchUserId,
    },
  })

  const userRewardLinks = await prisma.rewardLink.findMany({
    where: {
      userId: subConfig.userId,
    },
  })

  // delete subscription if no groups are active
  if (userRewardLinks.length === 0) {
    logger.info(`Found no reward links for twitch user ${subConfig.twitchUserId} after update, removing subscription`)

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    await prisma.eventSubscription.delete({
      where: { id: existingSub?.id ?? "" },
    })

    return
  }

  const addedSub = eventSub.onChannelRewardUpdate(subConfig.twitchUserId, (event) => {
    logger.debug(`Updated reward '${event.title}' of user ${event.broadcasterName}`)

    const eventRewardId = event.id
    const relevantLinks = userRewardLinks.filter((rl) => rl.rewardId === eventRewardId)

    // TODO: internal cache for rewards from twitch, that can be updated without fetching all rewards new?
    const rewardIds = [...new Set(relevantLinks.map((rl) => rl.rewardId))]

    const rooms = rewardIds.map((rewardId) => `reward/${rewardId}`)

    // const rewardData: RewardIconData = {
    //   id: event.id,
    //   title: event.title,
    //   backgroundColor: event.backgroundColor,
    //   image: event.getImageUrl(2),
    //   isEnabled: event.isEnabled,
    //   isPaused: event.isPaused,
    //   isInStock: event.isInStock,
    // }

    if (rooms.length > 0) {
      loggerSocket.debug(
        `Emit reward:update to ${rooms.length} rooms after reward '${event.title}' (${event.broadcasterName}) was updated`
      )
    }

    const updatedReward: RewardIconData = {
      id: event.id,
      title: event.title,
      backgroundColor: event.backgroundColor,
      image: event.getImageUrl(2),
      isPaused: event.isPaused,
      isEnabled: event.isEnabled,
      isInStock: event.isInStock,
    }

    socketIo.to(rooms).emit("reward:update", updatedReward)
  })

  const id = existingSub?.id ?? randomUUID()

  const subscription = await prisma.eventSubscription.upsert({
    where: { id },
    create: {
      id,
      type: EventSubType.rewardLink,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.rewardUpdate,
      paused: false,
    },
    update: {
      paused: false,
    },
  })

  logger.trace(`Added channelRewardUpdate subscrption, id: ${addedSub.id}, cli:`, await addedSub.getCliTestCommand())

  activeSubscriptions.set(subscription.id, addedSub)

  return subscription.id
}
