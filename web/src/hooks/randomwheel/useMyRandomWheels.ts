import { RandomWheel, useMyRandomWheelsQuery } from "@/generated/graphql"
import { useUrqlContextCookies } from "@/hooks"

export const useMyRandomWheels = (type?: string, wheels?: RandomWheel[]) => {
  const context = useUrqlContextCookies()

  const [{ data, fetching, error }, refetch] = useMyRandomWheelsQuery({
    variables: { type },
    // requestPolicy: "cache-and-network",
    context,
  })

  return {
    wheels: data?.myRandomWheels ?? wheels, // as RandomWheel[] | undefined,
    fetching,
    error,
    refetch,
  }
}
