import { RandomWheel } from "@/resolvers/models/index.js"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("RandomWheelEntry")
export class RandomWheelEntry {
  @Field()
  id: string

  randomWheel?: RandomWheel

  @Field()
  randomWheelId: string

  @Field()
  name: string

  @Field(() => Date)
  createdAt: Date

  @Field(() => Int)
  weight: number

  @Field(() => String, { nullable: true })
  color?: string | null

  @Field(() => String, { nullable: true })
  redemptionId?: string | null
}
