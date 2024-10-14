import { LayoutNextPage, defaultLayout } from "@/components"
import { RandomWheelDetail } from "@/components/randomWheel"
import { useRouter } from "next/router"

const RandomWheelDetailPage: LayoutNextPage = () => {
  const router = useRouter()
  const { slug: slugQuery } = router.query
  const slug = typeof slugQuery === "string" ? slugQuery : slugQuery?.[0]

  const params = new URLSearchParams(router.asPath.split("?")?.[1])
  const token = params.get("token") ?? undefined

  return <RandomWheelDetail slug={slug} token={token} />
}

RandomWheelDetailPage.getLayout = defaultLayout({ navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelDetailPage
