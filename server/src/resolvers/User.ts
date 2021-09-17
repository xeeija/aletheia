import { PrismaClient } from "@prisma/client";
import { User } from "../../dist/generated/typegraphql-prisma";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from "argon2"
import { MyContext } from "src/types";

// TODO: Refactor to "throw" graphql errors instead of returning?

@ObjectType()
class FieldError {
  @Field()
  field: string = ""

  @Field()
  message: string = ""
}

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
  async me(
    @Ctx() { req }: MyContext
  ) {
    // Not logged in
    if (!req.session.userId) {
      return null
    }

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({
      where: { id: req.session.userId }
    })

    return user
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<UserResponse> {

    const passwordHash = await argon2.hash(password)

    const prisma = new PrismaClient()
    try {
      const user = await prisma.user.create({
        data: {
          username,
          password: passwordHash
        }
      })
      return { user }

    } catch (ex: any) {
      console.log(ex.message)

      // User_username_key

      return {
        errors: [{
          field: "username",
          message: "username already exists"
        }]
      }
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {

    const prisma = new PrismaClient()
    const user = await prisma.user.findUnique({ where: { username } })

    if (user === null || !await argon2.verify(user.password, password)) {
      return {
        errors: [
          { field: "username", message: "Username or password incorrect" }
        ]
      }
    }

    // set a cookie to log the user in
    req.session.userId = user.id

    return { user }
  }
}