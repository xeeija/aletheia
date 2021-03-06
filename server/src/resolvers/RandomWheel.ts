import { MyContext } from "src/types";
import { slugify } from "../utils/slug";
import { Arg, Ctx, Field, FieldResolver, Info, InputType, Int, Mutation, ObjectType, Query, Resolver, Root } from "type-graphql";
import { RandomWheel, RandomWheelEntry, RandomWheelMember, RandomWheelWinner, User, AccessType, RandomWheelRole } from "../../dist/generated/typegraphql-prisma";
import { AppError, createAppErrorUnion } from "./common/types";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { parseResolveInfo, ResolveTree } from "graphql-parse-resolve-info";
import { Prisma } from "@prisma/client";
import { random, randomNumber } from "../utils/math";

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

const RandomWheelResponse = createAppErrorUnion(RandomWheel)

// @ObjectType("RandomWheelList")
// class RandomWheelList extends ListType(RandomWheel) { }

// workaround: generic RandomWheelList type: with "items" property that is the list
// const RandomWheelListResponse = createAppErrorUnion(RandomWheelList)

@InputType()
class RandomWheelInput implements Partial<RandomWheel> {
  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => String, { nullable: true })
  accessType?: string

  @Field(() => Int, { nullable: true })
  spinDuration?: number

  @Field(() => Int, { nullable: true })
  fadeDuration?: number
}

@InputType()
class RandomWheelMemberInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String)
  username: string

  @Field(() => String)
  role: string

  @Field(() => Boolean, { nullable: true })
  delete?: boolean
}

const includeRandomWheel = (info: GraphQLResolveInfo) => {
  const resolveInfo = parseResolveInfo(info)
  const fields = resolveInfo?.fieldsByTypeName.RandomWheel ?? {}

  const include: Prisma.RandomWheelInclude = {
    entries: "entries" in fields,
    winners: "winners" in fields && {
      orderBy: { createdAt: "desc" }
    },
    members: "members" in fields && {
      include: { ...includeRandomWheelMember(info) },
    },
    owner: "owner" in fields,
    access: "access" in fields,
    _count: "_count" in fields,
  }

  return include
}

const includeRandomWheelMember = (info: GraphQLResolveInfo) => {
  const resolveInfo = parseResolveInfo(info)

  const membersFields: ResolveTree = ("RandomWheelMember" in (resolveInfo?.fieldsByTypeName ?? {}))
    ? resolveInfo
    : (<any>resolveInfo?.fieldsByTypeName.RandomWheel).members

  const fields = membersFields.fieldsByTypeName.RandomWheelMember

  const include: Prisma.RandomWheelMemberInclude = {
    randomWheel: "randomWheel" in fields,
    role: "role" in fields,
    user: "user" in fields,
  }

  return include
}

@ObjectType("RandomWheel")
class RandomWheelFull extends RandomWheel {
  @Field(() => [RandomWheelEntry])
  entries: RandomWheelEntry[]

  @Field(() => [RandomWheelWinner])
  winners: RandomWheelWinner[]

  @Field(() => [RandomWheelMemberFull])
  members: RandomWheelMember[]

  @Field(() => [AccessType])
  access: AccessType

  @Field(() => User)
  owner: User
}

@ObjectType("RandomWheelMember")
class RandomWheelMemberFull extends RandomWheelMember {
  @Field(() => User)
  user: User

  @Field(() => RandomWheelRole)
  role: RandomWheelRole
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
  async editable(@Root() randomWheel: RandomWheelFull, @Ctx() { req, prisma }: MyContext) {
    if (randomWheel.ownerId === req.session.userId) {
      return true
    }

    const member = await prisma.randomWheelMember.findFirst({
      where: {
        randomWheelId: randomWheel.id,
        userId: req.session.userId,
        roleName: "EDIT",
      },
    })

    return member !== null
  }

  // Wheel

  @Query(() => [RandomWheelFull])
  async myRandomWheels(
    @Ctx() { req, prisma }: MyContext,
    @Info() info: GraphQLResolveInfo
  ) { //: Promise<typeof RandomWheelListResponse> {

    if (!req.session.userId) {
      return {
        errorCode: 401,
        errorMessage: "Not logged in",
      }
    }

    const randomWheels = await prisma.randomWheel.findMany({
      where: {
        ownerId: req.session.userId
      },
      include: {
        ...includeRandomWheel(info)
      },
    })

    return randomWheels

    // return { items: randomWheels }

  }

