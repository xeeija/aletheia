"use client"

import { AboutDialog, LinkListItem, LogoIcon, Tooltip } from "@/components"
import { Typography } from "@mui/material"
import { FC, useState } from "react"

interface Props {
  onClick: () => void
  itemWidth: string | number
}

const versionPattern = /^\d/g

export const LogoListItem: FC<Props> = ({ onClick, itemWidth }) => {
  const [openAbout, setOpenAbout] = useState(false)
  const version = process.env.NEXT_PUBLIC_VERSION

  return (
    <span>
      <Tooltip title="Aletheia" placement="right">
        <LinkListItem
          name="Aletheia"
          subtitle={
            version && (
              <Typography component="span" variant="caption" sx={{ fontWeight: 500 }}>
                {version.match(versionPattern) ? "v" : ""}
                {version}
              </Typography>
            )
          }
          onClick={(ev) => {
            if (ev.ctrlKey) {
              setOpenAbout(true)
            } else {
              onClick()
            }
          }}
          // margin left (px): (width - base size) / 2
          icon={<LogoIcon sx={{ width: 30, height: "auto", ml: -(3 / 8) }} />}
          sx={{ width: itemWidth, mt: 1.25, mb: 1.25 }}
          textProps={{ primaryTypographyProps: { variant: "h6" } }}
        />
      </Tooltip>

      <AboutDialog open={openAbout} onClose={() => setOpenAbout(false)} />
    </span>
  )
}
