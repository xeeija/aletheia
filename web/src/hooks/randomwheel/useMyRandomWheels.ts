import { RandomWheel, RandomWheelListItemFragment, useMyRandomWheelsQuery } from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"

export const useMyRandomWheels = (type?: string, wheels?: RandomWheel[]) => {
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetch] = useMyRandomWheelsQuery({
    variables: { type },
    context,
  })

  return {
    wheels: (data?.myRandomWheels ?? wheels) as RandomWheelListItemFragment[] | undefined,
    fetching,
    error,
    refetch,
  }
}
