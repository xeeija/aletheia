import { RandomWheelWinner } from "@/resolvers/index.js"
import { Arg, Mutation, Resolver } from "type-graphql"

@Resolver()
export class RandomWheelWinnerResolver {
  // TODO: Error Handling with Middleware

  // does nothing, used as dummy to provide a mutation to update the client-side cache after ws spin message
  @Mutation(() => RandomWheelWinner, { nullable: true })
  addRandomWheelWinner(
    // @Ctx() { prisma }: GraphqlContext,
    @Arg("winner", () => RandomWheelWinner) winner: Omit<RandomWheelWinner, "randomWheel">
  ) {
    // const createdWinner = await prisma.randomWheelWinner.create({
    //   data: winner,
    // })

    // return createdWinner
    return winner
  }
}
