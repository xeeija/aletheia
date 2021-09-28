import { Fade, Popover } from "@mui/material"
import React from "react"

interface Props {
  anchor: Element | null
  setAnchor: (value: React.SetStateAction<Element | null>) => void
  onClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

export const Dropdown: React.FC<Props> = ({ children, anchor, setAnchor }) => {

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