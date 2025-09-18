import { useEffect, useState } from "react"

export const useWindow = () => {
  const [win, setWindow] = useState<Window>()

  useEffect(() => {
    setWindow(window)
  }, [])

  return win
}
