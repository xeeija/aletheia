import { activeSubscriptions, getTwitchUserId, useMockServer } from "@/twitch/index.js"
import {
  EventSubConfigGroup,
  EventSubConfigSyncAdd,
  EventSubType,
  SubscriptionType,
  type EventSubConfigSync,
  type SocketServer,
} from "@/types.js"
import { createLogger, loggerEventsub as logger, loggerSocket } from "@/utils/index.js"
import { PrismaClient, RewardGroup, RewardGroupItem } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { randomUUID } from "crypto"

// const timeoutsRewardGroup = new Map<string, NodeJS.Timeout>()
const loggerSync = createLogger("eventsub:sync")
const loggerGroup = createLogger("eventsub:reward-group")

export const handleSubscriptionSync = async (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: EventSubConfigSync
) => {
  const existingSub = await prisma.eventSubscription.findFirst({
    where: {
      type: EventSubType.wheelSync,
      twitchUserId: subConfig.twitchUserId,
      itemId: subConfig.rewardId,
    },
  })

  const wheelSync = await prisma.randomWheelSync.findMany({
    where: {
      rewardId: subConfig.rewardId,
    },
    include: {
      randomWheel: true,
    },
  })

  const activeSync = wheelSync.filter((s) => !s.paused)

  // delete subscription if no wheels need it
  if (!activeSync || activeSync.length === 0) {
    if (wheelSync.length === 0) {
      loggerSync.info(`No wheels for reward ${subConfig.rewardId}, removing subscription`)
    } else {
      loggerSync.info(`No active wheels for reward ${subConfig.rewardId}, stopping subscription`)
    }

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    if (wheelSync.length === 0) {
      await prisma.eventSubscription.delete({
        where: { id: existingSub?.id ?? "" },
      })
      return null
    } else {
      await prisma.eventSubscription.update({
        where: { id: existingSub?.id ?? "" },
        data: {
          paused: true,
        },
      })
      return existingSub?.id
    }

    // return null
  }

  const addedSub = eventSub.onChannelRedemptionAddForReward(
    subConfig.twitchUserId,
    subConfig.rewardId,
    async (event) => {
      loggerSync.debug(`${event.userName} redeemed reward '${event.rewardTitle}' in channel ${event.broadcasterName}`)
      // loggerSync.debug(
      //   `Received redemption in channel ${event.broadcasterName} for reward '${event.rewardTitle}' from ${event.userName}`
      // )

      await Promise.all(
        activeSync.map(async (sync) => {
          const wheel = sync.randomWheel
          const entryName = sync.useInput ? event.input || event.userDisplayName : event.userDisplayName

          const wheelLog = wheel.id.slice(0, 7)

          if (wheel.uniqueEntries) {
            const existingEntry = await prisma.randomWheelEntry.findFirst({
              where: {
                randomWheelId: wheel.id,
                name: {
                  equals: entryName,
                  mode: "insensitive",
                },
              },
            })

            if (existingEntry) {
              loggerSync.debug(
                `Skipped duplicate entry '${entryName}' for wheel '${wheel.name || wheel.slug}' (${wheelLog})`
              )
              return
            }
          }

          await prisma.randomWheelEntry.create({
            data: {
              randomWheelId: wheel.id,
              name: entryName,
            },
          })

          loggerSocket.debug(`Emit wheel:entries add to room wheel/${wheelLog}* (from eventsub)`)

          socketIo.to(`wheel/${wheel.id}`).emit("wheel:entries", "add")
        })
      )
    }
  )

  const id = existingSub?.id ?? randomUUID()

  const subscription = await prisma.eventSubscription.upsert({
    where: { id },
    create: {
      id,
      type: EventSubType.wheelSync,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
      itemId: subConfig.rewardId,
      paused: false,
    },
    update: {
      paused: false,
    },
  })

  logger.trace(
    `Added channelRedemptionAddForReward subscrption, id: ${addedSub.id}, cli:`,
    await addedSub.getCliTestCommand()
  )

  activeSubscriptions.set(subscription.id, addedSub)

  return subscription.id
}

