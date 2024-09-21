import { ColorTheme } from "@/resolvers/models/index.js"
import type { GraphqlContext } from "@/types.js"
import { Arg, Ctx, Field, InputType, Query, Resolver } from "type-graphql"

@InputType()
export class ColorThemeInput {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  colors: string[]
}

@Resolver(() => ColorTheme)
export class ColorThemeResolver {
  @Query(() => [ColorTheme])
  async colorThemes(
    @Ctx() { req, prisma }: GraphqlContext,
    // @Info() info: GraphQLResolveInfo,
    @Arg("type", { defaultValue: "all" }) type: "all" | "my" | "global"
  ) {
    if (!["all", "my", "global"].includes(type)) {
      // TODO: unsupported type, maybe use enum instead and throw proper Graphql Error
      return []
    }

    const themes = await prisma.colorTheme.findMany({
      where: {
        OR: [
          { global: type === "all" || type === "global" ? true : undefined },
          { creatorId: type === "all" || type === "my" ? req.session.userId ?? "" : undefined },
        ],
      },
      orderBy: {
        name: "asc",
      },
    })

    return themes
  }
}
