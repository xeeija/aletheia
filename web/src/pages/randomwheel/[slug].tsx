import { LayoutNextPage, defaultLayout } from "@/components"
import { RandomWheelDetail } from "@/components/randomWheel"
import { useRouter } from "next/router"

const RandomWheelDetailPage: LayoutNextPage = () => {
  const router = useRouter()
  const { slug: slugQuery } = router.query
  const slug = typeof slugQuery === "string" ? slugQuery : slugQuery?.[0]

  return <RandomWheelDetail slug={slug} />
}

RandomWheelDetailPage.getLayout = defaultLayout({ navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelDetailPage
