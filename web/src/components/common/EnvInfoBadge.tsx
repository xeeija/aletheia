import { ThemeColor } from "@/types"
import { Chip } from "@mui/material"
import { FC } from "react"
import { HiBeaker } from "react-icons/hi"

const capitalize = (text?: string) => `${text?.slice(0, 1).toUpperCase()}${text?.slice(1)}`

interface Props {
  color?: ThemeColor | boolean
  opacity?: number
  outlined?: boolean
}

export const EnvInfoBadge: FC<Props> = ({ color, opacity, outlined }) => {
  const envInfo = process.env.NODE_ENV === "production" ? null : capitalize(process.env.NODE_ENV ?? "")

  return !envInfo ? null : (
    <span>
      <Chip
        label={envInfo}
        icon={<HiBeaker />}
        color={typeof color === "boolean" ? "success" : (color ?? "default")}
        size="small"
        variant={outlined ? "outlined" : "filled"}
        sx={{ mt: -0.25, fontSize: "0.75rem", opacity: opacity ?? (color ? 1 : 0.6) }}
      />
    </span>
  )
}
