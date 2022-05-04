import { ObjectType, Field, Int } from "type-graphql"

@ObjectType()
export class Error {
  @Field({ nullable: true })
  errorMessage?: string

  @Field(() => Int, { nullable: true })
  errorCode?: number

  @Field(() => [FieldError], { nullable: true })
  fieldErrors?: FieldError[]
}

@ObjectType()
export class FieldError {
  @Field()
  field: string = ""

  @Field()
  message: string = ""
}
