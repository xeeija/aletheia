import { RandomWheel } from "@/resolvers/index.js"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("AccessType")
export class AccessType {
  @Field()
  type: string

  randomWheel?: RandomWheel[]

  @Field(() => AccessTypeCount, { nullable: true })
  _count?: AccessTypeCount | null
}

@ObjectType("AccessTypeCount")
export class AccessTypeCount {
  @Field(() => Int)
  randomWheel: number
}
