import { Skeleton } from "@mui/material"
import { FC } from "react"

interface Props {
  n?: number
  variant?: "text" | "rectangular" | "circular"
  animation?: false | "pulse" | "wave"
  width?: string | number
  height?: string | number
}

export const SkeletonList: FC<Props> = ({ n, variant = "rectangular", ...props }) => {
  const items = Array(n).fill(0)

  return (
    <>
      {items.map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          sx={{ animationDelay: `${i * 50}ms` }}
          {...props}
        />
      ))}
    </>
  )
}
