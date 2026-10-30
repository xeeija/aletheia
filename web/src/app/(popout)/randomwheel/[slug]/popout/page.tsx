import { MetadataFn, Page } from "@/types"
import { getRandomWheel, getRandomWheelEmtries } from "@/utils/graphql/randomwheel"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"
import { Popout } from "./popout"

const getRandomWheelCached = cache(getRandomWheel)

type Params = {
  slug: string
}

export type PopoutSearchParams = {
  token?: string
  // fade?: string // | "true" | "false"
  // winnerDialog?: string // | "true" | "false"
  // test?: string // | "true" | "false"
}

export const generateMetadata: MetadataFn<Params, PopoutSearchParams> = async (props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined
  const cookieStore = await cookies()

  const wheel = await getRandomWheelCached(params.slug, token, cookieStore.toString())

  if (!wheel) {
    notFound()
  }

  return {
    title: wheel.title,
  }
}

const PopoutPage: Page<Params, PopoutSearchParams> = async (props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  const slug = params.slug
  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined

  const cookieStore = await cookies()
  const cookie = cookieStore.toString()

  const wheel = await getRandomWheelCached(slug, token, cookie)
  const entries = (await getRandomWheelEmtries(slug, token, cookie)) ?? undefined

  if (!wheel) {
    notFound()
  }

  return <Popout slug={slug} token={token} wheel={wheel} entries={entries} />
}

export default PopoutPage
