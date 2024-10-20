import { Tooltip } from "@/components"
import { ThemeColor } from "@/types"
import { Chip } from "@mui/material"
import { unstable_noStore as noStore } from "next/cache"
import { FC } from "react"
import { HiBeaker } from "react-icons/hi"
import { EnvInfoBadgeClient } from "./EnvInfoBadgeClient"

const capitalize = (text?: string) => (text ? `${text?.slice(0, 1).toUpperCase()}${text?.slice(1)}` : text)

interface Props {
  color?: ThemeColor | boolean
  opacity?: number
  outlined?: boolean
}

export const EnvInfoBadge: FC<Props> = ({ color, opacity, outlined }) => {
  // noStore opts into dynamic rendering for this component (instead of static rendering at build time)
  noStore()

  const env = process.env.ENVIRONMENT
  if (!env) {
    return <EnvInfoBadgeClient color={color} opacity={opacity} outlined={outlined} />
  }

  const environment = env === "production" ? null : capitalize(env)

  return !environment ? null : (
    <span>
      <Chip
        label={environment}
        icon={
          <Tooltip title={`Environment: ${environment}`}>
            <HiBeaker />
          </Tooltip>
        }
        color={typeof color === "boolean" ? "success" : color ?? "default"}
        size="small"
        variant={outlined ? "outlined" : "filled"}
        sx={{ mt: -0.25, fontSize: "0.75rem", opacity: opacity ?? (color ? 1 : 0.6) }}
      />
    </span>
  )
}
