import { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getMyRandomWheels } from "@/utils/graphql/randomwheel"
import { Metadata } from "next"
import { Randomwheel } from "./randomwheel"

export const metadata: Metadata = {
  title: "Random Wheel",
}

const RandomwheelPage: Page = async () => {
  const wheels = await getMyRandomWheels()
  const { user } = await getAuth()

  return <Randomwheel wheels={wheels} user={user} />
}

export default RandomwheelPage
