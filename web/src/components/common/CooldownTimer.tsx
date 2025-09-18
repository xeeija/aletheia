"use client"

import { useCooldown } from "@/hooks"
import { Box, Skeleton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { FC } from "react"
import { TiStopwatch } from "react-icons/ti"

interface Props {
  expiry: Date | null | undefined
}

export const CooldownTimer: FC<Props> = ({ expiry }) => {
  const { cooldownLeft, cooldownUntil, cooldownActive } = useCooldown(expiry)

  if (!cooldownActive) {
    return null
  }

  return (
    <Tooltip placement="bottom" enterDelay={0} title={`Cooldown until ${cooldownUntil}`}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 0.5 }}>
        <SvgIcon color="info">
          <TiStopwatch />
        </SvgIcon>
        {cooldownLeft && (
          <Typography color="text.secondary" fontSize="0.925em" whiteSpace="nowrap">
            {cooldownLeft}
          </Typography>
        )}

        {!cooldownLeft && (
          <Skeleton>
            <Typography>24:00</Typography>
          </Skeleton>
        )}
      </Box>
    </Tooltip>
  )
}
