import { RandomWheel, User } from "@/resolvers/models/index.js"
import { Field, ObjectType } from "type-graphql"

@ObjectType("RandomWheelLike")
export class RandomWheelLike {
  @Field()
  id: string

  user?: User

  @Field()
  userId: string

  randomWheel?: RandomWheel

  @Field()
  randomWheelId: string

  @Field(() => Date)
  createdAt: Date
}
