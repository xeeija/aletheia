import { RandomWheel, RandomWheelRole, User } from "@/resolvers/models/index.js"
import { Field, ObjectType } from "type-graphql"

@ObjectType("RandomWheelMember")
export class RandomWheelMember {
  @Field()
  id: string

  randomWheel?: RandomWheel

  @Field()
  randomWheelId: string

  user?: User

  @Field()
  userId: string

  role?: RandomWheelRole

  @Field()
  roleName: string
}
