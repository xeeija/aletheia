import React, { useState } from "react"
import { Collapse, Alert, AlertColor } from "@mui/material"
import { TiWarning } from "react-icons/ti"

interface Props {
  severity?: AlertColor
  onExited?: (node: HTMLElement) => void
}

export const CollapsedAlert: React.FC<Props> = ({ children, severity, onExited }) => {
  const [show, setShow] = useState(false)

  return (
    <Collapse in={show} onExited={onExited}>
      {/* Error Alert - TODO: Move to its own component */}
      <Alert severity={severity} variant="filled" icon={<TiWarning />} onClose={() => setShow(false)} sx={{ my: 1 }}>
        {children}
      </Alert>
    </Collapse>
  )
}
