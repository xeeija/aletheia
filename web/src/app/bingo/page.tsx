import { Metadata } from "next"
import { FC } from "react"
import { Bingo } from "./bingo"

export const metadata: Metadata = {
  title: "Bingo",
}

const BingoPage: FC = () => {
  return <Bingo />
}

export default BingoPage
