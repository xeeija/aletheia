import { RandomWheel, User } from "@/resolvers/index.js"
import { Field, InputType, Int, ObjectType } from "type-graphql"

@ObjectType("RandomWheelWinner")
@InputType("RandomWheelWinnerInput")
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
