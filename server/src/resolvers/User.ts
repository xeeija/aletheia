import { PrismaClient } from "@prisma/client";
import { User } from "@generated/type-graphql";
import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import argon2 from "argon2"

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
    @Arg("password") password: string
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

    return { user }
  }
}