import React, { useState } from "react"
import { Alert, Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Paper, Snackbar, SvgIcon, Typography, useTheme } from "@mui/material"
import { TiFlag, TiFlash, TiHome, TiNotes, TiPower, TiSpanner, TiStarFullOutline, TiUser, TiWarning } from "react-icons/ti"
import { MiniDrawer } from "./MiniDrawer"
import { Navbar } from "./Navbar"
import Link from "next/link"
import { useLogoutMutation, useMeQuery } from "../generated/graphql"
import { useRouter } from "next/router"
import { LoadingButton } from "./LoadingButton"
import { Dropdown } from "./Dropdown"
import { LinkList, LinkListItem, LinkItem } from "./LinkList"

interface Props {
  noAppbar?: boolean
  noPadding?: boolean
  title?: React.ReactNode
}

const drawerItems: LinkItem[] = [
  { name: "Home", href: "/", icon: <SvgIcon component={TiHome} color="primary" /> },
  { name: "Favorites", icon: <SvgIcon component={TiStarFullOutline} color="secondary" /> },
  { name: "Flag", icon: <SvgIcon component={TiFlag} color="info" /> },
  { divider: true },
  { name: "Lightning", icon: <SvgIcon component={TiFlash} color="warning" /> },
  { name: "Music", icon: <SvgIcon component={TiNotes} color="error" /> },
]

const drawerWidth = 200

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Navigation: React.FC<Props> = ({ children, noAppbar, noPadding, title }) => {

  const theme = useTheme()
  const router = useRouter()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const [{ data }] = useMeQuery()
  const [{ fetching: fetchingLogout }, logout] = useLogoutMutation()
  const [logoutError, setLogoutError] = useState(false)

  const [dropdownAnchor, setDropdownAnchor] = useState<Element | null>(null)

  const handleLogout = async () => {
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
  }

  const userDropdownItems: LinkItem[] = [
    { name: "Profile", icon: <SvgIcon component={TiUser} /> },
    { name: "Settings", icon: <SvgIcon component={TiSpanner} /> },
    { name: "Logout" }, // added directly in list
  ]

  const navbarBorderRadius = typeof theme.shape.borderRadius === "number" ?
    theme.shape.borderRadius * 2 :
    `calc(${theme.shape.borderRadius} * 2)`

  return (
    <MiniDrawer items={drawerItems} drawerWidth={drawerWidth} open={drawerOpen} setOpen={setDrawerOpen}>

      {!noAppbar &&
        <Navbar drawerWidth={drawerWidth} open={drawerOpen} borderRadius={navbarBorderRadius}>

          {/* Title */}
          {typeof title === "string" || title === undefined ?
            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
              {title}
            </Typography> :
            title
          }

          {data?.me ? (
            <>

              {/* If logged in, show user avatar and dropdown menu (TODO) with profile, logout buttons etc. */}
              <Typography sx={{ fontWeight: "bold", fontSize: "0.875em" }}>
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
                <IconButton color="primary" sx={{ p: 0.5 }}
                  onClick={(e) => {
                    setDropdownAnchor(e.currentTarget)
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

              <Dropdown anchor={dropdownAnchor} setAnchor={setDropdownAnchor}>

                <Paper sx={{ p: 1.5, width: 180 }}>

                  <Box sx={{ py: 0.5, px: 1.5 }}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1em" }}>
                      {data.me.displayname ?? data.me.username}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: "normal", opacity: 0.65 }}>
                      Online
                    </Typography>
                  </Box>

                  <Divider sx={{ borderBottomWidth: 4, borderRadius: 2, m: 1, mx: 1.5 }} />

                  <LinkList items={userDropdownItems} dense sx={{ p: 0 }}>
                    {(item) =>
                      item.name !== "Logout" ? <LinkListItem {...item} /> :
                        <LoadingButton variant="text" color="error" fullWidth
                          loading={fetchingLogout} fade onClick={handleLogout} position="start"
                          sx={{
                            justifyContent: "start",
                            textTransform: "inherit",
                            py: 0.5,
                            mt: 0.5,
                          }}
                          startIcon={
                            <ListItemIcon sx={{ ml: 0.5, color: "inherit" }}>
                              <SvgIcon component={TiPower} />
                            </ListItemIcon>}
                          progressProps={{ color: "inherit", sx: { ml: 1, mr: 3.5 } }} // props for position start
                        >
                          <Typography variant="body2" component="span">
                            {item.name}
                          </Typography>
                        </LoadingButton>
                    }
                  </LinkList>

                </Paper>

              </Dropdown>

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
          )}

        </Navbar>
      }

      <Box component="main" sx={{
        flexGrow: 1,
        ...(!noAppbar && { mt: 8, }),
        ...(!noPadding && { p: 3 }),
      }}>

        {children}
      </Box>

    </MiniDrawer >
  )
}
