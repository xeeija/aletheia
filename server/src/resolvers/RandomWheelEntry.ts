import { RandomWheelEntry } from "@/generated/graphql/index.js"
import type { GraphqlContext } from "@/types.js"
import { GraphQLError } from "graphql"
import { Arg, Ctx, Field, InputType, Int, Mutation, Resolver } from "type-graphql"

@InputType()
export class RandomWheelEntryInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  color?: string

  @Field(() => Int, { nullable: true })
  weight?: number
}

@Resolver()
export class RandomWheelEntryResolver {
  // Entry

  // TODO: Error Handling with Middleware

  @Mutation(() => RandomWheelEntry)
  async addRandomWheelEntry(
    @Ctx() { prisma, socketIo }: GraphqlContext,
    @Arg("randomWheelId") randomWheelId: string,
    @Arg("name") name: string,
    @Arg("color", () => String, { nullable: true }) color?: string | null,
    @Arg("weight", { nullable: true }) weight?: number
  ) {
    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWheelId },
    })

    if (wheel?.uniqueEntries) {
      const existingEntry = await prisma.randomWheelEntry.findFirst({
        where: {
          randomWheelId: randomWheelId,
          name: {
            equals: name,
            mode: "insensitive",
          },
        },
      })

      if (existingEntry) {
        throw new GraphQLError("Entry already exists in wheel")
      }
    }

    const entry = await prisma.randomWheelEntry.create({
      data: {
        randomWheelId,
        name,
        color,
        weight,
      },
    })

    socketIo.to(`wheel/${randomWheelId}`).emit("wheel:entries", "add")
    // console.log(`emit to wheel:entries`)

    return entry
  }

  @Mutation(() => RandomWheelEntry)
  async updateRandomWheelEntry(
    @Ctx() { prisma, socketIo }: GraphqlContext,
    @Arg("id") id: string,
    @Arg("entry") entry: RandomWheelEntryInput
  ) {
    // only fetch wheel for duplicate check if name is updated
    if (entry.name) {
      const existingEntry = await prisma.randomWheelEntry.findUnique({
        where: { id: id },
        include: {
          randomWheel: true,
        },
      })

      if (existingEntry?.randomWheel?.uniqueEntries) {
        const duplicateEntry = await prisma.randomWheelEntry.findFirst({
          where: {
            randomWheelId: existingEntry.randomWheelId,
            name: {
              equals: entry.name ?? existingEntry.name,
              mode: "insensitive",
            },
          },
        })

        if (duplicateEntry) {
          throw new GraphQLError("Entry already exists in wheel")
        }
      }
    }

    const updatedEntry = await prisma.randomWheelEntry.update({
      where: { id },
      data: entry,
    })

    socketIo.to(`wheel/${updatedEntry.randomWheelId}`).emit("wheel:entries", "update")

    return updatedEntry
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRandomWheelEntry(@Ctx() { prisma, socketIo }: GraphqlContext, @Arg("id") id: string) {
    const entry = await prisma.randomWheelEntry.delete({
      where: { id },
    })

    socketIo.to(`wheel/${entry.randomWheelId}`).emit("wheel:entries", "delete")
    // console.log(`emit wheel:entries`)

    return true
  }

  @Mutation(() => Int)
  async clearRandomWheel(@Ctx() { prisma, socketIo }: GraphqlContext, @Arg("id") id: string) {
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
}
