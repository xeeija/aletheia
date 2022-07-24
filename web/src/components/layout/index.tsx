import { NextPage } from "next"
import Head from "next/head"
import { ReactElement, ReactNode } from "react"
import { NavigationProps, Navigation } from "../components"

export type LayoutNextPage<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// •
export const getTitle = (title?: string) => `${title ? `${title} - ` : ""}Aletheia`

type Props = NavigationProps & {
  title?: string
}

// Helper to pass props to Navigation
// eslint-disable-next-line react/display-name
export const defaultLayout = (props?: Props) => (page: ReactElement) => {
  const { title, ...navProps } = props ?? {}
  return (
    <>
      <Head>
        {/* <Title>{title}</Title> */}
        <title>{getTitle(title)}</title>
      </Head>
      <Navigation {...navProps}>{page}</Navigation>
    </>
  )
}
