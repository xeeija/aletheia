import { User } from "@/resolvers/index.js"
import { BigIntResolver } from "graphql-scalars"
import { Field, Int, ObjectType } from "type-graphql"

@ObjectType("UserAccessToken")
export class UserAccessToken {
  @Field()
  id: string

  user?: User

  @Field()
  userId: string

  accessToken?: string

  refreshToken?: string | null

  @Field(() => [String])
  scope: string[]

  @Field(() => Int)
  expiresIn: number

  @Field(() => BigIntResolver)
  obtainmentTimestamp: bigint

  @Field(() => String, { nullable: true })
  twitchUserId?: string | null

  @Field(() => String, { nullable: true })
  twitchUsername?: string | null
}
