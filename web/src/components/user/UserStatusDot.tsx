import { Badge } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  standalone?: boolean
  border?: boolean
  children?: ReactNode
}

export const UserStatusDot: FC<Props> = ({ standalone, border = !standalone, children }) => {
  return (
    <Badge
      overlap="circular"
      variant="dot"
      color="success"
      anchorOrigin={{ vertical: "bottom", horizontal: standalone ? "left" : "right" }}
      sx={{
        ...(standalone && {
          alignItems: "center",
          justifyContent: "center",
          "& .MuiBadge-badge": {
            position: "relative",
            left: "4px",
            bottom: "4px",
            p: 0.5,
            borderRadius: "50%",
            border: border ? (theme) => `2px solid ${theme.palette.background.default}` : undefined,
          },
        }),
        ...(!standalone && {
          "& .MuiBadge-badge": {
            p: 0.5,
            mb: 0.6,
            mr: 0.6,
            borderRadius: "50%",
            border: border ? (theme) => `2px solid ${theme.palette.background.default}` : undefined,
          },
        }),
      }}
    >
      {children}
    </Badge>
  )
}
