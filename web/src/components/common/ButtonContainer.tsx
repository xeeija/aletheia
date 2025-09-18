import { ButtonBase } from "@mui/material"
import { FC, ReactNode } from "react"

interface ButtonContainerProps {
  children: ReactNode
  button?: boolean
  onClick?: () => void
}

export const ButtonContainer: FC<ButtonContainerProps> = ({ button, onClick, children }) => {
  return button ? (
    <ButtonBase sx={{ borderRadius: 1 }} onClick={onClick}>
      {children}
    </ButtonBase>
  ) : (
    children
  )
}
