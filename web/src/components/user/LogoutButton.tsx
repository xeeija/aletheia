"use client"

import { LoadingButton } from "@/components"
import { Awaitable } from "@/types"
import { ListItemIcon, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import { TiPower } from "react-icons/ti"

interface Props {
  loading?: boolean
  onClick: () => Awaitable<void>
}

export const LogoutButton: FC<Props> = ({ loading, onClick }) => {
  return (
    <LoadingButton
      variant="text"
      color="error"
      fullWidth
      loading={loading}
      fade
      onClick={async () => await onClick()}
      position="start"
      sx={{
        justifyContent: "start",
        textTransform: "inherit",
        py: 0.5,
        mt: 0.5,
      }}
      startIcon={
        <ListItemIcon sx={{ ml: 0.5, color: "inherit" }}>
          <SvgIcon component={TiPower} />
        </ListItemIcon>
      }
      progressProps={{ color: "inherit", sx: { ml: 1, mr: 3.5 } }} // props for position start
    >
      <Typography variant="body1" component="span">
        Logout
      </Typography>
    </LoadingButton>
  )
}
