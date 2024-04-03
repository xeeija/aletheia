import { Dropdown, LinkInputField } from "@/components"
import { IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { FC, useState } from "react"
import { HiShare } from "react-icons/hi"

interface Props {
  slug: string
}

export const ShareWheelDropdown: FC<Props> = ({ slug }) => {
  const [shareAnchor, setShareAnchor] = useState<Element | null>(null)

  return (
    <>
      <Tooltip arrow placement="bottom" title="Share">
        <IconButton color="secondary" onClick={(ev) => setShareAnchor(ev.currentTarget)}>
          <HiShare />
          {/* <HiLink /> */}
        </IconButton>
      </Tooltip>

      <Dropdown anchor={shareAnchor} setAnchor={setShareAnchor}>
        <Paper sx={{ p: 1.5, width: "18rem" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Share this wheel
          </Typography>

          <LinkInputField
            position="start"
            value={`${window.location.host}/r/${slug}`}
            // type="text"
          />
        </Paper>
      </Dropdown>
    </>
  )
}
