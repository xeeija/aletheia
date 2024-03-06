import { Fade, Popover } from "@mui/material"
import { FC, ReactNode, SetStateAction } from "react"

interface Props {
  anchor: Element | null
  setAnchor: (value: SetStateAction<Element | null>) => void
  onClose?: (event: Record<string, never>, reason: "backdropClick" | "escapeKeyDown") => void
  children?: ReactNode
}

export const Dropdown: FC<Props> = ({ children, anchor, setAnchor }) => {
  const open = Boolean(anchor)

  return (
    <Popover
      open={open}
      onClose={() => setAnchor(null)}
      anchorEl={anchor}
      TransitionComponent={Fade} // transition style
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      {children}
    </Popover>
  )
}
