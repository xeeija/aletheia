import { activeSubscriptions, getTwitchUserId, useMockServer } from "@/twitch"
import {
  EventSubConfigGroup,
  EventSubConfigSyncAdd,
  EventSubType,
  SubscriptionType,
  type EventSubConfigSync,
  type SocketServer,
} from "@/types"
import { PrismaClient, RewardGroup, RewardGroupItem } from "@prisma/client"
import { ApiClient } from "@twurple/api"
import { EventSubMiddleware } from "@twurple/eventsub-http"
import { randomUUID } from "crypto"

// const timeoutsRewardGroup = new Map<string, NodeJS.Timeout>()

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
      console.log(`[eventsub] sync: no wheels for reward ${subConfig.rewardId}, removing subscription`)
    } else {
      console.log(`[eventsub] sync: no active wheels for reward ${subConfig.rewardId}, stopping subscription`)
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
      console.log(
        `[eventsub] sync: received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
      )

      await Promise.all(
        activeSync.map(async (sync) => {
          const wheel = sync.randomWheel
          const entryName = sync.useInput ? event.input || event.userDisplayName : event.userDisplayName

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
              console.log(`[eventsub] sync: skipped duplicate redemption '${entryName}' for wheel '${wheel.slug}'`)
              return
            }
          }

          await prisma.randomWheelEntry.create({
            data: {
              randomWheelId: wheel.id,
              name: entryName,
            },
          })

          // console.log(`[socket] to wheel/${subConfig.randomWheelId}`)
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

  // console.log("id", id, addedSub.id)
  // console.log("cli: ", await addedSub.getCliTestCommand())

  activeSubscriptions.set(subscription.id, addedSub)

  // if (showEventSubDebug) {
  //   addedSubscription.getCliTestCommand().then((command) => console.log("CLI", command))
  // }
  return subscription.id
}

export const handleSubscriptionRewardGroup = async (
  eventSub: EventSubMiddleware,
  prisma: PrismaClient,
  apiClient: ApiClient,
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
    console.log("[eventsub] reward group: no groups active, removing subscription")

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    await prisma.eventSubscription.delete({
      where: { id: existingSub?.id ?? "" },
    })

    return
  }

  const addedSub = eventSub.onChannelRedemptionAdd(subConfig.twitchUserId, async (event) => {
    // debug
    console.log(
      `[eventsub] reward group: received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
    )

    const eventRewardId = event.rewardId

    const relevantGroups = userRewardGroups.filter((g) =>
      g.items.some((i) => i.rewardId === eventRewardId && i.triggerCooldown)
    )

    if (relevantGroups.length === 0) {
      // debug
      console.log("[eventsub] reward group: no groups found")
      return
    }

    // const eventReward = await event.getReward()
    // const eventReward = rewards.find((r) => event.rewardId === r.id)
    const eventReward = !useMockServer
      ? await event.getReward()
      : await apiClient.channelPoints.getCustomRewardById(twitchUserId, event.rewardId)

    if (!eventReward) {
      console.error("[eventsub] reward group: reward is null, this should never happen")
      return
    }

    const cooldown = eventReward.globalCooldown
    // const cooldownExpiry = eventReward.cooldownExpiryDate
    // const cooldown = 30

    if (cooldown === null) {
      return
    }

    // handle all reward groups the redeemed reward is part of, and await them all
    await Promise.all(
      relevantGroups.map(async (group) => {
        // disable all items in the same group for the duration of the cooldown
        const rewardItems = group.items.filter((i) => i.rewardEnabled && i.rewardId !== eventRewardId)

        if (rewardItems.length === 0) {
          return
        }

        const disableRewards = rewardItems.map(async (item) => {
          try {
            await apiClient.channelPoints.updateCustomReward(twitchUserId, item.rewardId, {
              isPaused: true,
            })
          } catch (ex) {
            // HttpStatusCodeError from @twurple/api-call
            const errorMessage = ex instanceof Error ? ex.message : null
            console.error(`[eventsub] reward group: error pausing ${group.name}:`, errorMessage ?? "")
            console.error(ex)
          }
        })

        const reenableRewards = rewardItems.map(async (item) => {
          try {
            await apiClient.channelPoints.updateCustomReward(twitchUserId, item.rewardId, {
              isPaused: false,
            })
          } catch (ex) {
            const errorMessage = ex instanceof Error ? ex.message : null
            console.error(`[eventsub] reward group: error unpausing ${group.name}:`, errorMessage ?? "")
            console.error(ex)
          }
        })

        console.log(
          `[eventsub] reward group: pause ${group.name}`,
          disableRewards.length,
          `rewards for ${cooldown} seconds`
        )

        await Promise.all(disableRewards)

        // save cooldown expiry or disable timestamp for rewards
        // to be able to reenable them after server restart
        // await prisma.rewardGroupItem.updateMany({
        //   where: { rewardId: { in: rewardItems.map((i) => i.rewardId) } },
        //   data: {
        //     // lastPaused: date now + cooldown
        //   },
        // })

        // await prisma.rewardGroup.update({
        //   where: { id: group.id },
        //   data: {
        //     cooldownExpiry: cooldownExpiry,
        //   },
        // })

        // TODO: save timeout to cancel it, if a reward is disabled/paused manually?
        setTimeout(async () => {
          console.log(`[eventsub] reward group: unpause ${group.name}`, disableRewards.length, `rewards`)

          await Promise.all(reenableRewards)
        }, cooldown * 1000)
      })
    )
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

  // console.log("id", id, addedSub.id)
  // console.log("cli: ", await addedSub.getCliTestCommand())

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

  console.log(
    `[eventsub] sync: adding existing redemptions of ${redemptions.current?.[0].broadcaster_name} for ${redemptions.current?.[0].reward.title}`
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

    if (redemptionsCount >= 300) {
      console.log(`[eventsub] sync: exceeded ${redemptionsCount} existing redemptions, stopping`)
      break
    }

    // if (redemptions.current.length < maxPerPage) {
    //   console.log(
    //     `[eventsub] sync: page has less than max redemptions (${redemptions.current.length}/${maxPerPage}), stopping`
    //   )
    //   break
    // }

    if (redemptions.currentCursor === previousCursor) {
      console.log(`[eventsub] sync: current cursor is the same as previous cursor, stopping`)
      break
    }

    previousCursor = redemptions.currentCursor

    await redemptions.getNext()
  }

  console.log(
    `[eventsub] sync: added ${redemptionsCount} existing redemptions${subConfig.uniqueEntries ? `, skipped ${skippedCount} redemptions` : ""}`
  )

  socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
}
