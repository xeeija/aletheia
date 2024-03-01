import { Navigation, NavigationProps } from "@/components"
import { Box } from "@mui/material"
import { NextPage } from "next"
import Head from "next/head"
import { ReactElement, ReactNode } from "react"

export type LayoutNextPage<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// •
export const getTitle = (title?: string) => `${title ? `${title} - ` : ""}Aletheia`

type Props = NavigationProps & {
  title?: string
  fullWidth?: boolean
}

// Helper to pass props to Navigation
// eslint-disable-next-line react/display-name
export const defaultLayout = (props?: Props) => (page: ReactElement) => {
  const { title, fullWidth = true, ...navProps } = props ?? {}
  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>
      <Navigation {...navProps}>
        <Box
          sx={{
            ...(!fullWidth && {
              maxWidth: "85rem",
              mx: "auto",
            }),
          }}
        >
          {page}
        </Box>
      </Navigation>
    </>
  )
}
