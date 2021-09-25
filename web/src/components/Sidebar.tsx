import React, { useState } from "react"
import { Avatar, Badge, Box, Button, GlobalStyles, IconButton, SvgIcon, Typography, useTheme } from "@mui/material"
import { TiFlag, TiFlash, TiHome, TiNotes, TiStarFullOutline, TiUser } from "react-icons/ti"
import { DrawerItem, MiniDrawer } from "./MiniDrawer"
import { Navbar } from "./Navbar"
import Link from "next/link"
import { useMeQuery } from "../generated/graphql"
import { theme } from "../theme"

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

  const theme = useTheme()

  const [open, setOpen] = useState(false)
  const [{ data }] = useMeQuery()

  return (
    <MiniDrawer items={drawerItems} drawerWidth={drawerWidth} open={open} setOpen={setOpen}>

      {!noAppbar &&
        <Navbar drawerWidth={drawerWidth} open={open}>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Aletheia
          </Typography>

          {data?.me ? (
            <>

              {/* If logged in, show user avatar and dropdown menu (TODO) with profile, logout buttons etc. */}
              <Typography variant="button" sx={{ px: 1 }}>
                {data.me.displayname ?? data.me.username}
              </Typography>

              <Badge overlap="circular" variant="dot" color="success"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                sx={{
                  ml: 1,
                  "& .MuiBadge-badge": {
                    p: 0.5, mb: 0.6, mr: 0.6,
                    borderRadius: "50%",
                    border: `2px solid ${theme.palette.background.default}`,
                  }
                }}>
                <IconButton color="primary" sx={{ p: 0.5 }}>
                  <Avatar alt={data.me.username}
                    // TODO: License CC BY 4.0 attribution: https://creativecommons.org/licenses/by/4.0/
                    src={`https://avatars.dicebear.com/api/big-smile/${data.me.displayname ?? data.me.username}.svg?flip=1`}
                    sx={{
                      width: 36, height: 36,
                      backgroundColor: "transparent",
                      "& .MuiAvatar-img": {
                        // pointerEvents: "none", // make avatar img unselectable
                      }
                    }}>
                    <SvgIcon color="primary" component={TiUser} sx={{
                      height: 36, width: 36,
                      borderRadius: "50%",
                      // border: `2px solid ${theme.palette.primary.main}a0`,
                    }} />
                  </Avatar>
                </IconButton>
              </Badge>

              {/* TODO: Provisional logout button until dropdown is ready */}
              <Button variant="outlined" color="primary" sx={{ ml: 2 }}>Logout</Button>
            </>
          ) : (
            <>
              {/* If not logged in, show login/register buttons */}
              <Link href="/register" passHref>
                <Button variant="outlined" color="secondary" sx={{ ml: 1 }}>Register</Button>
              </Link>
              <Link href="/login" passHref>
                <Button variant="outlined" color="primary" sx={{ ml: 1 }}>Login</Button>
              </Link>
            </>
          )}

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

    </MiniDrawer >
  )
}