  // TODO: Only allowed if logged in? (or if private?)
  @Query(() => RandomWheelFull, { nullable: true })
  async randomWheelBySlug(
    @Ctx() { req, prisma }: MyContext,
    @Arg("slug") slug: string,
    @Info() info: GraphQLResolveInfo
  ) { //: Promise<typeof RandomWheelResponse> {
    try {
      // console.log(JSON.stringify(info))
      // info.fieldNodes[0].selectionSet?.selections.forEach(sel => console.log(sel))

      // const resolveInfo = parseResolveInfo(info)
      // const fields = resolveInfo?.fieldsByTypeName.RandomWheelFull ?? {}

      // console.log(fields)

      const wheel = await prisma.randomWheel.findFirst({
        where: {
          slug: slug,
          accessType: !req.session.userId ? "PUBLIC" : undefined,
          OR: [
            { accessType: "PUBLIC" },
            { ownerId: req.session.userId },
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

    } catch (ex: any) {
      console.error(ex)

      return {
        errorCode: 500,
        errorMessage: "Unknown error"
      }
    }
  }

  // FIX return type
  @Mutation(() => RandomWheelFull)
  async createRandomWheel(
    @Ctx() { req, prisma }: MyContext,
    @Arg("name", { nullable: true }) name?: string
  ): Promise<typeof RandomWheelResponse> {
    if (!req.session.userId) {
      return {
        errorCode: 401,
        errorMessage: "Not logged in",
      }
    }

    const tempSlug = `slug-${Date.now()}`

    try {
      const randomWheel = await prisma.randomWheel.create({
        data: {
          slug: tempSlug,
          ownerId: req.session.userId,
          name: name
        }
      })

      const slug = slugify(randomWheel.id, 6)
      // TODO: Use default value for slug in schema to avoid a second update? 
      const newWheel = await prisma.randomWheel.update({
        where: { id: randomWheel.id },
        data: { slug: slug }
      })

      return newWheel
    }
    catch (ex: any) {
      if (ex.code === "P2002") {
        const errorFields = ex.meta.target as string[]

        return {
          errorCode: 400,
          fieldErrors: errorFields.map(field => ({
            field,
            message: `${field[0].toUpperCase() + field.slice(1)} already exists`
          }))
        }
      }

      console.error(ex)

      return {
        errorCode: 500,
        errorMessage: "Unknown error"
      }

    }

  }

  @Mutation(() => RandomWheelFull)
  async updateRandomWheel(
    @Ctx() { prisma, req, socketIo }: MyContext,
    @Arg("id") id: string,
    @Arg("options") wheelOptions: RandomWheelInput
  ): Promise<typeof RandomWheelResponse> {

    // TODO: Middleware to get randomWheel (or any other entity) or return a not found error/permission error
    const randomWheel = await prisma.randomWheel.findUnique({
      where: { id: id }
    })

    if (!randomWheel) {
      return {
        errorCode: 404,
        errorMessage: "Not found"
      }
    }

    if (randomWheel?.ownerId !== req.session.userId || !req.session.userId) {
      // TODO: Proper Error
      return {
        errorCode: 404,
        errorMessage: "Not found"
      }
    }

    try {
      const newWheel = await prisma.randomWheel.update({
        where: { id: id },
        data: wheelOptions
      })

      socketIo.to(`wheel/${newWheel.id}`).emit("wheel:update", "")

      return newWheel
    }

    catch (ex: any) {
      if (ex.code === "P2002") {
        const errorFields = ex.meta.target as string[]

        return {
          errorCode: 400,
          fieldErrors: errorFields.map(field => ({
            field,
            message: `${field[0].toUpperCase() + field.slice(1)} is not available`
          }))
        }
      }

      console.error(ex)

      return {
        errorCode: 500,
        errorMessage: "Unknown error"
      }
    }

  }

  @Mutation(() => AppError, { nullable: true })
  async deleteRandomWheel(
    @Ctx() { prisma, req }: MyContext,
    @Arg("id") id: string
  ): Promise<AppError | null> {
    // TODO: isUuid utility function
    // const uuidRegex = /^[0-9a-f]{8}-?(?:[0-9a-f]{4}-?){3}[0-9a-f]{12}$/i

    const randomWheel = await prisma.randomWheel.findUnique({
      where: { id: id }
    })

    if (!randomWheel) {
      return {
        errorCode: 404,
        errorMessage: "Not found"
      }
    }

    if (randomWheel.ownerId !== req.session.userId) {
      return {
        errorCode: 403,
        errorMessage: "Forbidden"
      }
    }

    // try {
    const deleted = await prisma.randomWheel.delete({ where: { id: id } })

    console.log(deleted)

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
    @Ctx() { prisma, req, socketIo }: MyContext,
    @Arg("randommWheelId") randomWheelId: string,
  ) {

    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWheelId },
      include: {
        entries: true,
      }
    })

    if (!wheel || wheel.entries.length === 0) {
      throw new GraphQLError("Wheel entries may not be empty")
    }

    const winnerIndex = await randomNumber(0, wheel.entries.length)
    const winnerEntry = wheel.entries[winnerIndex]

    const winner = await prisma.randomWheelWinner.create({
      data: {
        randomWheelId,
        name: winnerEntry.name,
        drawnById: req.session.userId,
        winnerIndex,
      }
    })

    // const rotateDuration = Math.round(wheel.spinDuration / 1000)
    // const rotations = ~~random(rotateDuration - 1, rotateDuration + 1)

    const sectorDeg = 360 / wheel.entries.length
    const winnerDeg = random(0.1, 0.9)

    const newRotation = (360 - winnerIndex * sectorDeg) - (sectorDeg * winnerDeg) + 90
    // console.warn({ winnerIndex, rotateDuration, rotations, sectorDeg, winnerDeg, newRotation })

    await prisma.randomWheel.update({
      where: { id: wheel.id },
      data: { rotation: newRotation % 360 },
    })

    socketIo.to(`wheel/${wheel.id}`).emit("wheel:spin", {
      winner: winner,
      entry: winnerEntry,
      rotation: newRotation % 360,
    })

    console.log(`emit to wheel/${wheel.id.substring(0, 6)} (${socketIo.in(`wheel/${wheel.id}`).allSockets.length}) wheel:spin`)

    // console.log({ winnerIndex, newRotation: newRotation % 360 })

    // TODO: Fire websocket event here
    // Maybe add win chance (1 / entries) to winner?
    // Fix Max width winner tab

    // TODO: Add winner index to Winner?
    // Add currentRotation to RandomWheel (and other wheelOptions, like spinDuration)

    return winner
  }

  // Entry

  // TODO: Error Handling with Middleware

  @Mutation(() => RandomWheelEntry)
  async addRandomWheelEntry(
    @Ctx() { prisma, socketIo }: MyContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("name") name: string,
  ) {

    const entry = await prisma.randomWheelEntry.create({
      data: {
        randomWheelId,
        name
      }
    })

    socketIo.to(`wheel/${randomWheelId}`).emit("wheel:entries", "add")
    // console.log(`emit to wheel:entries`)

    return entry
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRandomWheelEntry(
    @Ctx() { prisma, socketIo }: MyContext,
    @Arg("id") id: string
  ) {
    const entry = await prisma.randomWheelEntry.delete({
      where: { id }
    })

    socketIo.to(`wheel/${entry.randomWheelId}`).emit("wheel:entries", "delete")
    // console.log(`emit wheel:entries`)

    return true
  }

  @Mutation(() => Int)
  async clearRandomWheel(
    @Ctx() { prisma, socketIo }: MyContext,
    @Arg("id") id: string
  ) {
    const res = await prisma.randomWheelEntry.deleteMany({
      where: { randomWheelId: id },
    })

    await prisma.randomWheel.update({
      where: { id: id },
      data: { rotation: 0 },
    })

    socketIo.to(`wheel/${id}`).emit("wheel:entries", "clear")
    // console.log(`emit to wheel:entries c`)

    return res.count
  }

  @Mutation(() => [RandomWheelMemberFull], { nullable: true })
  async updateRandomWheelMembers(
    @Ctx() { prisma, req }: MyContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("randomWheelId") randomWwheelId: string,
    @Arg("members", () => [RandomWheelMemberInput]) members: RandomWheelMemberInput[],
  ) {
    // TODO: Validate username input

    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWwheelId },
      select: { ownerId: true },
    })

