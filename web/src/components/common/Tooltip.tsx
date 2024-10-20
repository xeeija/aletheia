import { Tooltip as TooltipMui, TooltipProps } from "@mui/material"
import { FC } from "react"

type ChildrenProps = {
  disabled?: boolean
}

interface Props extends TooltipProps {
  showDisabled?: boolean
}

export const Tooltip: FC<Props> = ({ children, title, showDisabled, ...props }) => {
  const disabled = (children?.props as ChildrenProps)?.disabled && !showDisabled
  return (
    <TooltipMui {...props} title={disabled ? "" : title}>
      <span>{children}</span>
    </TooltipMui>
  )
}
