import { FC, ReactNode, useState } from "react"
import { Alert, Avatar, Badge, Box, Button, Divider, IconButton, ListItemIcon, Paper, Snackbar, SvgIcon, Typography, useTheme } from "@mui/material"
import { TiChartPie, TiHome, TiPipette, TiPower, TiScissors, TiSpanner, TiThList, TiUser, TiWarning } from "react-icons/ti"
import { HiClock, HiDuplicate, HiViewGridAdd } from "react-icons/hi"
import { Dropdown, LinkList, LinkItem, LoadingButton, Sidebar, Navbar } from "../components"
import Link from "next/link"
import { useLogoutMutation } from "../../generated/graphql"
import { useAuth } from "../../hooks"

export interface NavigationProps {
  noAppbar?: boolean
  noPadding?: boolean
  title?: ReactNode
}

const sidebarItems: LinkItem[] = [
  { name: "Home", href: "/", icon: <SvgIcon component={TiHome} color="primary" /> },
  { name: "Random Wheel", href: "/randomwheel", icon: <SvgIcon component={TiChartPie} color="secondary" viewBox="0 1 22 22" /> },
  { name: "Bingo", href: "/bingo", icon: <SvgIcon component={HiViewGridAdd} color="success" viewBox="0 0 20 20" /> },
  { name: "Color Palette", icon: <SvgIcon component={TiPipette} color="info" /> },
  { name: "Pile of Shame", icon: <SvgIcon component={HiDuplicate} color="warning" viewBox="0 0 20 20" />, disabled: true },
  { name: "Notes", icon: <SvgIcon component={TiThList} color="error" />, disabled: true },
  { name: "Countdown", icon: <SvgIcon component={HiClock} color="primary" viewBox="0 0 20 20" />, disabled: true },
  { name: "Rock Paper Scissors", icon: <SvgIcon component={TiScissors} color="secondary" viewBox="2 2 20 20" />, disabled: true },
  // { divider: true },
]

const userDropdownItems: LinkItem[] = [
  { name: "Profile", icon: <SvgIcon component={TiUser} /> },
  { name: "Settings", href: "/settings", icon: <SvgIcon component={TiSpanner} /> },
  // Logout added seperately
]

const sidebarWidth = 240

// [x] TODO: Burger Menu Button to expand sidebar from only icons to icons with text
// TODO: Add "noAppBar" option and move AppBar here from MiniDrawer

export const Navigation: FC<NavigationProps> = ({ children, noAppbar, noPadding, title }) => {

  const theme = useTheme()

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const { user } = useAuth()
  const [, logout] = useLogoutMutation()
  const [logoutError, setLogoutError] = useState(false)
  // fetching from logout mutation doesnt work (button is forever in "loading" state and disabled)
  const [fetchingLogout, setFetchingLogout] = useState(false)

  const [dropdownAnchor, setDropdownAnchor] = useState<Element | null>(null)

  const handleLogout = async () => {
    setFetchingLogout(true)

    const response = await logout({}, {
      additionalTypenames: ["User"],
    })

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

    setDropdownAnchor(null)
    setTimeout(() => {
      setFetchingLogout(false)
    }, 500)

  }

  const navbarBorderRadius = typeof theme.shape.borderRadius === "number" ?
    theme.shape.borderRadius * 2 :
    `calc(${theme.shape.borderRadius} * 2)`

  return (
    <Sidebar items={sidebarItems} openedWidth={sidebarWidth} open={sidebarOpen} setOpen={setSidebarOpen}>

      {!noAppbar &&
        <Navbar marginLeft={sidebarWidth} open={sidebarOpen} borderRadius={navbarBorderRadius}>

          {/* Title */}
          {typeof title === "string" || title === undefined ?
            <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
              {title}
            </Typography> :
            title
          }

          {user ? (
            <>

              {/* If logged in, show user avatar and dropdown menu (TODO) with profile, logout buttons etc. */}
              <Typography sx={{ fontWeight: "bold", fontSize: "0.875em" }}>
                {user.displayname ?? user.username}
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

                  <Avatar alt={user.username}
                    // TODO: License CC BY 4.0 attribution: https://creativecommons.org/licenses/by/4.0/
                    src={`https://avatars.dicebear.com/api/big-smile/${user.displayname ?? user.username}.svg?flip=1`}
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
                      {user.displayname ?? user.username}
                    </Typography>

                    <Typography variant="subtitle2" sx={{ fontWeight: "normal", opacity: 0.65 }}>
                      Online
                    </Typography>
                  </Box>

                  <Divider sx={{ borderBottomWidth: 4, borderRadius: 2, m: 1, mx: 1.5 }} />

                  <LinkList items={userDropdownItems} dense sx={{ p: 0 }}>
                    <li>
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
                        <Typography variant="body1" component="span">
                          Logout
                        </Typography>
                      </LoadingButton>
                    </li>
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

    </Sidebar>
  )
}
