import { RandomWheel, RandomWheelRole, User } from "@/resolvers/index.js"
import { Field, InputType, ObjectType } from "type-graphql"

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

@ObjectType("RandomWheelMember")
export class RandomWheelMemberFull extends RandomWheelMember {
  @Field(() => User)
  declare user: User

  @Field(() => RandomWheelRole)
  declare role: RandomWheelRole
}

@InputType()
export class RandomWheelMemberInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String)
  username: string

  @Field(() => String)
  role: string

  @Field(() => Boolean, { nullable: true })
  delete?: boolean
}
