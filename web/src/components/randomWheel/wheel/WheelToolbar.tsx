"use client"

import { RelativeTime } from "@/components"
import {
  AccessTypeBadge,
  PopoutWheelDropdown,
  ShareWheelDropdown,
  WheelOptionsDropdown,
} from "@/components/randomWheel"
import type { UserNameFragment } from "@/generated/graphql"
import { RandomWheelDetails, useAuth, useRandomWheelLike, useRandomWheelVolume } from "@/hooks"
import { Box, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { useFormatter } from "next-intl"
import { FC } from "react"
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

interface Props {
  wheel: RandomWheelDetails | undefined
  user?: UserNameFragment
}

export const WheelToolbar: FC<Props> = ({ wheel, user }) => {
  const { authenticated } = useAuth({ initialUser: user })
  const [liked, like] = useRandomWheelLike(wheel?.id, wheel?.liked)

  const { muted, setMuted } = useRandomWheelVolume()

  const { dateTime } = useFormatter()

  // const createdAt = wheel?.createdAt as unknown as string | undefined

  if (!wheel) {
    return null
  }

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
              color={liked ? "error" : "secondary"}
              disabled={!authenticated}
              sx={{ ml: 1 }}
              onClick={async () => await like()}
            >
              <SvgIcon component={liked ? TiStarFullOutline : TiStarOutline} viewBox="2 2 20 20" />
            </IconButton>
          </Tooltip>

          <Tooltip placement="bottom" title={muted ? "Unmute" : "Mute"}>
            <IconButton
              color="secondary"
              sx={{ ml: 1 }}
              onClick={() => {
                setMuted((x) => !x)
              }}
            >
              {muted && <HiVolumeOff />}
              {!muted && <HiVolumeUp />}
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
        <span>{`${wheel.owner ? `Created by ${wheel.owner.displayname}` : "Anonymous"} • `}</span>
        <Tooltip title={dateTime(new Date(wheel.createdAt), "short")}>
          <span>
            <RelativeTime date={wheel.createdAt} />
          </span>
        </Tooltip>
      </Typography>
    </>
  )
}
