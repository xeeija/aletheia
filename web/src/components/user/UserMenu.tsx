"use client"

import { Dropdown, LinkItem, LinkList, LoadingButton, UserAvatar, UserStatusDot } from "@/components"
import { useLogoutMutation } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import {
  Alert,
  Box,
  Button,
  Divider,
  ListItemIcon,
  Paper,
  Skeleton,
  Snackbar,
  SvgIcon,
  Typography,
} from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { TiPower, TiSpanner, TiUser, TiWarning } from "react-icons/ti"

interface Props {}

export const UserMenu: FC<Props> = () => {
  const router = useRouter()

  const { user, fetchingUser } = useAuth()

  const showUsername = user?.displayname && user.username !== user.displayname

  const [, logout] = useLogoutMutation()
  const [logoutError, setLogoutError] = useState(false)
  // fetching from logout mutation doesnt work (button is forever in "loading" state and disabled)
  const [fetchingLogout, setFetchingLogout] = useState(false)

  const [dropdownAnchor, setDropdownAnchor] = useState<Element | null>(null)

  const userDropdownItems: LinkItem[] = [
    {
      name: "Profile",
      icon: <SvgIcon component={TiUser} />,
      onClick: () => setTimeout(() => setDropdownAnchor(null), 100),
      disabled: true,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <SvgIcon component={TiSpanner} />,
      onClick: () => setTimeout(() => setDropdownAnchor(null), 100),
    },
    // Logout added seperately
  ]
  const handleLogout = async () => {
    setFetchingLogout(true)

    const response = await logout(
      {},
      {
        additionalTypenames: ["User"],
      }
    )

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

    // TODO: Show snackbar "Logged out successfully"

    // Redirect to home
    router.push("/")
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {fetchingUser && !user && (
        <>
          <Typography width={64}>
            <Skeleton />
          </Typography>
          <Skeleton variant="circular" height={36} width={36} />
        </>
      )}

      {user && (
        <>
          <Typography variant="body2" fontWeight="bold">
            {user.displayname ?? user.username}
          </Typography>

          <UserAvatar user={user} setDropdownAnchor={setDropdownAnchor} />

          <Dropdown anchor={dropdownAnchor} setAnchor={setDropdownAnchor}>
            <Paper sx={{ p: 1.5, minWidth: 180 }}>
              <Box sx={{ py: 0.5, px: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", textWrap: "balance", maxWidth: "160px" }}>
                  {!showUsername && (
                    <Typography component="span" color="text.secondary" sx={{ fontSize: "0.925em" }}>
                      @
                    </Typography>
                  )}
                  {user.displayname ?? user.username}

                  {showUsername && (
                    <Typography component="span" variant="body2" color="text.secondary">
                      &nbsp;{` @${user.username}`}
                    </Typography>
                  )}
                </Typography>

                <Box sx={{ display: "flex", mt: showUsername ? 1 : 0, gap: 0.75 }}>
                  <UserStatusDot standalone />

                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                    Online
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ borderBottomWidth: 4, borderRadius: 2, m: 1, mx: 1.5 }} />

              <LinkList items={userDropdownItems} dense sx={{ p: 0 }}>
                <li>
                  <LoadingButton
                    variant="text"
                    color="error"
                    fullWidth
                    loading={fetchingLogout}
                    fade
                    onClick={() => void handleLogout()}
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
                </li>
              </LinkList>
            </Paper>
          </Dropdown>

          {/* Logout Error Alert */}
          <Snackbar
            open={logoutError}
            autoHideDuration={6000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ transform: "translateY(56px)" }}
            onClose={() => setLogoutError(false)}
          >
            <Alert
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
              icon={<TiWarning />}
              // action={<Button size="small" color="inherit" sx={{ pt: 0.25 }}>Try again</Button>}
            >
              Could not log out correctly.
            </Alert>
          </Snackbar>
        </>
      )}

      {!user && !fetchingUser && (
        <>
          <Link href="/register" passHref legacyBehavior>
            <Button variant="outlined" color="secondary">
              Register
            </Button>
          </Link>
          <Link href="/login" passHref legacyBehavior>
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Link>
        </>
      )}
    </Box>
  )
}