export const handleSubscriptionRewardGroup = async (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  apiClient: ApiClient,
  socketIo: SocketServer,
  subConfig: EventSubConfigGroup
) => {
  // TODO: eventsub for reward groups, seperate function?
  // Update or UpdateForReward? - subscription for each reward or one for all and then check, if its in the group?
  // eventSub.onChannelRedemptionAddForReward
  // eventSub.onChannelRewardUpdate

  const twitchUserId = getTwitchUserId(subConfig.twitchUserId)

  const existingSub = await prisma.eventSubscription.findFirst({
    where: {
      type: EventSubType.rewardGroup,
      twitchUserId: subConfig.twitchUserId,
    },
  })

  const userRewardGroups: (RewardGroup & { items: RewardGroupItem[] })[] = await prisma.rewardGroup.findMany({
    where: {
      active: true,
      userId: subConfig.userId,
      items: {
        some: {
          OR: [{ rewardEnabled: true }, { triggerCooldown: true }],
        },
      },
    },
    include: {
      items: true,
      // eventSubscriptions: true,
    },
  })

  // const rewards = await apiClient.channelPoints.getCustomRewardsByIds(
  //   twitchUserId,
  //   userRewardGroups.flatMap((r) => r.items.map((i) => i.rewardId))
  // )

  // delete subscription if no groups are active
  if (userRewardGroups.length === 0) {
    loggerGroup.info(
      `No active reward groups for user ${subConfig.twitchUserId}`,
      `(${subConfig.userId.slice(0, 7)}), removing subscription`
    )

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    await prisma.eventSubscription.delete({
      where: { id: existingSub?.id ?? "" },
    })

    return
  }

  const addedSub = eventSub.onChannelRedemptionAdd(subConfig.twitchUserId, async (event) => {
    // loggerGroup.debug(`${event.userName} redeemed reward '${event.rewardTitle}' in channel ${event.broadcasterName}`)

    const relevantGroups = userRewardGroups.filter((g) =>
      g.items.some((i) => i.rewardId === event.rewardId && i.triggerCooldown)
    )

    loggerGroup.trace(
      `${event.userName} redeemed reward '${event.rewardTitle}' in channel ${event.broadcasterName}:`,
      `${relevantGroups.length} reward groups found`
    )

    if (relevantGroups.length === 0) {
      // loggerGroup.debug(`No reward groups found for reward '${event.rewardTitle}'`)
      return
    }

    loggerGroup.debug(`${event.userName} redeemed reward '${event.rewardTitle}' in channel ${event.broadcasterName}`)

    // const eventReward = await event.getReward()
    // const eventReward = rewards.find((r) => event.rewardId === r.id)
    const eventReward = !useMockServer
      ? await event.getReward()
      : await apiClient.channelPoints.getCustomRewardById(twitchUserId, event.rewardId)

    if (!eventReward) {
      loggerGroup.error(
        `Reward is ${JSON.stringify(eventReward)}, this should never happen`,
        `(${event.rewardTitle}, ${event.broadcasterName})`
      )
      return
    }

    const cooldown = eventReward.globalCooldown ?? (useMockServer ? 180 : null)
    const cooldownExpiry = eventReward.cooldownExpiryDate ?? new Date(Date.now() + (cooldown ?? 0) * 1000)

    if (cooldown === null) {
      loggerGroup.trace(
        `Reward has no global cooldown, so it doesn't trigger a reward group cooldown`,
        `(${event.rewardTitle} ${event.rewardId}, ${event.broadcasterName})`
      )
      return
    }

    const totalRewards = relevantGroups.flatMap((g) => g.items).filter((r) => r.rewardId !== event.rewardId).length
    loggerGroup.info(
      `Pausing ${relevantGroups.length} groups with ${totalRewards} rewards for ${cooldown}s`,
      `(${event.rewardTitle}, ${event.broadcasterName})`
    )

    const updatedGroups: RewardGroup[] = []
    const alreadyPausedReward: string[] = []

    // handle all reward groups the redeemed reward is part of, and await them all (sequentially)
    for await (const group of relevantGroups) {
      // disable all items in the same group for the duration of the cooldown
      const rewardItems = group.items.filter((i) => i.rewardEnabled && i.rewardId !== event.rewardId)

      if (rewardItems.length === 0) {
        return
      }

      for await (const item of rewardItems) {
        if (!alreadyPausedReward.includes(item.rewardId)) {
          try {
            await apiClient.channelPoints.updateCustomReward(twitchUserId, item.rewardId, {
              isPaused: true,
            })
            alreadyPausedReward.push(item.rewardId)
          } catch (err) {
            // HttpStatusCodeError from @twurple/api-call
            const errorMessage = err instanceof Error ? `${err.name}: ${err.message}` : null
            loggerGroup.error(`Failed to pause group '${group.name}':`, errorMessage ?? err)
          }
        }
        // await new Promise((resolve) => setTimeout(resolve, 50))
      }

      loggerGroup.debug(`Pause group '${group.name}' with ${rewardItems.length} rewards for ${cooldown}s`)

      const updatedGroup = await prisma.rewardGroup.update({
        where: { id: group.id },
        data: {
          cooldownExpiry: cooldownExpiry,
        },
      })

      updatedGroups.push(updatedGroup)
      // updatedGroups = [...updatedGroups, updatedGroup]

      // socketIo.to(`rewardgroup/${group.userId}`).emit("rewardgroup:pause", updatedGroup, true)

      // save cooldown expiry or disable timestamp for rewards
      // to be able to reenable them after server restart
      // await prisma.rewardGroupItem.updateMany({
      //   where: { rewardId: { in: rewardItems.map((i) => i.rewardId) } },
      //   data: {
      //     // lastPaused: date now + cooldown
      //   },
      // })

      // TODO: maybe fetch rewards from twitch again,
      // TODO: save timeout to cancel it, if a reward is disabled/paused manually?

      unpauseRewardGroup({
        apiClient,
        prisma,
        socketIo,
        group,
        rewardItems,
        twitchUserId,
        cooldown: cooldown * 1000,
        // cooldown: timeoutDuration,
      })

      // short delay so websocket cooldowns dont overwrite each other
      // TODO: maybe refetch reward groups completely, when unpaused to mitigate this
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    socketIo.to(`rewardgroup/${subConfig.userId}`).emit("rewardgroup:pause", updatedGroups, true)
  })

  // const id = subConfig?.id ?? randomUUID()
  const id = existingSub?.id ?? randomUUID()

  const subscription = await prisma.eventSubscription.upsert({
    where: { id },
    create: {
      id,
      type: EventSubType.rewardGroup,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
      paused: false,
    },
    update: {
      paused: false,
    },
  })

  logger.trace(`Added channelRedemptionAdd subscrption, id: ${addedSub.id}, cli:`, await addedSub.getCliTestCommand())

  activeSubscriptions.set(subscription.id, addedSub)

  return subscription.id
}

type RandomWheelEntryInput = {
  name: string
  randomWheelId: string
}

export const addExistingRedemptionsSync = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: EventSubConfigSyncAdd
) => {
  const twitchUserId = getTwitchUserId(subConfig.twitchUserId)

  const redemptions = apiClient.channelPoints.getRedemptionsForBroadcasterPaginated(
    twitchUserId,
    subConfig.rewardId,
    "UNFULFILLED",
    {}
  )

  await redemptions.getNext()

  if (!redemptions.current?.length) {
    return
  }

  let redemptionsCount = 0
  let previousCursor: string | undefined = ""
  let newEntries: RandomWheelEntryInput[] = []
  // const maxPerPage = 50

  // only relevant when uniqueEntries is enabled
  let skippedCount = 0
  let existingEntries: string[] = []
  let previousFetched = Date.now()

  if (subConfig.uniqueEntries) {
    const initialEntries = await prisma.randomWheelEntry.findMany({
      where: {
        randomWheelId: subConfig.randomWheelId,
      },
    })

    existingEntries = initialEntries.map((e) => e.name)
  }

  loggerSync.info(
    `Adding existing redemptions of ${redemptions.current?.[0].broadcaster_name}`,
    `for reward '${redemptions.current?.[0].reward.title}' (${redemptions.current?.[0].broadcaster_login})`,
    `to wheel ${subConfig.randomWheelId.slice(0, 7)}* (${subConfig.useInput ? "input" : "name"})`
  )

  while (redemptions.current?.length) {
    newEntries = redemptions.current.map((r, i) => ({
      name: subConfig.useInput ? r.user_input || r.user_name : r.user_name,
      randomWheelId: subConfig.randomWheelId,
      createdAt: new Date(Date.now() + i),
    }))

    // filter out duplicates if uniqueEntries is enabled
    if (subConfig.uniqueEntries) {
      // only fetch newly created entries again
      const previousNewEntries = await prisma.randomWheelEntry.findMany({
        where: {
          randomWheelId: subConfig.randomWheelId,
          createdAt: { gt: new Date(previousFetched) },
        },
      })

      previousFetched = Date.now()

      existingEntries = [...existingEntries, ...previousNewEntries.map((e) => e.name)]
      newEntries = newEntries.filter((e) => !existingEntries.includes(e.name))
    }

    await prisma.randomWheelEntry.createMany({
      data: newEntries,
    })

    // redemptionsCount += redemptions.current?.length ?? 0
    redemptionsCount += newEntries.length ?? 0
    skippedCount += redemptions.current.length - newEntries.length

    const maxRedemptions = 300
    if (redemptionsCount >= maxRedemptions) {
      loggerSync.warn(`Exceeded ${maxRedemptions} existing redemptions to add, stopping`)
      break
    }

    // if (redemptions.current.length < maxPerPage) {
    //   loggerSync.debug(
    //     `[eventsub] sync: page has less than max redemptions (${redemptions.current.length}/${maxPerPage}), stopping`
    //   )
    //   break
    // }

    if (redemptions.currentCursor === previousCursor) {
      loggerSync.debug(`Current cursor is equal to previous cursor, stopping existing redemptions`)
      break
    }

    previousCursor = redemptions.currentCursor

    await redemptions.getNext()
  }

  // const rewardTitle = redemptions.current?.[0].reward.title
  // const rewardChannel = redemptions.current?.[0].broadcaster_login

  loggerSync.info(
    `Added ${redemptionsCount} existing redemptions`,
    `${subConfig.uniqueEntries && skippedCount > 0 ? `and skipped ${skippedCount} redemptions` : ""}`
    // `from reward '${rewardTitle}' (${rewardChannel})`,
    // `to wheel ${subConfig.randomWheelId.slice(0, 7)}* (using ${subConfig.useInput ? "input" : "name"})`
  )

  loggerSocket.debug(`Emit wheel:entries add to room wheel/${subConfig.randomWheelId.slice(0, 7)}* (from eventsub)`)

  socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
}

