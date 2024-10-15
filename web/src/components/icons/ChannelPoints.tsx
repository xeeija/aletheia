import { SvgIcon, SvgIconProps } from "@mui/material"
import { FC } from "react"

export const ChannelPoints: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 6a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-2V6z" />
      <path
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-2 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </SvgIcon>
  )
}

// export const ChannelPoints2 = createSvgIcon(
//   // <svg viewBox="0 0 20 20">
//   <>
//     <path d="M10 6a4 4 0 0 1 4 4h-2a2 2 0 0 0-2-2V6z"></path>
//     <path
//       d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-2 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0z"
//       clipRule="evenodd"
//       fillRule="evenodd"
//     ></path>
//   </>,
//   // </svg>,
//   "ChannelPoints"
// )
