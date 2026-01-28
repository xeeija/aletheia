import { RandomWheelListItemFragment, useMyRandomWheelsQuery } from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"

export const useMyRandomWheels = (type?: string, initialWheels?: RandomWheelListItemFragment[]) => {
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetch] = useMyRandomWheelsQuery({
    variables: { type },
    context,
  })

  return {
    wheels: data?.myRandomWheels ?? initialWheels, // as RandomWheelListItemFragment[] | undefined,
    fetching,
    error,
    refetch,
  }
}
