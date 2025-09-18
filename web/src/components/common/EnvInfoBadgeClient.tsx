"use client"

import { getEnvironment } from "@/app/actions"
import { ThemeColor } from "@/types"
import { Chip } from "@mui/material"
import { FC, useEffect, useState } from "react"
import { HiBeaker } from "react-icons/hi"

const capitalize = (text?: string) => (text ? `${text?.slice(0, 1).toUpperCase()}${text?.slice(1)}` : text)

interface Props {
  color?: ThemeColor | boolean
  opacity?: number
  outlined?: boolean
}

export const EnvInfoBadgeClient: FC<Props> = ({ color, opacity, outlined }) => {
  const [env, setEnv] = useState<string>()
  useEffect(() => {
    const loadEnv = async () => {
      setEnv(await getEnvironment())
    }

    loadEnv()
  }, [])

  const environment = env === "production" ? null : capitalize(env)

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
