import {
  includeRandomWheelMember,
  RandomWheel,
  RandomWheelFull,
  RandomWheelInput,
  RandomWheelLike,
  RandomWheelWinner,
} from "@/resolvers/index.js"
import { AppError } from "@/resolvers/types.js"
import { handleSubscriptionSync } from "@/twitch/events/index.js"
import { accessTokenForUser } from "@/twitch/index.js"
import type { GraphqlContext } from "@/types.js"
import { loggerGraphql as logger, loggerSocket, random, randomBase64Url, randomNumber, slugify } from "@/utils/index.js"
import { Prisma } from "@prisma/client"
import { randomUUID } from "crypto"
import { GraphQLError, type GraphQLResolveInfo } from "graphql"
import { parseResolveInfo } from "graphql-parse-resolve-info"
import { Arg, Ctx, FieldResolver, Info, Int, Mutation, Query, Resolver, Root } from "type-graphql"

/*
  @ObjectType()
  class RandomWheelsResponse {
    @Field(() => [RandomWheel], { nullable: true })
    randomWheels?: RandomWheel[]

    @Field(() => AppError, { nullable: true })
    error?: AppError
  }

  @ObjectType()
  class RandomWheelResponse extends BaseResponse {
    @Field(() => RandomWheel, { nullable: true })
    randomWheel?: RandomWheel
  }

  const RandomWheelUnion = createUnionType({
    name: "RandomWheelUnion",
    types: () => [RandomWheel, AppError] as const,
    resolveType: (value => {
      if ("errorMessage" in value || "fieldErrors" in value) return AppError
      else return RandomWheel
    })
  })
*/

// @ObjectType("RandomWheelList")
// class RandomWheelList extends ListType(RandomWheel) { }

// workaround: generic RandomWheelList type: with "items" property that is the list
// const RandomWheelListResponse = createAppErrorUnion(RandomWheelList)

const WheelListTypes = ["my", "shared", "favorite"] as const
type WheelListType = (typeof WheelListTypes)[number]

const isWheelListType = (value: string): value is WheelListType => {
  return WheelListTypes.includes(value as WheelListType)
}

const includeRandomWheel = (info: GraphQLResolveInfo) => {
  const resolveInfo = parseResolveInfo(info)
  const fields = resolveInfo?.fieldsByTypeName.RandomWheel ?? {}

  const include: Prisma.RandomWheelInclude = {
    entries: "entries" in fields && {
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
    },
    winners: "winners" in fields && {
      orderBy: { createdAt: "desc" },
    },
    members: "members" in fields && {
      include: { ...includeRandomWheelMember(info) },
    },
    owner: "owner" in fields,
    access: "access" in fields,
    theme: "theme" in fields,
    _count: "_count" in fields,
  }

  return include
}

// @ObjectType()
// class RandomWheelEntryResponse extends BaseResponse {
//   @Field(() => RandomWheelEntry, { nullable: true })
//   entries?: RandomWheelEntry
// }

@Resolver(() => RandomWheelFull)
export class RandomWheelResolver {
  // [x] get my wheels
  // [x] get wheel by slug
  // [x] create wheel
  // [x] update wheel (how exactly? -> split in multiple mutations)
  // [x] delete wheel

  // [x] spin (draw a winner)
  // [x] add entry
  // [x] remove entry
  // [x] clear all entries

  @FieldResolver(() => Boolean)
  async editable(@Root() randomWheel: RandomWheelFull, @Ctx() { req, prisma }: GraphqlContext) {
    // TODO: Option to make public wheels editable anonymously

    const userId = req.session.userId
    if (randomWheel.ownerId === userId || randomWheel.ownerId === null) {
      return true
    }

    // if session.userId is undefined in the prisma query
    // it is treated as not beeing in the query, so any user with edit is found - fix with this if
    if (userId === undefined && randomWheel.ownerId) {
      return false
    }

    const member = await prisma.randomWheelMember.findFirst({
      where: {
        randomWheelId: randomWheel.id,
        userId: userId,
        roleName: "EDIT",
      },
    })

    return member !== null
  }

  @FieldResolver(() => Boolean)
  async viewable(@Root() wheel: RandomWheelFull, @Ctx() { req, prisma }: GraphqlContext) {
    const isPublic = wheel.accessType === "PUBLIC" || wheel.owner === null

    const userId = req.session.userId
    const isOwner = wheel.owner?.id === userId // || wheel.members?.some((member) => member.userId === userId)

    const hasToken = wheel.shareToken && `Bearer ${wheel.shareToken}` === req.headers?.authorization

    if (isPublic || isOwner || hasToken) {
      return true
    }

    const member = await prisma.randomWheelMember.findFirst({
      where: {
        randomWheelId: wheel.id,
        userId: userId,
        roleName: "EDIT",
      },
    })

    return member !== null
  }

