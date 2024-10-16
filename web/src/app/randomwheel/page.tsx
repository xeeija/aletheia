import { Metadata } from "next"
import { FC } from "react"
import { Randomwheel } from "./randomwheel"

export const metadata: Metadata = {
  title: "Random Wheel",
}

const RandomwheelPage: FC = () => {
  return <Randomwheel />
}

export default RandomwheelPage
