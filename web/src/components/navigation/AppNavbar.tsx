import { Navbar, UserMenu } from "@/components"
import { Box, Typography } from "@mui/material"
import { FC, ReactNode } from "react"

interface Props {
  children?: ReactNode
}

/**
 * @deprecated Use import from `@/app/components` instead. Workaround for error "Can only import next/headers in Server Component"
 */
export const AppNavbar: FC<Props> = ({ children }) => {
  const sidebarWidth = 240

  return (
    <div>
      <Navbar marginLeft={sidebarWidth} borderRadius={8}>
        <Typography variant="h5" noWrap sx={{ flexGrow: 1 }}>
          {children}
        </Typography>
        <UserMenu />
        {/*
          UserMenuApp always has a build error:
          You're importing a component that needs next/headers.
          That only works in a Server Component which is not supported in the pages/ directory.
        */}
        {/* <UserMenuApp /> */}
      </Navbar>

      <Box sx={{ mt: 8 }} />
    </div>
  )
}
