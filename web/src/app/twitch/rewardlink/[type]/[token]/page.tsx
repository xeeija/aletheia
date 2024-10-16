import { Metadata } from "next"
import { FC } from "react"
import { Token } from "./token"

export const metadata: Metadata = {
  title: "Reward Link",
}

const RewardLinkPage: FC = () => {
  return <Token />
}

export default RewardLinkPage
