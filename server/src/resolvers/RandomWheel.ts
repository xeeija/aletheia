import { MyContext } from "src/types";
import { Arg, createUnionType, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { RandomWheel } from "../../dist/generated/typegraphql-prisma";
import { Error } from "./common";

@ObjectType()
class RandomWheelsResponse {
  @Field(() => [RandomWheel], { nullable: true })
  randomWheels?: RandomWheel[]

  @Field(() => Error, { nullable: true })
  error?: Error
}

const RandomWheelUnion = createUnionType({
  name: "RandomWheelUnion",
  types: () => [RandomWheel, Error] as const,
  resolveType: (value => {
    if ("errorMessage" in value || "fieldErrors" in value) return Error
    else return RandomWheel
  })
})

@Resolver()
export class RandomWheelResolver {
  // [x] get my wheels
  // [ ] get wheel by slug
  // [x] create wheel
  // [ ] update wheel (how exactly? -> split in multiple mutations)
  // [ ] delete wheel

  // [ ] add entry
  // [ ] remove entry
  // [ ] spin (draw a winner)
  // [ ] clear all entries

  @Mutation(() => RandomWheelUnion)
  async createRandomWheel(
    @Ctx() { req, prisma }: MyContext,
    @Arg("name", { nullable: true }) name?: string
  ): Promise<RandomWheel | Error> {
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

      console.error(ex)

      if (ex.code === "P2002") {
        const errorFields = ex.meta.target as string[]

        return {
          errorCode: 400,
          fieldErrors: errorFields.map(field => ({
            field,
            message: `${field[0].toUpperCase() + field.slice(1)} already exists`
          }))
        }
      } else {
        return {
          errorCode: 500,
          errorMessage: "Unknown error"
        }
      }
    }

  }

  @Query(() => RandomWheelsResponse)
  async getRandomWheelsOfCurrentUser(
    @Ctx() { req, prisma }: MyContext
  ): Promise<RandomWheelsResponse> {

    if (!req.session.userId) {
      return {
        error: {
          errorCode: 401,
          errorMessage: "Not logged in",
        }
      }
    }

    const randomWheels = await prisma.randomWheel.findMany({
      where: {
        ownerId: req.session.userId
      },
    })

    return { randomWheels }

  }

}