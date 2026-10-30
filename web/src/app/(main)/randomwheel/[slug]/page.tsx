import { RandomWheelDetail } from "@/components/randomWheel"
import { MetadataFn, Page } from "@/types"
import { getAuth } from "@/utils/graphql"
import { getRandomWheel, getRandomWheelEmtries } from "@/utils/graphql/randomwheel"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { cache } from "react"

const getRandomWheelCached = cache(getRandomWheel)

type Params = {
  slug: string
}

type SearchParams = {
  token?: string
}

export const generateMetadata: MetadataFn<Params, SearchParams> = async (props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined

  const cookieStore = await cookies()
  const cookie = cookieStore.toString()

  const wheel = await getRandomWheelCached(params.slug, token, cookie)

  if (!wheel) {
    notFound()
  }

  return {
    title: wheel.title,
  }
}

// const SlugPage: Page<{ slug: string }, { token?: string }> = ({ params, searchParams }) => {
const SlugPage: Page<Params, SearchParams> = async (props) => {
  const [params, searchParams] = await Promise.all([props.params, props.searchParams])

  // server functions
  // const params = useParams<Params>()
  const slug = params.slug

  // const queryParams = useSearchParams()
  // const token = queryParams?.get("token") ?? undefined
  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined

  const cookieStore = await cookies()
  const cookie = cookieStore.toString()

  const wheel = await getRandomWheelCached(slug, token, cookie)
  const entries = (await getRandomWheelEmtries(slug, token, cookie)) ?? undefined

  if (!wheel) {
    notFound()
  }

  const { user } = await getAuth(cookie)

  return <RandomWheelDetail slug={slug} token={token} wheel={wheel} entries={entries} user={user} />
}

export default SlugPage
