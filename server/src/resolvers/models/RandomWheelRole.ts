import { RandomWheelMember } from "@/resolvers/index.js"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("RandomWheelRole")
export class RandomWheelRole {
  @Field()
  name: string

  @Field(() => String, { nullable: true })
  description?: string | null

  members?: RandomWheelMember[]

  @Field(() => RandomWheelRoleCount, { nullable: true })
  _count?: RandomWheelRoleCount | null
}

@ObjectType("RandomWheelRoleCount", {})
export class RandomWheelRoleCount {
  @Field(() => Int)
  members: number
}
