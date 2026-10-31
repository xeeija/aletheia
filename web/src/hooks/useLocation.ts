import { useRef } from "react"

export const useLocation = () => {
  const locationRef = useRef(location)
  return locationRef
}