  @FieldResolver(() => Boolean)
  async liked(@Root() randomWheel: RandomWheelFull, @Ctx() { req, prisma }: GraphqlContext) {
    if (req.session.userId === undefined) {
      return false
    }

    const like = await prisma.randomWheelLike.findUnique({
      where: {
        userId_randomWheelId: {
          userId: req.session.userId,
          randomWheelId: randomWheel.id,
        },
      },
    })

    return like !== null
  }

  // Wheel

  @Query(() => [RandomWheelFull])
  async myRandomWheels(
    @Ctx() { req, prisma }: GraphqlContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("type", { defaultValue: "my" }) type: WheelListType // "should" be: "my" | "shared" | "favorite"
  ) {
    // TODO: FIX so it throws a proper Graphql Error or so
    if (!req.session.userId) {
      return []
    }

    if (!isWheelListType(type)) {
      throw new Error(`Invalid type. Must be one of: ${WheelListTypes.join(", ")}`)
    }

    const randomWheels = await prisma.randomWheel.findMany({
      where: {
        ownerId: type === "my" ? req.session.userId : undefined,
        members:
          type === "shared"
            ? {
                some: {
                  userId: req.session.userId,
                },
              }
            : undefined,
        likes:
          type === "favorite"
            ? {
                some: {
                  userId: req.session.userId,
                },
              }
            : undefined,
      },
      include: {
        ...includeRandomWheel(info),
      },
    })

    return randomWheels
  }

  // TODO: Only allowed if logged in? (or if private?)
  @Query(() => RandomWheelFull, { nullable: true })
  async randomWheelBySlug(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("slug") slug: string,
    @Arg("token", () => String, { nullable: true }) token: string | undefined,
    @Info() info: GraphQLResolveInfo
  ) {
    //: Promise<typeof RandomWheelResponse> {
    try {
      // console.log(JSON.stringify(info))
      // info.fieldNodes[0].selectionSet?.selections.forEach(sel => console.log(sel))

      // const resolveInfo = parseResolveInfo(info)
      // const fields = resolveInfo?.fieldsByTypeName.RandomWheelFull ?? {}

      // console.log(fields)

      const wheel = await prisma.randomWheel.findFirst({
        where: {
          slug: slug,
          accessType: !req.session.userId && !token ? "PUBLIC" : undefined,
          OR: [
            { accessType: "PUBLIC" },
            { ownerId: req.session.userId },
            { shareToken: token ?? "" },
            {
              members: {
                some: { userId: req.session.userId },
              },
            },
          ],
        },
        include: {
          ...includeRandomWheel(info),
        },
        // TODO: Maybe select only the requested fields
        // select: {
        //   id: true,
        //   entries: { select: { name: true } },
        //   owner: { select: { username: true } }
        // }
      })

      // if (wheel) {
      return wheel
      // }

      // return {
      //   errorCode: 404,
      //   errorMessage: "Not found"
      // }
    } catch (err) {
      logger.error("Failed to find wheel:", err)

      return {
        errorCode: 500,
        errorMessage: "Unknown error",
      }
    }
  }

  @Query(() => RandomWheelFull, { nullable: true })
  async randomWheel(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("slug") slug: string,
    @Arg("token", () => String, { nullable: true }) token: string | undefined,
    @Info() info: GraphQLResolveInfo
  ) {
    try {
      const wheel = await prisma.randomWheel.findFirst({
        where: {
          slug: slug,
          accessType: !req.session.userId && !token ? "PUBLIC" : undefined,
          OR: [
            { accessType: "PUBLIC" },
            { ownerId: req.session.userId },
            { shareToken: token ?? "" },
            {
              members: {
                some: { userId: req.session.userId },
              },
            },
          ],
        },
        include: {
          ...includeRandomWheel(info),
        },
        // TODO: Maybe select only the requested fields
      })

      return wheel as RandomWheelFull
    } catch (err) {
      logger.error("Failed to find wheel:", err)

      throw new Error("Failed to find wheel")
    }
  }

