import { useEffect, useState } from "react"

type JsonSerializable = string | number | boolean | JsonSerializable[] | { [key: string]: JsonSerializable } | null

// only works with JSON serializable values
export const useLocalState = <T extends JsonSerializable>(defaultValue: T, key: string, persistDefault?: boolean) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return defaultValue
    }

    const persistedValue = window.localStorage.getItem(key)

    return persistedValue !== null ? (JSON.parse(persistedValue) as T) : defaultValue
  })

  // update localStorage value when the state value or options change
  useEffect(() => {
    if (value !== null && (value !== defaultValue || persistDefault)) {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.removeItem(key)
    }
  }, [key, value, persistDefault, defaultValue])

  // update the state value when the localStorage value is changed externally
  useEffect(() => {
    if (typeof window === "undefined" || !window.localStorage) {
      return
    }

    const listener = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        setValue(JSON.parse(event.newValue) as T)
      }
    }

    window.addEventListener("storage", listener)
    return () => window.removeEventListener("storage", listener)
  }, [key])

  return [value, setValue] as const
}
