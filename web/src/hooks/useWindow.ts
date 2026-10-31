import { useRef } from "react"

export const useWindow = () => {
  const windowRef = useRef(window)
  return windowRef
}
