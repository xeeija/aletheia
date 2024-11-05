import { useEffect, useState } from "react"

export const useLocation = () => {
  const [loc, setLocation] = useState<Location>()

  useEffect(() => {
    setLocation(location)
  }, [])

  return loc
}
