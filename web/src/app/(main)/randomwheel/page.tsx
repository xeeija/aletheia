import { Page } from "@/types"
import { Metadata } from "next"
import { Randomwheel } from "./randomwheel"

export const metadata: Metadata = {
  title: "Random Wheel",
}

const RandomwheelPage: Page = () => {
  // const [wheels] = await getMyRandomWheels()

  return <Randomwheel />
}

export default RandomwheelPage
