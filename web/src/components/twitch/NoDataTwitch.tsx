"use client"

import { LinkText, NoData } from "@/components"
import { useAuth } from "@/hooks"
import { Button, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

interface Props {}

export const NoDataTwitch: FC<Props> = () => {
  const { user, userAccessToken, fetchingUser } = useAuth({ includeToken: true })

  return (
    <NoData image="/img/online_connection.svg" iconSize={200} sx={{ mt: 4 }}>
      <Typography variant="h5" color="text.secondary">
        You don&apos;t have a Twitch account connected.
      </Typography>

      {!user?.username && !fetchingUser && (
        <Link href="/login" passHref legacyBehavior>
          <Button variant="outlined" color="primary">
            Login
          </Button>
        </Link>
      )}

      {user && !userAccessToken && (
        <Typography color="textSecondary" sx={{ mt: -2 }}>
          {"You can connect your account in your "}
          <LinkText href="/settings">profile settings</LinkText>.
        </Typography>
      )}
    </NoData>
  )
}
