import React, { useState } from "react"
import { Box, Button, GlobalStyles, SvgIcon, Typography } from "@mui/material"
import { TiFlag, TiFlash, TiHome, TiNotes, TiStarFullOutline } from "react-icons/ti"
import { DrawerItem, MiniDrawer } from "./MiniDrawer";
import { Navbar } from "./Navbar";
import { theme } from "../theme";
import Link from "next/link"
import { useMeQuery } from "../generated/graphql";
interface Props {
  noAppbar?: boolean
  noPadding?: boolean
}

const drawerItems: DrawerItem[] = [
  { name: "Home", icon: <SvgIcon component={TiHome} color="primary" />, href: "/" },
  { name: "Favorites", icon: <SvgIcon component={TiStarFullOutline} color="secondary" /> },
  { name: "Flag", icon: <SvgIcon component={TiFlag} color="info" /> },
  { divider: true },
  { name: "Lightning", icon: <SvgIcon component={TiFlash} color="warning" /> },
  { name: "Music", icon: <SvgIcon component={TiNotes} color="error" /> },
]

const drawerWidth = 200

// Style "hack" for rounded corner below sidebar/navbar to display correctly
const bodyStyle = <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.paper } }} />

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Sidebar: React.FC<Props> = ({ children, noAppbar, noPadding }) => {
  const [open, setOpen] = useState(false)

  const [{ data }] = useMeQuery()

  return (
    <MiniDrawer items={drawerItems} drawerWidth={drawerWidth} open={open} setOpen={setOpen}>

      {!noAppbar &&
        <Navbar drawerWidth={drawerWidth} open={open}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Mini variant drawer navbar
          </Typography>

          {data?.me ? (<>
            <div>{data.me.username}</div>
          </>) : (<>
            <Link href="/register" passHref>
              <Button variant="outlined" color="secondary" sx={{ ml: 1 }}>Register</Button>
            </Link>
            <Link href="/login" passHref>
              <Button variant="outlined" color="primary" sx={{ ml: 1 }}>Login</Button>
            </Link>
          </>)}

        </Navbar>
      }

      {!noAppbar && bodyStyle}

      <Box component="main" sx={{
        flexGrow: 1,
        ...(!noAppbar && {
          mt: 8,
          borderRadius: theme.spacing(1, 0, 0),
          backgroundColor: theme.palette.background.default,
          height: `calc(100vh - ${theme.spacing(8)})`,
        }),
        ...(!noPadding && { p: 3 }),
      }}>

        {/* {!noAppbar && <Box sx={{ background: theme.palette.primary.dark, height: theme.spacing(0.75), mb: -1 }} />} */}

        {children}
      </Box>

    </MiniDrawer>
  )
}
