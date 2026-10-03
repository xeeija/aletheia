"use client"

import { useRandomWheelVolume } from "@/hooks"
import { useIntersectionObserver } from "@/hooks/react-use"
import type { Point } from "@/utils/math"
import { FC, useRef, type RefObject } from "react"

interface Props {
  position: Point
  index: number
  wheelRef: RefObject<Element | null>
  disabled?: boolean
  onIntersect?: IntersectionObserverCallback
}

export const WheelSound: FC<Props> = ({ position, index, wheelRef, disabled, onIntersect }) => {
  const ref = useRef<SVGCircleElement>(null)

  const { mutedKey } = useRandomWheelVolume()

  const sound = new Audio("/audio/boob.wav")
  // const sound = useMemo(() => new Audio("/audio/boob.wav"), [])
  // const [intersecting, setIntersecting] = useState(false)

  // TODO: Maybe use WebAudio API instead
  // https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

  useIntersectionObserver(
    ref,
    (entries, observer) => {
      if (disabled) {
        return
      }

      // get muted directly from localStorage so the value is not stale (from closeure init time)
      const muted = JSON.parse(window.localStorage.getItem(mutedKey) ?? "false") as boolean

      entries.forEach((entry) => {
        // TODO: Fix initial sound when starting, and sound when adding/removing

        if (entry.isIntersecting && !entry.target.classList.contains("intersect")) {
          entry.target.classList.add("intersect")
          onIntersect?.(entries, observer)
          if (!muted) {
            sound.play()
          }
        }

        if (!entry.isIntersecting && entry.target.classList.contains("intersect")) {
          entry.target.classList.remove("intersect")
        }
      })
    },
    {
      root: wheelRef.current,
      // move the "center" to middle right, where the wheel arrow is
      rootMargin: "-50% 0px 0px -50%",
      threshold: 0,
    }
  )

  return (
    <circle
      ref={ref}
      className={`wheel-item-start start-${index}`}
      cx={position.x}
      cy={position.y}
      r="5"
      fill="#000"
      stroke="#000"
      visibility="hidden"
    />
  )
}
