import { ColorTheme } from "@/resolvers/index.js"
import type { GraphqlContext } from "@/types.js"
import { Arg, Ctx, Query, Resolver } from "type-graphql"

const AllColorThemeTypes = ["all", "my", "global"] as const
type ColorThemeType = (typeof AllColorThemeTypes)[number]

const isColorThemeType = (value: string): value is ColorThemeType => {
  return AllColorThemeTypes.includes(value as ColorThemeType)
}

@Resolver(() => ColorTheme)
export class ColorThemeResolver {
  @Query(() => [ColorTheme])
  async colorThemes(
    @Ctx() { req, prisma }: GraphqlContext,
    // @Info() info: GraphQLResolveInfo,
    @Arg("type", { defaultValue: "all" }) type: ColorThemeType
  ) {
    if (!isColorThemeType(type)) {
      throw new Error(`Invalid type. Must be one of: ${AllColorThemeTypes.join(", ")}`)
    }

    const themes = await prisma.colorTheme.findMany({
      where: {
        OR: [
          { global: type === "all" || type === "global" ? true : undefined },
          { creatorId: type === "all" || type === "my" ? req.session.userId ?? null : undefined },
        ],
      },
      orderBy: {
        name: "asc",
      },
    })

    return themes
  }
}
