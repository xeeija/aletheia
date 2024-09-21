import { CustomReward } from "@/resolvers/index.js"
import { HelixCustomReward } from "@twurple/api"
import { FieldResolver, Resolver, Root } from "type-graphql"

@Resolver(() => CustomReward)
export class CustomRewardResolver {
  @FieldResolver(() => String)
  image(@Root() reward: HelixCustomReward) {
    return reward.getImageUrl(2)
  }
}
