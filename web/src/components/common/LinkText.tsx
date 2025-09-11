import { Link } from "@mui/material"
import NextLink from "next/link"
import { FC, HTMLAttributeAnchorTarget, ReactNode } from "react"

interface Props {
  href: string
  target?: HTMLAttributeAnchorTarget
  children?: ReactNode
}

export const LinkText: FC<Props> = ({ href, target, children }) => {
  return (
    <Link component={NextLink} href={href} target={target} sx={{ mx: 0, px: 0, py: 0.5, fontWeight: 500 }}>
      {children}
    </Link>
  )
}
