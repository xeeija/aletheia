import { Chip, SvgIcon } from "@mui/material"
import { FC } from "react"
import { HiGlobe, HiLockClosed } from "react-icons/hi"

interface Props {
  type: string
}

export const AccessTypeBadge: FC<Props> = ({ type }) => {
  return (
    <Chip
      label={type.toLowerCase()}
      component="div"
      size="small"
      variant="outlined"
      sx={{ textTransform: "capitalize", fontWeight: 500 }}
      color={type === "PRIVATE" ? "secondary" : "success"}
      icon={<SvgIcon
        component={type === "PRIVATE" ? HiLockClosed : HiGlobe}
        viewBox="0 0 20 20"
      />}
    />)
}
