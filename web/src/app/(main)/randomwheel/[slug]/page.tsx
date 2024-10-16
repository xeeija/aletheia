import { RandomWheelDetail } from "@/components/randomWheel"
import { Page } from "@/types"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Random Wheel",
}

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
  const queryParams = new URLSearchParams(searchParams)
  const token = queryParams.get("token") ?? undefined

  return <RandomWheelDetail slug={slug} token={token} />
}

export default SlugPage
