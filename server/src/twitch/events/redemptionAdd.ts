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

// export const addSubscriptionSync = (
//   eventSub: EventSubMiddleware,
//   prisma: PrismaClient,
//   socketIo: SocketServer,
//   subConfig: EventSubConfigSync
// ) => {
//   const addedSubscription = eventSub.onChannelRedemptionAddForReward(
//     subConfig.twitchUserId,
//     subConfig.rewardId,
//     async (event) => {
//       console.log(
//         `[eventsub] sync: received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
//       )

//       if (event.status === "unfulfilled") {
//         const entryName = subConfig.useInput ? event.input || event.userDisplayName : event.userDisplayName

//         if (subConfig.uniqueEntries) {
//           const existingEntry = await prisma.randomWheelEntry.findFirst({
//             where: {
//               randomWheelId: subConfig.randomWheelId,
//               name: {
//                 equals: entryName,
//                 mode: "insensitive",
//               },
//             },
//           })

//           if (existingEntry) {
//             console.log(`[eventsub] sync: skipped duplicate redemption '${entryName}'`)
//             return
//           }
//         }

//         await prisma.randomWheelEntry.create({
//           data: {
//             randomWheelId: subConfig.randomWheelId,
//             name: entryName,
//           },
//         })

//         // console.log(`[socket] to wheel/${subConfig.randomWheelId}`)
//         socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
//       }
//     }
//   )

//   const id = subConfig.id ?? randomUUID()

//   activeSubscriptions.set(id, addedSubscription)

//   // if (showEventSubDebug) {
//   //   addedSubscription.getCliTestCommand().then((command) => console.log("CLI", command))
//   // }

