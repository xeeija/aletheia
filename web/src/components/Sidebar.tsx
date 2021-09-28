import React, { useState } from "react"
import { Alert, Avatar, Badge, Box, Button, Divider, GlobalStyles, IconButton, List, ListItem, ListItemIcon, ListItemText, Snackbar, SvgIcon, Typography, useTheme } from "@mui/material"
import { TiFlag, TiFlash, TiHome, TiNotes, TiStarFullOutline, TiThMenu, TiUser, TiWarning } from "react-icons/ti"
import { DrawerItem, MiniDrawer } from "./MiniDrawer"
import { Navbar } from "./Navbar"
import Link from "next/link"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { theme } from "../theme"
import { useRouter } from "next/router"
import { LoadingButton } from "./LoadingButton"
import { Dropdown } from "./Dropdown"

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
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [{ data }] = useMeQuery()
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation()

  const [logoutError, setLogoutError] = useState(false)

  const [anchor, setAnchor] = useState<Element | null>(null)

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
                <IconButton color="primary" sx={{ p: 0.5 }}
                  onClick={(e) => {
                    setAnchor(e.currentTarget)
                  }}
                >

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

              <Dropdown anchor={anchor} setAnchor={setAnchor} >

                <Box sx={{ m: 1.5 }}>

                  <Box sx={{ pb: 0.5, pt: 0.5 }}>
                    <Typography sx={{ px: 1, fontWeight: "bold", fontSize: "1em" }}>
                      {data.me.displayname ?? data.me.username}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ px: 1, fontWeight: "normal", opacity: 0.65 }}>
                      Online
                    </Typography>
                  </Box>

                  <Divider sx={{ borderBottomWidth: 3, borderRadius: 2, m: 1 }} />

                  <List dense sx={{ p: 0 }}>
                    {["Profile", "Settings", "Logout"].map(item => {
                      return (
                        <ListItem key={item} button sx={{
                          borderRadius: 1,
                          mt: 0.75,
                          py: 0.375,
                        }}>
                          <ListItemIcon>
                            <SvgIcon component={TiThMenu} />
                          </ListItemIcon>
                          <ListItemText aria-label={item} primary={item} />
                        </ListItem>
                      )
                    })}

                  </List>
                </Box>


              </Dropdown>


              {/* TODO: Provisional logout button until dropdown is ready */}
              <LoadingButton variant="outlined" color="primary" sx={{ ml: 2 }}
                loading={fetchingLogout} loadingIndicator="" fade onClick={async () => {
                  const response = await logout()

                  if (response.error) {
                    console.log({ error: response.error })
                    // Show error snackbar?
                    setLogoutError(true)
                    return
                  }

                  if (!response.data?.logout) {
                    console.log("Logout: ", response.data?.logout)
                    setLogoutError(true)
                    return
                  }

                  // TODO: Invalidate cache?

                  // Hack to reload page without actually reloading
                  router.replace(router.pathname)

                }}>
                Logout
              </LoadingButton>

              {/* Logout Error Alert */}
              <Snackbar open={logoutError}
                autoHideDuration={6000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                sx={{ transform: "translateY(56px)" }}
                onClose={() => setLogoutError(false)}>

                <Alert severity="error" variant="filled" sx={{ width: "100%" }} icon={<TiWarning />}
                // action={<Button size="small" color="inherit" sx={{ pt: 0.25 }}>Try again</Button>}
                >
                  Could not log out correctly.
                </Alert>
              </Snackbar>

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
          )
          }

        </Navbar >
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