    if (wheel?.ownerId !== req.session.userId || !req.session.userId) {
      return null
    }

    // TODO: Optimize to do this in one sql query
    const newMembers = members.map(async (memberInput) => {
      // TODO: Move wheel auth to middleware or @Auth or so
      const member = await prisma.randomWheelMember.findFirst({
        where: {
          randomWheelId: randomWwheelId,
          user: { username: memberInput.username },
        },
        include: {
          ...includeRandomWheelMember(info),
        },
      })

      if (memberInput.delete) {
        if (member) {
          await prisma.randomWheelMember.delete({
            where: { id: member.id }
          })
        }

        return null
      }

      if (member?.roleName === memberInput.role) {
        return member
      }

      if (member) {
        return await prisma.randomWheelMember.update({
          where: { id: member.id },
          data: { roleName: memberInput.role },
        })
      } else {
        const userToUpdate = await prisma.user.findUnique({
          where: { username: memberInput.username },
        })

        return await prisma.randomWheelMember.create({
          data: {
            randomWheelId: randomWwheelId,
            userId: userToUpdate?.id ?? "",
            roleName: memberInput.role,
          }
        })
      }
    })

    return (await Promise.all(newMembers)).filter(member => member)
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRandomWheelMember(
    @Ctx() { prisma, req }: MyContext,
    @Arg("id") id: string
  ) {

    const member = await prisma.randomWheelMember.findUnique({
      where: { id: id },
      include: {
        randomWheel: {
          select: { ownerId: true },
        },
      },
    })

    if (member?.randomWheel.ownerId !== req.session.userId || !req.session.userId) {
      return false
    }

    await prisma.randomWheelMember.delete({
      where: { id },
    })

    // TODO: Realtime update with socket?

    return true
  }

}
