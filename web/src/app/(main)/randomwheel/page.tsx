import { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getMyRandomWheels } from "@/utils/graphql/randomwheel"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { Randomwheel } from "./randomwheel"

export const metadata: Metadata = {
  title: "Random Wheel",
}

const RandomwheelPage: Page = async () => {
  const cookieStore = await cookies()

  const wheels = await getMyRandomWheels(undefined, cookieStore.toString())
  const { user } = await getAuth(cookieStore.toString())

  return <Randomwheel wheels={wheels} user={user} />
}

export default RandomwheelPage