  // FIX return type
  @Mutation(() => RandomWheelFull)
  async createRandomWheel(
    @Ctx() { req, prisma }: GraphqlContext,
    @Arg("name", { nullable: true }) name?: string,
    @Arg("accessType", { nullable: true }) accessType?: string,
    @Arg("spinDuration", () => Int, { nullable: true }) spinDuration?: number,
    @Arg("fadeDuration", () => Int, { nullable: true }) fadeDuration?: number,
    @Arg("editAnonymous", { nullable: true }) editAnonymous?: boolean,
    @Arg("uniqueEntries", { nullable: true }) uniqueEntries?: boolean
  ): Promise<RandomWheel | AppError> {
    // const tempSlug = `slug-${Date.now()}`

    try {
      const id = randomUUID()
      const slug = slugify(id, 6)

      const shareToken = randomBase64Url(16)

      const randomWheel = await prisma.randomWheel.create({
        data: {
          id,
          slug,
          ownerId: req.session.userId || null,
          name: name,
          accessType,
          spinDuration,
          fadeDuration,
          editAnonymous,
          uniqueEntries,
          shareToken,
        },
      })

      // const slug = slugify(randomWheel.id, 6)
      // TODO: Use default value for slug in schema to avoid a second update?
      // const newWheel = await prisma.randomWheel.update({
      //   where: { id: randomWheel.id },
      //   data: { slug: slug },
      // })

      return randomWheel
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const errorFields = err.meta?.target as string[]

          return {
            errorCode: 400,
            fieldErrors: errorFields.map((field) => ({
              field,
              message: `${field[0].toUpperCase() + field.slice(1)} already exists`,
            })),
          }
        }
      }

      logger.error("Failed to create wheel:", err)

