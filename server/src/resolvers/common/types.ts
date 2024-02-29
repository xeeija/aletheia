import { ObjectType, Field, Int, createUnionType, ClassType } from "type-graphql"

// create a list type of a class (type) as workaround for union types
export function ListType<C>(itemClass: ClassType<C>) {
  @ObjectType({ isAbstract: true })
  abstract class ListTypeClass {
    @Field(() => [itemClass])
    items: C[]
  }
  return ListTypeClass
}

export function createAppErrorUnion<C extends object>(classType: ClassType<C>, name?: string) {
  const union = createUnionType({
    name: `${classType.name ?? name}Response`,
    types: () => [classType, AppError] as const,
    resolveType: (value) => {
      if ("errorMessage" in value || "fieldErrors" in value) return AppError
      else return classType
    },
  })
  return union
}

@ObjectType()
export class AppError {
  @Field({ nullable: true })
  errorMessage?: string

  @Field(() => Int)
  errorCode: number

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
