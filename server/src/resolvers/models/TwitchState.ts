import { Field, ObjectType } from "type-graphql"

@ObjectType("TwitchState")
export class TwitchState {
  @Field()
  state: string
}
