import messages from "@/messages/en.json"
import { type Formats } from "next-intl"
import { getRequestConfig } from "next-intl/server"

// type Locales = "en" | "de"
// const locales = ["en", "de"] as const

const defaultLocale = "de" // "en-GB"

export const formats = {
  dateTime: {
    short: {
      dateStyle: "medium",
      timeStyle: "short",
    },
  },
} satisfies Formats

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages
    // Locale: Locales
    // Locale: (typeof locales)[number]
    Formats: typeof formats
  }
}

// Request config for next-intl,
// this is called on the server during rendering the component on the server
// the config object is created once per request
export default getRequestConfig(() => {
  // const cookieStore = await cookies()
  // const locale = cookieStore.get("locale")?.value ?? defaultLocale

  // const header = await headers()
  // const locale = new Intl.Locale(header.get("Accept-Language") ?? defaultLocale)

  // match the locale based on header

  return {
    now: new Date(),
    locale: defaultLocale,
    messages,
    formats,
  }
})
