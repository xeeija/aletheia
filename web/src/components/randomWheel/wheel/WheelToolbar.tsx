import { RandomWheelDetails, useAuth, useRandomWheel } from "@/hooks"
import { Box, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { FC } from "react"
import { HiExternalLink } from "react-icons/hi"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"
import { AccessTypeBadge } from "./AccessTypeBadge"
import { ShareWheelDropdown } from "./ShareWheelDropdown"
import { WheelOptionsDropdown } from "./WheelOptionsDropdown"

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
          <Typography variant="h2">{wheel.name || `Wheel #${wheel.slug}`}</Typography>

          <AccessTypeBadge type={wheel.accessType} />
        </Box>

        <Box>
          <Tooltip arrow placement="bottom" title="Favorite">
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
          <Tooltip arrow placement="bottom" title="Popout">
            <IconButton color="secondary" href={`${window.location.href}/popout`} target="_blank" sx={{ ml: 1 }}>
              <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
            </IconButton>
          </Tooltip>
          {/* )} */}

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
