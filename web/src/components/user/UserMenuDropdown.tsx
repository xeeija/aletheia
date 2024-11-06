"use client"

import { Dropdown, LinkItem, LinkList, LogoutButton, UserAvatar, UserStatusDot } from "@/components"
import { UserNameFragment } from "@/generated/graphql"
import { useAuth } from "@/hooks/useAuth"
import { Alert, Box, Divider, Paper, Skeleton, Snackbar, SvgIcon, Typography } from "@mui/material"
import { FC, useState } from "react"
import { TiSpanner, TiUser, TiWarning } from "react-icons/ti"

interface Props {
  user?: UserNameFragment
}

export const UserMenuDropdown: FC<Props> = ({ user: initialUser }) => {
  const { user, logout } = useAuth({ initialUser })

  const showUsername = user?.displayname && user.username !== user.displayname

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

    const response = await logout("/")

    if (!response.error) {
      setTimeout(() => {
        setDropdownAnchor(null)
      })
    }

    setFetchingLogout(false)
    // setTimeout(() => {
    //   setFetchingLogout(false)
    // }, 500)
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {!user && <Skeleton variant="circular" height={36} width={36} sx={{ mt: 1 }} />}

      {user && (
        <>
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
                  <LogoutButton loading={fetchingLogout} onClick={handleLogout} />
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

      {/* {!user && !fetchingUser && (
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
      )} */}
    </Box>
  )
}
