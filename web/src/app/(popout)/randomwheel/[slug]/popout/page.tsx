import { MetadataFn, Page } from "@/types"
import { getRandomWheel } from "@/utils/graphql/randomwheel"
import { notFound } from "next/navigation"
import { Popout } from "./popout"

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

  const wheel = await getRandomWheel(params.slug, token)

  if (!wheel) {
    notFound()
  }

  const title = wheel.name || `Wheel #${wheel.slug}`

  return {
    title,
  }
}

const PopoutPage: Page<Params, PopoutSearchParams> = async (props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  const slug = params.slug
  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined

  const wheel = await getRandomWheel(slug, token)

  if (!wheel) {
    notFound()
  }

  return <Popout slug={slug} token={token} />
}

export default PopoutPage
