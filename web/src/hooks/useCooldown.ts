import { useInterval } from "@/hooks"
import { useState } from "react"

export const formatCooldown = (remaining: Date | null) => {
  if (!remaining || isNaN(remaining.getTime())) {
    return ""
  }

  const days = Math.floor(remaining.getTime() / (24 * 3600 * 1000))
  const daysFormat = days > 0 ? `${days}d ` : ""

  const timeFormat = remaining.toLocaleTimeString(undefined, {
    timeZone: "utc",
    second: "2-digit",
    minute: "2-digit",
    hour: remaining.getUTCHours() > 0 ? "2-digit" : undefined,
  })

  const minutesFormat = remaining.getUTCMinutes() > 0 ? `${remaining.getUTCMinutes()}m` : ""
  const hoursFormat = remaining.getUTCHours() > 0 ? `${remaining.getUTCHours()}h` : minutesFormat

  return `${daysFormat}${days > 0 ? hoursFormat : timeFormat}`
}

export const useCooldown = (expiry: Date | null | undefined) => {
  const isSet = expiry && !Number.isNaN(expiry.getTime())
  const cooldownActive = isSet && expiry > new Date()

  const cooldownUntil = expiry?.toLocaleString(undefined, {
    timeZone: "utc",
    dateStyle: expiry > new Date(Date.now() + 24 * 3600 * 100) ? "medium" : undefined,
    timeStyle: "medium",
  })

  // careful with SSR with rendering dates
  const [cooldown, setCooldown] = useState<Date | null>(null)

  // maybe always delay until next "full second",
  // so the render/update time doesn't slowly "get out of sync" (interval is slighlty longer than 500ms)

  useInterval(() => setCooldown(new Date((expiry?.getTime() ?? 0) - Date.now())), cooldownActive ? 500 : null)

  const cooldownLeft = formatCooldown(cooldown)

  return {
    cooldown,
    cooldownLeft,
    cooldownUntil,
    cooldownActive,
  }
}
