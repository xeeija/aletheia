import { Skeleton } from "@mui/material"
import { FC, Fragment, ReactNode } from "react"

interface Props {
  n?: number
  variant?: "text" | "rectangular" | "circular"
  animation?: false | "pulse" | "wave"
  width?: string | number
  height?: string | number
  animationDelay?: number
  children?: ReactNode
}

export const SkeletonList: FC<Props> = ({ n, variant = "rectangular", animationDelay, children, ...props }) => {
  const items = Array(n).fill(0)

  return (
    <>
      {items.map(
        (_, i) =>
          <Fragment key={i}>{children}</Fragment> ?? (
            <Skeleton key={i} variant={variant} sx={{ animationDelay: `${i * (animationDelay ?? 50)}ms` }} {...props} />
          )
      )}
    </>
  )
}
