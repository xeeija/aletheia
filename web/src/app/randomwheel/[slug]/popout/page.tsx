import { Metadata } from "next"
import { FC } from "react"
import { Popout } from "./popout"

export const metadata: Metadata = {
  title: "Random Wheel Popout",
}

const PopoutPage: FC = () => {
  return <Popout />
}

export default PopoutPage
