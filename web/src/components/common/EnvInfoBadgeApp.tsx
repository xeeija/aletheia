"use cache"

import { Tooltip } from "@/components"
import { ThemeColor } from "@/types"
import { Chip } from "@mui/material"
import { FC } from "react"
import { HiBeaker } from "react-icons/hi"

const capitalize = (text?: string) => (text ? `${text?.slice(0, 1).toUpperCase()}${text?.slice(1)}` : text)

interface Props {
  color?: ThemeColor | boolean
  opacity?: number
  outlined?: boolean
}

// "use cache" must be at file top level for client components
export const EnvInfoBadge: FC<Props> = async ({ color, opacity, outlined }) => {
  const env = process.env.ENVIRONMENT

  // causes a hydration missmatch error
  // if (!env) {
  //   return <EnvInfoBadgeClient color={color} opacity={opacity} outlined={outlined} />
  // }

  const environment = env === "production" ? null : capitalize(env)

  return !environment ? null : (
    <span>
      <Chip
        label={environment}
        icon={
          <Tooltip title={`Environment: ${environment}`}>
            <HiBeaker viewBox="0 -2 20 20" />
          </Tooltip>
        }
        color={typeof color === "boolean" ? "success" : (color ?? "default")}
        size="small"
        variant={outlined ? "outlined" : "filled"}
        sx={{ mt: -0.25, fontSize: "0.75rem", opacity: opacity ?? (color ? 1 : 0.6) }}
      />
    </span>
  )
}