type UnpauseRewardConfig = {
  prisma: PrismaClient
  apiClient: ApiClient
  socketIo: SocketServer
  group: RewardGroup
  rewardItems: RewardGroupItem[]
  twitchUserId: string
  cooldown: number
}

export const unpauseRewardGroup = (config: UnpauseRewardConfig) => {
  const { prisma, apiClient, socketIo, group, rewardItems, twitchUserId, cooldown } = config

  setTimeout(async () => {
    // TODO: maybe fetch rewards from twitch again,
    loggerGroup.debug(`Unpause group '${group.name}' with ${rewardItems.length} rewards`)

    for await (const item of rewardItems) {
      try {
        await apiClient.channelPoints.updateCustomReward(twitchUserId, item.rewardId, {
          isPaused: false,
        })
      } catch (err) {
        const errorMessage = err instanceof Error ? `${err.name}: ${err.message}` : null
        loggerGroup.error(`Failed to unpause group '${group.name}':`, errorMessage ?? err)
      }
      // await new Promise((resolve) => setTimeout(resolve, 50))
    }

    const updatedGroup = await prisma.rewardGroup.update({
      where: { id: group.id },
      data: {
        cooldownExpiry: null,
      },
    })

    loggerSocket.debug(`Emit rewardgroup:pause to room rewardgroup/${group.userId.slice(0, 7)}* (from eventsub)`)

    socketIo.to(`rewardgroup/${group.userId}`).emit("rewardgroup:pause", [updatedGroup], false)
  }, cooldown)
}