      return {
        errorCode: 500,
        errorMessage: "Unknown error",
      }
    }
  }

  @Mutation(() => RandomWheelFull, { nullable: true })
  async updateRandomWheel(
    @Ctx() { prisma, req, socketIo, eventSub }: GraphqlContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("id") id: string,
    @Arg("options") { theme, ...wheelOptions }: RandomWheelInput
  ) {
    // TODO: Middleware to get randomWheel (or any other entity) or return a not found error/permission error
    const randomWheel = await prisma.randomWheel.findUnique({
      where: { id: id },
      include: {
        members: true,
      },
    })

    if (!randomWheel) {
      return null
      // return {
      //   errorCode: 404,
      //   errorMessage: "Not found"
      // }
    }

    const isOwner = randomWheel?.ownerId === req.session.userId
    const isEditable =
      randomWheel.editAnonymous || randomWheel.members.some((member) => member.userId === req.session.userId)

    if ((!req.session.userId && !randomWheel.editAnonymous) || !(isOwner || isEditable)) {
      // TODO: Proper Error
      return null
      // return {
      //   errorCode: 404,
      //   errorMessage: "Not found"
      // }
    }

    try {
      // extra query as workaround, because theme and wheeloptions are not compatible somehow idk
      if (theme?.id) {
        await prisma.randomWheel.update({
          where: { id },
          data: {
            theme: {
              // upsert: {
              //   update: {
              //     name: theme?.name,
              //     colors: theme?.colors,
              //     // Creator User? how to handle changing the theme?
              //   },
              //   create: {
              //     name: theme?.name,
              //     colors: theme?.colors,
              //     creatorId: req.session.userId,
              //   }
              // },
              connectOrCreate: {
                where: { id: theme.id },
                create: {
                  name: theme.name,
                  colors: theme.colors,
                  creatorId: req.session.userId,
                },
              },
            },
          },
        })
      }

      const newWheel = await prisma.randomWheel.update({
        where: { id },
        data: wheelOptions,
        include: {
          ...includeRandomWheel(info),
        },
      })

      socketIo.to(`wheel/${newWheel.id}`).emit("wheel:update", "wheel")

      // update wheel sync eventsub when uniqueEntries changes
      if (randomWheel.uniqueEntries !== newWheel.uniqueEntries) {
        const token = await accessTokenForUser({ req, prisma })

        const wheelSync = await prisma.randomWheelSync.findMany({
          where: {
            randomWheelId: newWheel.id,
          },
        })

        await Promise.all(
          wheelSync.map(async (sync) => {
            await handleSubscriptionSync(eventSub, prisma, socketIo, {
              twitchUserId: token.realTwitchUserId,
              userId: req.session.userId,
              rewardId: sync.rewardId,
            })
          })
        )
      }

      return newWheel
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
          const errorFields = err.meta?.target as string[]

          return {
            errorCode: 400,
            fieldErrors: errorFields.map((field) => ({
              field,
              message: `${field[0].toUpperCase() + field.slice(1)} is not available`,
            })),
          }
        }
      }

      logger.error("Failed to create wheel:", err)

      return {
        errorCode: 500,
        errorMessage: "Unknown error",
      }
    }
  }

  @Mutation(() => AppError, { nullable: true })
  async deleteRandomWheel(@Ctx() { prisma, req }: GraphqlContext, @Arg("id") id: string): Promise<AppError | null> {
    // TODO: isUuid utility function
    // const uuidRegex = /^[0-9a-f]{8}-?(?:[0-9a-f]{4}-?){3}[0-9a-f]{12}$/i

    const randomWheel = await prisma.randomWheel.findUnique({
      where: { id: id },
    })

    if (!randomWheel) {
      return {
        errorCode: 404,
        errorMessage: "Not found",
      }
    }

    if (randomWheel.ownerId !== req.session.userId) {
      return {
        errorCode: 403,
        errorMessage: "Forbidden",
      }
    }

    // try {
    await prisma.randomWheel.delete({ where: { id: id } })

    return null
    // }
    // catch {
    //   return {
    //     errorCode: 500,
    //     errorMessage: "Unknown error"
    //   }
    // }
  }

  @Mutation(() => RandomWheelWinner)
  async spinRandomWheel(
    @Ctx() { prisma, req, socketIo }: GraphqlContext,
    @Arg("randommWheelId") randomWheelId: string
  ) {
    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWheelId },
      include: {
        entries: {
          orderBy: { createdAt: "asc" },
        },
      },
    })

    if (!wheel || wheel.entries.length === 0) {
      throw new GraphQLError("Wheel entries may not be empty")
    }

    const totalWeight = wheel.entries.reduce((acc, entry) => acc + entry.weight || 1, 0)

    const winnerNumber = await randomNumber(0, totalWeight)
    logger.trace(`Spin: generated number ${winnerNumber} from [0, ${totalWeight - 1}]`)

    let winnerAcc = 0
    const winnerIndex = wheel.entries.findIndex((entry) => {
      if (winnerNumber >= winnerAcc && winnerNumber < winnerAcc + entry.weight) {
        return true
      }
      winnerAcc += entry.weight
      return false
    })

    const winnerEntry = wheel.entries[winnerIndex]

    const winner = await prisma.randomWheelWinner.create({
      data: {
        randomWheelId,
        name: winnerEntry.name,
        drawnById: req.session.userId ?? null,
        winnerIndex,
      },
    })

    // const rotateDuration = Math.round(wheel.spinDuration / 1000)
    // const rotations = ~~random(rotateDuration - 1, rotateDuration + 1)

    const sectorDeg = 360 / totalWeight
    const winnerDeg = random(0.1, 0.9)

    const newRotation = 360 - winnerNumber * sectorDeg - sectorDeg * winnerDeg + 90

    const winChance = `${winnerEntry.weight}:${totalWeight}`

    const wheelLog = `${wheel.name || `#${wheel.slug}`}, ${wheel.id.slice(0, 6)}*`
    logger.debug(`Spin: New winner '${winner.name}' #${winnerIndex} with ${winChance} chance (${wheelLog})`)

    await prisma.randomWheel.update({
      where: { id: wheel.id },
      data: { rotation: newRotation % 360 },
    })

    socketIo.to(`wheel/${wheel.id}`).emit("wheel:spin", {
      winner: winner,
      entry: winnerEntry,
      rotation: newRotation % 360,
    })

    loggerSocket.debug(`Emit wheel:spin to room wheel/${wheel.id.slice(0, 6)}*`)

    // TODO: Fire websocket event here
    // Maybe add win chance (1 / entries) to winner?
    // Fix Max width winner tab

    // TODO: Add winner index to Winner?
    // Add currentRotation to RandomWheel (and other wheelOptions, like spinDuration)

    return winner
  }

  @Mutation(() => RandomWheelLike, { nullable: true })
  async likeRandomWheel(
    @Ctx() { prisma, req }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("like") like: boolean
  ) {
    // TODO
    if (!req.session.userId) {
      return null
    }

    const wheelLike = await prisma.randomWheelLike.findUnique({
      where: {
        userId_randomWheelId: {
          userId: req.session.userId,
          randomWheelId,
        },
      },
    })

    if (like === (wheelLike !== null)) {
      return wheelLike
    }

    if (like) {
      const newLike = await prisma.randomWheelLike.create({
        data: {
          userId: req.session.userId,
          randomWheelId,
        },
      })
      return newLike
    } else {
      await prisma.randomWheelLike.delete({
        where: {
          userId_randomWheelId: {
            userId: req.session.userId,
            randomWheelId,
          },
        },
      })
      return null
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async resetShareToken(@Ctx() { prisma, req }: GraphqlContext, @Arg("randommWheelId") randomWheelId: string) {
    const randomWheel = await prisma.randomWheel.findUnique({
      where: { id: randomWheelId },
      include: { members: true },
    })

    if (!randomWheel) {
      return null
    }

    const isOwner = randomWheel?.ownerId === req.session.userId
    const isEditable =
      randomWheel.editAnonymous || randomWheel.members.some((member) => member.userId === req.session.userId)

    if ((!req.session.userId && !randomWheel.editAnonymous) || !(isOwner || isEditable)) {
      // TODO: Proper Error
      return null
    }

    const newToken = randomBase64Url(16)

    await prisma.randomWheel.update({
      where: { id: randomWheel.id },
      data: { shareToken: newToken },
    })

    return true
  }
}
