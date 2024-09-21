import { RandomWheel, User } from "@/resolvers/index.js"
import { Field, InputType, Int, ObjectType } from "type-graphql"

@ObjectType("ColorTheme")
export class ColorTheme {
  @Field()
  id: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => [String])
  colors: string[]

  creator?: User | null

  @Field(() => String, { nullable: true })
  creatorId?: string | null

  @Field()
  global: boolean

  randomWheels?: RandomWheel[]

  usersStandard?: User[]

  @Field(() => ColorThemeCount, { nullable: true })
  _count?: ColorThemeCount | null
}

@ObjectType("ColorThemeCount")
export class ColorThemeCount {
  @Field(() => Int)
  randomWheels: number

  @Field(() => Int)
  usersStandard: number
}

@InputType()
export class ColorThemeInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  colors: string[]
}
