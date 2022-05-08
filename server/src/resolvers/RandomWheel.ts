import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { RandomWheel } from "../../dist/generated/typegraphql-prisma";
import { AppError, createAppErrorUnion, ListType } from "./common/types";

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
const RandomWheelListResponse = createAppErrorUnion(RandomWheelList)

@InputType()
class RandomWheelInput implements Partial<RandomWheel> {
  @Field(() => String, { nullable: true })

  name?: string | null | undefined;
  @Field(() => String, { nullable: true })
  slug?: string | undefined;
}

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

  @Query(() => RandomWheelListResponse)
  async myRandomWheels(
    @Ctx() { req, prisma }: MyContext
  ): Promise<typeof RandomWheelListResponse> {

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
    })

    return { items: randomWheels }

  }

  // TODO: Only allowed if logged in? (or if private?)
  @Query(() => RandomWheelResponse)
  async randomWwheelBySlug(
    @Ctx() { prisma }: MyContext,
    @Arg("slug") slug: string
  ): Promise<typeof RandomWheelResponse> {
    try {
      const wheel = await prisma.randomWheel.findUnique({
        where: { slug: slug }
      })

      if (wheel) {
        return wheel
      }

      return {
        errorCode: 404,
        errorMessage: "Not found"
      }

    } catch (ex: any) {
      console.error(ex)

      return {
        errorCode: 500,
        errorMessage: "Unknown error"
      }
    }
  }

  @Mutation(() => RandomWheelResponse)
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
    const slug = `slug-${Date.now()}`

    try {
      const randomWheel = await prisma.randomWheel.create({
        data: {
          slug: slug,
          ownerId: req.session.userId,
          name: name
        }
      })

      return randomWheel
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

  @Mutation(() => RandomWheelResponse)
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

  // TODO

}