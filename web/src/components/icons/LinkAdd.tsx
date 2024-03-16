import { createSvgIcon } from "@mui/material"
import { HiLink } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

export const LinkAdd = createSvgIcon(
  <>
    <HiLink viewBox="1 1 20 20" />
    <TiPlus viewBox="-19 -19 40 40" />
  </>,
  "LinkAdd"
)
