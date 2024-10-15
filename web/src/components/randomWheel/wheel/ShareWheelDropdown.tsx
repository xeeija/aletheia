"use client"

import { Dropdown, LinkInputField } from "@/components"
import { IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiShare } from "react-icons/hi"

interface Props {
  slug: string
}

export const ShareWheelDropdown: FC<Props> = ({ slug }) => {
  const [anchor, setAnchor] = useState<Element | null>(null)

  const shareUrl = `${window.location.host}/r/${slug}`

  return (
    <>
      <Tooltip arrow placement="bottom" title="Share">
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
