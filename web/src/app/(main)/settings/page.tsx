import type { Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getUserAccessToken } from "@/utils/graphql/twitch"
import { Metadata } from "next"
import { cookies } from "next/headers"
import { Settings } from "./settings"

export const metadata: Metadata = {
  title: "Settings",
}

const SettingsPage: Page = async () => {
  const cookieStore = await cookies()
  const cookie = cookieStore.toString()

  const { user } = await getAuth(cookie)
  const accessToken = await getUserAccessToken(cookie)

  return <Settings user={user} accessToken={accessToken} />
}

export default SettingsPage
