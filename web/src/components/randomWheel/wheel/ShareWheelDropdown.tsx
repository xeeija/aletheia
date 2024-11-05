"use client"

import { Dropdown, LinkInputField, Tooltip } from "@/components"
import { useLocation } from "@/hooks"
import { IconButton, Paper, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiShare } from "react-icons/hi"

interface Props {
  slug: string
}

export const ShareWheelDropdown: FC<Props> = ({ slug }) => {
  const [anchor, setAnchor] = useState<Element | null>(null)

  const shareUrl = `${useLocation()?.host ?? ""}/r/${slug}`

  return (
    <>
      <Tooltip placement="bottom" title="Share">
        <IconButton color="secondary" onClick={(ev) => setAnchor(ev.currentTarget)}>
          <HiShare />
          {/* <HiLink /> */}
        </IconButton>
      </Tooltip>

      <Dropdown anchor={anchor} setAnchor={setAnchor}>
        <Paper sx={{ p: 1.5, width: "18rem" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Share this wheel
          </Typography>

          <LinkInputField position="start" value={shareUrl} />
        </Paper>
      </Dropdown>
    </>
  )
}
