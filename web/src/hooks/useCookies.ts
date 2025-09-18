import { CookiesContext } from "@/components/providers/CookiesProviderClient"
import { useContext } from "react"

export const useCookies = () => {
  return useContext(CookiesContext)
}
