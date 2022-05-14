import { NextPage } from "next"
import { ReactElement, ReactNode } from "react"
import { NavigationProps, Navigation } from "../components"

export type LayoutNextPage = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

// Helper to pass props to Navigation
// eslint-disable-next-line react/display-name
export const defaultLayout = (navProps?: NavigationProps) => (page: ReactElement) => (
  <Navigation {...navProps}>{page}</Navigation>
)
