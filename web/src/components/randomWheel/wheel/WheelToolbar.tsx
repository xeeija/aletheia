"use client"

import { Tooltip } from "@/components"
import {
  AccessTypeBadge,
  PopoutWheelDropdown,
  ShareWheelDropdown,
  WheelOptionsDropdown,
} from "@/components/randomWheel"
import { RandomWheelDetails, useAuth, useRandomWheel } from "@/hooks"
import { Box, IconButton, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

interface Props {
  wheel: RandomWheelDetails
}

export const WheelToolbar: FC<Props> = ({ wheel }) => {
  const { user } = useAuth()
  const [, { like }] = useRandomWheel(wheel.slug, { details: true })

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
          <Typography variant="h2">{wheel.title}</Typography>

          <AccessTypeBadge type={wheel.accessType} />
        </Box>

        <Box>
          <Tooltip placement="bottom" title="Favorite">
            <IconButton
              color={wheel.liked ? "error" : "secondary"}
              disabled={!user}
              sx={{ ml: 1 }}
              onClick={async () => await like()}
            >
              <SvgIcon component={wheel.liked ? TiStarFullOutline : TiStarOutline} viewBox="2 2 20 20" />
            </IconButton>
          </Tooltip>

          {/* {wheel.editable && ( */}
          {/* )} */}

          <PopoutWheelDropdown wheel={wheel} />

          <ShareWheelDropdown slug={wheel.slug} />

          <WheelOptionsDropdown wheel={wheel} />
        </Box>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.9 }}>
        {`${wheel.owner ? `Created by ${wheel.owner.displayname}` : "Anonymous"} • `}
        {new Date(wheel.createdAt).toLocaleString()}
      </Typography>
    </>
  )
}
