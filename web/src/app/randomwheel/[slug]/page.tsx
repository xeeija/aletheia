import { RandomWheelDetail } from "@/components/randomWheel"
import { Page } from "@/types"

type Params = {
  slug: string
}

type SearchParams = {
  token?: string
}

// const SlugPage: Page<{ slug: string }, { token?: string }> = ({ params, searchParams }) => {
const SlugPage: Page<Params, SearchParams> = ({ params, searchParams }) => {
  // server functions
  // const params = useParams<Params>()
  const slug = params.slug

  // const queryParams = useSearchParams()
  // const token = queryParams?.get("token") ?? undefined
  const token = searchParams.token
  const token2 = new URLSearchParams(searchParams.token).get("token") ?? undefined

  console.log("slug page", { params, searchParams, token2 })

  return <RandomWheelDetail slug={slug} token={token} />
}

export default SlugPage
