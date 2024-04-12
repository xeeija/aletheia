import { NoData } from "@/components"
import { useAuth } from "@/hooks"
import { Button, Link as LinkMat, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

interface Props {}

export const NoDataTwitch: FC<Props> = () => {
  const { user, userAccessToken, fetchingUser } = useAuth({ includeToken: true })

  return (
    <NoData image="/img/online_connection.svg" iconSize={200}>
      <Typography variant="h6" color="text.secondary">
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
          You can connect your account in your{" "}
          <Link href="/settings" passHref legacyBehavior>
            <LinkMat sx={{ mx: 0, px: 0, py: 0.5 }}>profile settings</LinkMat>
          </Link>
          .
        </Typography>
      )}
    </NoData>
  )
}
