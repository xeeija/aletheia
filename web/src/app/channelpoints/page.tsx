import { Metadata } from "next"
import { FC } from "react"
import { Channelpoints } from "./channelpoints"

export const metadata: Metadata = {
  title: "Channel Points",
}

const ChannelpointsPage: FC = () => {
  return <Channelpoints />
}

export default ChannelpointsPage
