import type { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getUserAccessToken } from "@/utils/graphql/twitch"
import { Metadata } from "next"
import { use } from "react"
import { Settings } from "./settings"

export const metadata: Metadata = {
  title: "Settings",
}

const SettingsPage: Page = () => {
  const { user } = use(getAuth())
  const accessToken = use(getUserAccessToken())

  return <Settings user={user} accessToken={accessToken} />
}

export default SettingsPage
