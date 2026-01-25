"use client"

import { LinkText, NoData } from "@/components"
import { Link } from "@/components/client/next"
import type { UserAccessTokenFragment, UserNameFragment } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Button, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
  user?: UserNameFragment
  accessToken?: UserAccessTokenFragment
}

export const NoDataTwitch: FC<Props> = ({ user: initialUser, accessToken: initialAccessToken }) => {
  const { user, userAccessToken, fetchingUser } = useAuth({ includeToken: true, initialUser, initialAccessToken })

  return (
    <NoData image="/img/online_connection.svg" iconSize={200} sx={{ mt: 4 }}>
      <Typography variant="h5" color="text.secondary">
        You don&apos;t have a Twitch account connected.
      </Typography>

      {!user?.username && !fetchingUser && (
        <Button href="/login" LinkComponent={Link} variant="outlined" color="primary">
          Login
        </Button>
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
