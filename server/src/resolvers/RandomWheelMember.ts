import { RandomWheelMemberFull, RandomWheelMemberInput } from "@/resolvers/index.js"
import type { GraphqlContext } from "@/types.js"
import { loggerGraphql as logger } from "@/utils/index.js"
import { Prisma } from "@prisma/client"
import type { GraphQLResolveInfo } from "graphql"
import { FieldsByTypeName, ResolveTree, parseResolveInfo } from "graphql-parse-resolve-info"
import { Arg, Ctx, Info, Mutation, Resolver } from "type-graphql"

export const includeRandomWheelMember = (info: GraphQLResolveInfo) => {
  const resolveInfo = parseResolveInfo(info)

  try {
    // TODO: Fix without eslint-disable
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    const fallbackMembers: ResolveTree | FieldsByTypeName | null | undefined = (<Record<string, any>>(
      resolveInfo?.fieldsByTypeName.RandomWheel
    ))?.members

    const membersFields: ResolveTree | FieldsByTypeName | null | undefined =
      "RandomWheelMember" in (resolveInfo?.fieldsByTypeName ?? {}) ? resolveInfo : fallbackMembers

    const fields = membersFields?.fieldsByTypeName.RandomWheelMember

    const include: Prisma.RandomWheelMemberInclude = {
      randomWheel: "randomWheel" in (fields ?? {}),
      role: "role" in (fields ?? {}),
      user: "user" in (fields ?? {}),
    }

    return include
  } catch (err) {
    logger.error("Error in includeRandomWheelMember:", err)
    return {}
  }
}

@Resolver()
export class RandomWheelMemberResolver {
  @Mutation(() => [RandomWheelMemberFull], { nullable: true })
  async updateRandomWheelMembers(
    @Ctx() { prisma, req, socketIo }: GraphqlContext,
    @Info() info: GraphQLResolveInfo,
    @Arg("randomWheelId") randomWwheelId: string,
    @Arg("members", () => [RandomWheelMemberInput]) members: RandomWheelMemberInput[]
  ) {
    // TODO: Validate username input

    const wheel = await prisma.randomWheel.findUnique({
      where: { id: randomWwheelId },
      select: {
        id: true,
        ownerId: true,
      },
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
            where: { id: member.id },
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
          },
        })
      }
    })

    const finishedMembers = (await Promise.all(newMembers)).filter((member) => member)

    socketIo.to(`wheel/${wheel.id}`).emit("wheel:update", "members")

    return finishedMembers
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteRandomWheelMember(@Ctx() { prisma, req, socketIo }: GraphqlContext, @Arg("id") id: string) {
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

    socketIo.to(`wheel/${member.randomWheelId}`).emit("wheel:update", "members")

    return true
  }
}
