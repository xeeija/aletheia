import { SxProps, Typography } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  fontSize?: number
  children?: ReactNode
  background?: string //| ((theme: Theme) => string)
  sx?: SxProps
}

export const ChannelRewardIconTitle: FC<Props> = ({ fontSize, background, children, sx }) => {
  return (
    <Typography
      variant="body2"
      className="line-clamp line-clamp-2"
      sx={{
        fontWeight: 500,
        fontSize: fontSize ?? 12,
        textAlign: "center",
        lineHeight: 1,
        height: (fontSize ?? 12) * 2,
        mx: 0.25,
        // mb: -0.5,
        color: (theme) => theme.palette.getContrastText(background || theme.palette.background.default),
        ...sx,
      }}
    >
      {children}
    </Typography>
  )
}
