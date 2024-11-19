import { NotFound } from "@/components"
import { RandomWheelDetail } from "@/components/randomWheel"
import { MetadataFn, Page } from "@/types"
import { getRandomWheel } from "@/utils/graphql/randomwheel"

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

  const wheel = await getRandomWheel(params.slug, token)

  if (!wheel) {
    return {
      title: "Not Found",
    }
    // notFound()
  }

  const title = wheel.name || `Wheel #${wheel.slug}`

  return {
    title,
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

  const wheel = await getRandomWheel(slug, token)

  if (!wheel) {
    // notFound()
    return <NotFound />
  }

  return (
    <>
      <RandomWheelDetail slug={slug} token={token} />
    </>
  )
}

export default SlugPage