//   return id
// }

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
      // rewardId: subConfig.rewardId ?? "",
      // paused: false,
    },
    // include: {
    //   wheelSync: {
    //     include: {
    //       randomWheel: true,
    //     },
    //   },
    // },
  })

  const wheelSync = await prisma.randomWheelSync.findMany({
    where: {
      rewardId: subConfig.rewardId,
      paused: false,
    },
    include: {
      randomWheel: true,
    },
  })

  // const wheels = wheelSync.map((w) => w.randomWheel)

  // delete subscription if no wheels need it
  if (!wheelSync || wheelSync.length === 0) {
    console.log("[eventsub] sync: no wheels for reward, removing subscription")

    activeSubscriptions.get(existingSub?.id ?? "")?.stop()
    activeSubscriptions.delete(existingSub?.id ?? "")

    await prisma.eventSubscription.delete({
      where: { id: existingSub?.id ?? "" },
    })

    return null
  }

  const addedSub = eventSub.onChannelRedemptionAddForReward(
    subConfig.twitchUserId,
    subConfig.rewardId,
    async (event) => {
      console.log(
        `[eventsub] sync: received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
      )

      await Promise.all(
        wheelSync.map(async (sync) => {
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
              console.log(`[eventsub] sync: skipped duplicate redemption '${entryName}'`)
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

  console.log("verified", addedSub.verified)

  const id = existingSub?.id ?? randomUUID()

  const subscription = await prisma.eventSubscription.upsert({
    where: { id },
    update: {
      type: EventSubType.wheelSync,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
    },
    create: {
      id,
      type: EventSubType.wheelSync,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
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
    console.log(
      `[eventsub] reward group: received redemption for ${event.broadcasterName}: '${event.rewardTitle}' from ${event.userName}`
    )

    const eventRewardId = event.rewardId

    const relevantGroups = userRewardGroups.filter((g) =>
      g.items.some((i) => i.rewardId === eventRewardId && i.triggerCooldown)
    )

    if (relevantGroups.length === 0) {
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
    update: {
      type: EventSubType.rewardGroup,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
    },
    create: {
      id,
      type: EventSubType.rewardGroup,
      userId: subConfig.userId,
      twitchUserId: subConfig.twitchUserId,
      subscriptionType: SubscriptionType.redemptionAdd,
    },
  })

  // console.log("id", id, addedSub.id)
  // console.log("cli: ", await addedSub.getCliTestCommand())

  activeSubscriptions.set(subscription.id, addedSub)

  return subscription.id
}

// export const findSubscriptionRedemptionAdd = async (
//   apiClient: ApiClient,
//   userId: string,
//   rewardId: string,
//   existingResult?: HelixPaginatedEventSubSubscriptionsResult
// ) => {
//   const helixSubs = existingResult ?? (await apiClient.eventSub.getSubscriptionsForType(SubscriptionType.redemptionAdd))

//   return helixSubs.data.find(
//     (sub) =>
//       (sub.status === "enabled" || sub.status === "webhook_callback_verification_pending") &&
//       sub.condition.broadcaster_user_id === userId &&
//       sub.condition.reward_id === rewardId
//   )
// }

// export const deleteSubscriptionSync = async (
//   apiClient: ApiClient,
//   prisma: PrismaClient,
//   id: string,
//   skipDelete?: boolean
// ) => {
//   const sub = await prisma.eventSubscription.findUnique({
//     where: { id },
//   })

//   if (!sub?.twitchUserId || !sub.rewardId || !sub.randomWheelId) {
//     console.warn(
//       `[eventsub] sync: delete: invalid ID ${id}: a required related ID is undefined`,
//       !!sub?.twitchUserId,
//       !!sub?.rewardId,
//       !!sub?.randomWheelId
//     )
//     return null
//   }

//   const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId)

//   if (helixSub) {
//     activeSubscriptions.get(sub.id)?.stop()
//     // await apiClient.eventSub.deleteSubscription(helixSub.id)

//     if (!skipDelete) {
//       activeSubscriptions.delete(sub.id)
//     }
//   }

//   if (!skipDelete) {
//     await prisma.eventSubscription.delete({
//       where: { id },
//     })
//   }

//   return sub
// }

// export const deleteManySubscriptionsSync = async (
//   apiClient: ApiClient,
//   prisma: PrismaClient,
//   ids: string[],
//   skipDelete?: boolean
// ) => {
//   const subs = await prisma.eventSubscription.findMany({
//     where: {
//       id: { in: ids },
//     },
//   })

//   const validSubs = subs.filter((s) => s.twitchUserId && s.rewardId && s.randomWheelId)

//   if (validSubs.length === 0) {
//     console.warn(`[eventsub] sync: no valid subscriptions to delete`)
//     return false
//   }

//   const helixSubs = await apiClient.eventSub.getSubscriptionsForType(SubscriptionType.redemptionAdd)

//   console.log(`[eventsub] sync: deleting ${validSubs.length} subscriptions`)

//   // validSubs.forEach(async (sub) => {
//   for (const sub of validSubs) {
//     const helixSub = await findSubscriptionRedemptionAdd(apiClient, sub.twitchUserId, sub.rewardId ?? "", helixSubs)

//     if (helixSub) {
//       // await apiClient.eventSub.deleteSubscription(helixSub.id)
//       activeSubscriptions.get(sub.id)?.stop()

//       if (!skipDelete) {
//         activeSubscriptions.delete(sub.id)
//       }
//     } else {
//       console.log(`[eventsub] sync: found no matching subscription to delete`)
//     }
//   }

//   if (!skipDelete) {
//     const deleted = await prisma.eventSubscription.deleteMany({
//       where: {
//         id: { in: validSubs.map((s) => s.id) },
//       },
//     })

//     console.log(`[eventsub] sync: deleted ${deleted.count} subscriptions`)
//   }

//   return true
// }

export const addExistingRedemptionsSync = async (
  apiClient: ApiClient,
  prisma: PrismaClient,
  socketIo: SocketServer,
  subConfig: EventSubConfigSyncAdd
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
    `[eventsub] sync: adding existing redemptions of ${redemptions.current?.[0].broadcaster_name} for ${redemptions.current?.[0].reward.title}`
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

  console.log(`[eventsub] sync: added ${redemptionsCount} existing redemptions`)

  socketIo.to(`wheel/${subConfig.randomWheelId}`).emit("wheel:entries", "add")
}
