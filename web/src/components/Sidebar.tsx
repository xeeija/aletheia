import React, { useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { TiFlag, TiFlash, TiHome, TiNotes, TiStarFullOutline } from "react-icons/ti"
import { DrawerItem, MiniDrawer } from "./MiniDrawer";
import { Navbar } from "./Navbar";

interface Props {
  noAppbar?: boolean
}

const drawerItems: DrawerItem[] = [
  { name: "Home", icon: <TiHome /> },
  { name: "Favorites", icon: <TiStarFullOutline /> },
  { name: "Flag", icon: <TiFlag /> },
  { divider: true },
  { name: "Lightning", icon: <TiFlash /> },
  { name: "Music", icon: <TiNotes /> },
]

const drawerWidth = 200

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Sidebar: React.FC<Props> = ({ children, noAppbar }) => {
  const [open, setOpen] = useState(false)

  return (
    <MiniDrawer items={drawerItems} drawerWidth={drawerWidth} open={open} setOpen={setOpen}>

      {!noAppbar &&
        <Navbar drawerWidth={drawerWidth} open={open}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Mini variant drawer navbar
          </Typography>

          <Button variant="outlined" color="secondary">Register</Button>
          <Button variant="outlined" color="primary">Login</Button>
        </Navbar>
      }

      <Box component="main" sx={{ flexGrow: 1, ...(!noAppbar && { mt: 8 }) }}>
        {children}
      </Box>

    </MiniDrawer>
  )
}
