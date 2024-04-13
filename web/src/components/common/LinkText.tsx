import { Link as LinkMat } from "@mui/material"
import Link from "next/link"
import { FC, HTMLAttributeAnchorTarget, ReactNode } from "react"

interface Props {
  href: string
  target?: HTMLAttributeAnchorTarget
  children?: ReactNode
}

export const LinkText: FC<Props> = ({ href, target, children }) => {
  return (
    <Link href={href} passHref target={target} legacyBehavior>
      <LinkMat sx={{ mx: 0, px: 0, py: 0.5, fontWeight: 500 }}>{children}</LinkMat>
    </Link>
  )
}
