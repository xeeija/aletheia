import { User } from "../../dist/generated/typegraphql-prisma";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
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

@InputType()
class UserInput implements Partial<User> {
  @Field({ nullable: true })
  username?: string

  @Field({ nullable: true })
  displayname?: string
}

@Resolver()
export class UserResolver {

  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req, prisma }: MyContext
  ) {
    // Not logged in
    if (!req.session.userId) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: req.session.userId }
    })

    return user
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("username") username: string,
    @Arg("displayname", { nullable: true }) displayname: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: MyContext,
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


    const passwordHash = await argon2.hash(password)

    try {
      const user = await prisma.user.create({
        data: {
          username,
          displayname,
          password: passwordHash
        }
      })

      // Log the user in directly
      req.session.userId = user.id

      return { user }

    } catch (ex: any) {

      console.log(ex.message)

      // User_username_key

      if ((ex.message as string).includes("User_username_key")) {
        return {
          errors: [{
            field: "username",
            message: "Username already exists"
          }]
        }
      } else {
        throw ex
      }

    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() { req, prisma }: MyContext,
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

    if (user === null || !await argon2.verify(user.password, password)) {
      return {
        errors: [
          { field: "password", message: "Username or password incorrect" }
        ]
      }
    }

    // set a cookie to log the user in
    req.session.userId = user.id

    return { user }
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() { req, res }: MyContext,
  ): Promise<boolean> {

    if (!req.session.userId) {
      // Not logged in
      return false
    }

    // Create Promise and resolve it in session destroy callback
    return new Promise<boolean>((resolve) => {
      req.session.destroy((err) => {
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
  async updateUser(
    @Arg("user") user: UserInput,
    @Ctx() { req, prisma }: MyContext
  ): Promise<UserResponse> {

    let errors: FieldError[] = []

    // Handle field errors

    // if (user.username !== undefined) {
    if (!user.username) {
      errors.push({ field: "username", message: "Username may not be empty" })
    }

    const usernameExists = await prisma.user.count({
      where: {
        username: user.username,
        id: { not: req.session.userId }
      }
    })

    if (usernameExists) {
      errors.push({ field: "username", message: "Username already exists" })
    }
    // }

    if (errors.length > 0) return { errors }

    const newUser = await prisma.user.update({ where: { id: req.session.userId }, data: user })

    return { user: newUser }

  }

}