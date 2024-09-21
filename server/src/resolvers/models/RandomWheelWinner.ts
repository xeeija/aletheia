import { RandomWheel, User } from "@/resolvers/models/index.js"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("RandomWheelWinner")
export class RandomWheelWinner {
  @Field()
  id: string

  randomWheel?: RandomWheel

  @Field()
  randomWheelId: string

  @Field()
  name: string

  @Field(() => Date)
  createdAt: Date

  drawnBy?: User | null

  @Field(() => String, { nullable: true })
  drawnById?: string | null

  @Field(() => Int, { nullable: true })
  winnerIndex?: number | null
}
