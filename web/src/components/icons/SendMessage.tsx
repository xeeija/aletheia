import { SvgIcon, SvgIconProps } from "@mui/material"
import { FC } from "react"
import { HiPaperAirplane } from "react-icons/hi"

// export const SendMessage = createSvgIcon(<HiPaperAirplane transform="rotate(90deg)" />, "SendMessage")

export const SendMessage: FC<SvgIconProps> = ({ sx, ...props }) => {
  return (
    <SvgIcon viewBox="0 0 20 20" {...props} component={HiPaperAirplane} sx={{ ...sx, transform: "rotate(90deg)" }} />
  )
}
