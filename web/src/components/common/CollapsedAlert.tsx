import { Alert, AlertColor, Collapse } from "@mui/material"
import { FC, useState } from "react"
import { TiWarning } from "react-icons/ti"

interface Props {
  severity?: AlertColor
  onExited?: (node: HTMLElement) => void
}

export const CollapsedAlert: FC<Props> = ({ children, severity, onExited }) => {
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
