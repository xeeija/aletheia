import { ThemeColor } from "@/types"
import { Chip } from "@mui/material"
import { unstable_noStore as noStore } from "next/cache"
import { FC } from "react"
import { HiBeaker } from "react-icons/hi"

const capitalize = (text?: string) => `${text?.slice(0, 1).toUpperCase()}${text?.slice(1)}`

interface Props {
  color?: ThemeColor | boolean
  opacity?: number
  outlined?: boolean
}

export const EnvInfoBadge: FC<Props> = ({ color, opacity, outlined }) => {
  // noStore opts into dynamic rendering for this component (instead of static rendering at build time)
  noStore()
  const environment = process.env.ENVIRONMENT === "production" ? null : capitalize(process.env.ENVIRONMENT)

  return !environment ? null : (
    <span>
      <Chip
        label={environment}
        icon={<HiBeaker />}
        color={typeof color === "boolean" ? "success" : color ?? "default"}
        size="small"
        variant={outlined ? "outlined" : "filled"}
        sx={{ mt: -0.25, fontSize: "0.75rem", opacity: opacity ?? (color ? 1 : 0.6) }}
      />
    </span>
  )
}
