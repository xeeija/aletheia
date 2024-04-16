import { activeSubscriptions } from "@/twitch"
import { EventSubConfigRewardUpdate, EventSubType, SocketServer, SubscriptionType } from "@/types"
import { PrismaClient } from "@prisma/client"
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
    console.log("[eventsub] reward link: no links, removing subscription")

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    await prisma.eventSubscription.delete({
      where: { id: existingSub?.id ?? "" },
    })

    return
  }

  const addedSub = eventSub.onChannelRewardUpdate(subConfig.twitchUserId, (event) => {
    // debug
    console.log(`[eventsub] Received reward update for ${event.broadcasterName}: '${event.title}'`)

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

    socketIo.to(rooms).emit("reward:update")
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

  // console.log("id", id, addedSub.id)
  // console.log("cli: ", await addedSub.getCliTestCommand())

  activeSubscriptions.set(subscription.id, addedSub)

  return subscription.id
}
