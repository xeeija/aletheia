import { FieldError, User, UserAccessToken, UserInput } from "@/resolvers/index.js"
import type { GraphqlContext } from "@/types.js"
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"
import { hash, verify } from "argon2"
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql"

// TODO: Refactor to "throw" graphql errors instead of returning? -- NO, maybe union types

@ObjectType()
class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, prisma }: GraphqlContext) {
    // Not logged in
    if (!req.session.userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId },
    })

    return user
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("displayname", { nullable: true }) displayname: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: GraphqlContext
  ): Promise<UserResponse> {
    let errors: FieldError[] = []

    // Handle empty fields
    if (!username) {
      errors = [...errors, { field: "username", message: "Username may not be empty" }]
    }
    if (!password) {
      errors = [...errors, { field: "password", message: "Password may not be empty" }]
    }
    if (errors.length > 0) return { errors }

    const passwordHash = await hash(password)

    try {
      const user = await prisma.user.create({
        data: {
          username,
          displayname,
          password: passwordHash,
        },
      })

      // Log the user in directly
      req.session.userId = user.id

      return { user }
    } catch (ex: unknown) {
      // User_username_key
      // P2002: unique constraint failed

      // ex is prisma client error
      if (ex instanceof PrismaClientKnownRequestError) {
        if (ex.code === "P2002") {
          const errorFields = ex.meta?.target as string[]

          return {
            errors: errorFields.map((field) => ({
              field,
              message: `${field[0].toUpperCase() + field.slice(1)} already exists`,
            })),
          }
        }
        throw ex
      } else {
        throw ex
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: GraphqlContext
  ): Promise<UserResponse> {
    let errors: FieldError[] = []

    // Handle empty fields
    if (!username) {
      errors = [...errors, { field: "username", message: "Username may not be empty" }]
    }
    if (!password) {
      errors = [...errors, { field: "password", message: "Password may not be empty" }]
    }
    if (errors.length > 0) return { errors }

    const user = await prisma.user.findUnique({ where: { username } })

    if (user === null || !(await verify(user.password, password))) {
      return {
        errors: [{ field: "password", message: "Username or password incorrect" }],
      }
    }

    // set a cookie to log the user in
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: GraphqlContext): Promise<boolean> {
    if (!req.session.userId) {
      // Not logged in
      return false
    }

    // Create Promise and resolve it in session destroy callback
    return new Promise<boolean>((resolve) => {
      req.session.destroy((err: unknown) => {
        if (err) {
          console.log("Can't destroy session: ", { err })
          resolve(false)
        }

        // If we made it here, it worked

        // Clear cookie in the browser
        res.clearCookie("asid")

        resolve(true)
      })
    })
  }

  @Mutation(() => UserResponse)
  async updateUser(@Arg("user") user: UserInput, @Ctx() { req, prisma }: GraphqlContext): Promise<UserResponse> {
    const errors: FieldError[] = []

    // Handle field errors

    // if (user.username !== undefined) {
    if (!user.username) {
      errors.push({ field: "username", message: "Username may not be empty" })
    }

    const usernameExists = await prisma.user.count({
      where: {
        username: user.username,
        id: { not: req.session.userId },
      },
    })

    if (usernameExists) {
      errors.push({ field: "username", message: "Username already exists" })
    }
    // }

    if (errors.length > 0) return { errors }

    const newUser = await prisma.user.update({ where: { id: req.session.userId }, data: user })

    return { user: newUser }
  }

  // Actually could be a query, because it doesnt mutate anything,
  // but queries can't easily be executed imperatively with urql
  @Mutation(() => Boolean)
  async usernameExists(@Ctx() { prisma }: GraphqlContext, @Arg("username") username: string) {
    const userExists = await prisma.user.count({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },
      },
    })

    return userExists > 0
  }

  @Query(() => UserAccessToken, { nullable: true })
  async userAccesToken(@Ctx() { prisma, req }: GraphqlContext) {
    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    return token
  }

  @Mutation(() => Boolean)
  async disconnectAccessToken(@Ctx() { prisma, req }: GraphqlContext) {
    const token = await prisma.userAccessToken.findFirst({
      where: {
        userId: req.session.userId ?? "",
      },
    })

    if (token?.refreshToken) {
      const response = await fetch(
        `https://id.twitch.tv/oauth2/revoke?client_id=${process.env.TWITCH_CLIENT_ID}&token=${token.refreshToken}`,
        {
          method: "POST",
        }
      )

      // token succesfully revoked or token was already invalid
      if (!response.ok && response.status !== 400) {
        console.error(
          "error revoking twitch refresh token:",
          response.status,
          response.statusText,
          "\n",
          await response.text()
        )
        throw new Error(
          `error revoking twitch refresh token: ${response.status}, ${response.statusText}\n ${await response.text()}`
        )
      }
    }

    if (token?.accessToken) {
      const response = await fetch(
        `https://id.twitch.tv/oauth2/revoke?client_id=${process.env.TWITCH_CLIENT_ID}&token=${token.accessToken}`,
        {
          method: "POST",
        }
      )

      // token succesfully revoked or token was already invalid
      if (!response.ok && response.status !== 400) {
        console.error(
          "error revoking twitch refresh token:",
          response.status,
          response.statusText,
          "\n",
          await response.text()
        )
        throw new Error(
          `error revoking twitch refresh token: ${response.status}, ${response.statusText}\n ${await response.text()}`
        )
      }
    }

    await prisma.userAccessToken.delete({
      where: {
        id: token?.id,
      },
    })

    return true
  }
}
