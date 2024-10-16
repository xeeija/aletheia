import { Metadata } from "next"
import { FC } from "react"
import { Settings } from "./settings"

export const metadata: Metadata = {
  title: "Settings",
}

const SettingsPage: FC = () => {
  return <Settings />
}

export default SettingsPage
