import { MyContext } from "src/types";
import { slugify } from "../utils/slug";
import { Arg, Ctx, Field, Info, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { RandomWheel, RandomWheelEntry, RandomWheelMember, RandomWheelWinner, User } from "../../dist/generated/typegraphql-prisma";
import { AppError, createAppErrorUnion, ListType } from "./common/types";
import { GraphQLResolveInfo } from "graphql";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import { Prisma } from "@prisma/client";

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

@ObjectType("RandomWheelList")
class RandomWheelList extends ListType(RandomWheel) { }

// workaround: generic RandomWheelList type: with "items" property that is the list
// const RandomWheelListResponse = createAppErrorUnion(RandomWheelList)

@InputType()
class RandomWheelInput implements Partial<RandomWheel> {
  @Field(() => String, { nullable: true })

  name?: string | null | undefined;
  @Field(() => String, { nullable: true })
  slug?: string | undefined;
}

const includeRandomWheel = (info: GraphQLResolveInfo) => {
  const resolveInfo = parseResolveInfo(info)
  const fields = resolveInfo?.fieldsByTypeName.RandomWheel ?? {}

  const include: Prisma.RandomWheelInclude = {
    entries: "entries" in fields,
    winners: "winners" in fields && {
      orderBy: { createdAt: "desc" }
    },
    members: "members" in fields,
    owner: "owner" in fields,
    _count: "_count" in fields,
  }

  return { include }
}

@ObjectType("RandomWheel")
class RandomWheelFull extends RandomWheel {
  @Field(() => [RandomWheelEntry])
  entries: RandomWheelEntry[]

  @Field(() => [RandomWheelWinner])
  winners: RandomWheelWinner[]

  @Field(() => [RandomWheelMember])
  members: RandomWheelMember[]

  @Field(() => User)
  owner: User
}

// @ObjectType()
// class RandomWheelEntryResponse extends BaseResponse {
//   @Field(() => RandomWheelEntry, { nullable: true })
//   entries?: RandomWheelEntry
// }

@Resolver()
export class RandomWheelResolver {
  // [x] get my wheels
  // [x] get wheel by slug
  // [x] create wheel
  // [x] update wheel (how exactly? -> split in multiple mutations)
  // [x] delete wheel

  // [ ] spin (draw a winner)
  // [ ] add entry
  // [ ] remove entry
  // [ ] clear all entries

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
      ...includeRandomWheel(info)
    })

    return randomWheels

    // return { items: randomWheels }

  }

  // TODO: Only allowed if logged in? (or if private?)
  @Query(() => RandomWheelFull, { nullable: true })
  async randomWheelBySlug(
    @Ctx() { prisma }: MyContext,
    @Arg("slug") slug: string,
    @Info() info: GraphQLResolveInfo
  ) { //: Promise<typeof RandomWheelResponse> {
    try {
      // console.log(JSON.stringify(info))
      // info.fieldNodes[0].selectionSet?.selections.forEach(sel => console.log(sel))

      // const resolveInfo = parseResolveInfo(info)
      // const fields = resolveInfo?.fieldsByTypeName.RandomWheelFull ?? {}

      // console.log(fields)

      const wheel = await prisma.randomWheel.findUnique({
        where: { slug: slug },
        ...includeRandomWheel(info),
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

    // TODO: generate slug in base 64 (custom)
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

  // FIX return type
  @Mutation(() => RandomWheelFull)
  async updateRandomWheel(
    @Ctx() { prisma, req }: MyContext,
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

    if (randomWheel.ownerId !== req.session.userId) {
      return {
        errorCode: 403,
        errorMessage: "Forbidden"
      }
    }

    try {
      const newWheel = await prisma.randomWheel.update({
        where: { id: id },
        data: wheelOptions
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

    if (id.length !== 36 && id.length !== 32) {
      return {
        errorCode: 400,
        fieldErrors: [{ field: "id", message: "Must be a valid UUID" }]
      }
    }

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

    try {
      await prisma.randomWheel.delete({ where: { id: id } })

      return null
    }
    catch {
      return {
        errorCode: 500,
        errorMessage: "Unknown error"
      }
    }
  }

  // Entry

  // TODO: Error Handling with Middleware

  @Mutation(() => RandomWheelEntry)
  async addRandomWheelEntry(
    @Ctx() { prisma }: MyContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("name") name: string,
  ) {

    const entry = await prisma.randomWheelEntry.create({
      data: {
        randomWheelId,
        name
      }
    })

    return entry
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRandomWheelEntry(
    @Ctx() { prisma }: MyContext,
    @Arg("id") id: string
  ) {
    await prisma.randomWheelEntry.delete({
      where: { id }
    })

    return true
  }

  @Mutation(() => RandomWheelWinner)
  async addWinner(
    @Ctx() { prisma, req }: MyContext,
    @Arg("randommWheelId") randomWwheelId: string,
    @Arg("name") name: string
  ) {
    const newWinner = await prisma.randomWheelWinner.create({
      data: {
        name: name,
        randomWheelId: randomWwheelId,
        drawnById: req.session.userId
      }
    })

    return newWinner
  }

}