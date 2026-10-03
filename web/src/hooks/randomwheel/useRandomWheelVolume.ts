import { useLocalState } from "@/hooks"

export const useRandomWheelVolume = () => {
  const mutedKey = "wheel.volumeMute"
  const [muted, setMuted] = useLocalState<boolean>(false, mutedKey)
  return {
    muted,
    setMuted,
    mutedKey,
  }
}
