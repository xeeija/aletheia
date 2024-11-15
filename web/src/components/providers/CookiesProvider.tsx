import { cookies } from "next/headers"
import { FC, ReactNode } from "react"
import { CookiesProviderClient } from "./CookiesProviderClient"

interface Props {
  children: ReactNode
}

export const CookiesProvider: FC<Props> = async ({ children }) => {
  const cookie = await cookies()

  // createServerContext is deprecated and removed from react
  // const CookieContext = createServerContext("cookies", cookie.toString())

  return <CookiesProviderClient cookie={cookie.toString()}>{children}</CookiesProviderClient>
}
