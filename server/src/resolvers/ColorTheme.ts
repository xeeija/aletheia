import { Field, InputType } from "type-graphql"

@InputType()
export class ColorThemeInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  colors: string[]
}
