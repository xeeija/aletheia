import { UserMenuDropdown } from "@/components"
import { getUser } from "@/utils/graphql"
import { Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

interface Props {}

export const UserMenuApp: FC<Props> = async () => {
  // const client = getUrqlClient()
  // const userResult = await client.query(MeDocument, {})
  // const user = userResult.data?.me as UserNameFragment

  // only works directly inside of app/ directory
  // because cookies() errors if used anywhere outside, like components/ directory
  const user = await getUser()

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {user && (
        <>
          <Typography variant="body2" fontWeight="bold">
            {user.displayname ?? user.username}
          </Typography>

          <UserMenuDropdown user={user} />
        </>
      )}

      {!user && (
        <>
          <Button href="/register" LinkComponent={Link} variant="outlined" color="secondary">
            Register
          </Button>
          <Button href="/login" LinkComponent={Link} variant="outlined" color="primary">
            Login
          </Button>
        </>
      )}
    </Box>
  )
}
