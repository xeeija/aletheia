import { LayoutNextPage, getTitle } from "@/components"
import { Wheel } from "@/components/randomWheel"
import { useRandomWheel } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { Box, useTheme } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"

const RandomWheelPopoutPage: LayoutNextPage = () => {
  const router = useRouter()
  const { slug: slugQuery } = router.query
  const slug = typeof slugQuery === "string" ? slugQuery : slugQuery?.[0]

  const theme = useTheme()

  const [{ wheel, entries, fetching }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
  })

  const title = wheel?.name || `Wheel #${slug}`

  if (!wheel) {
    // TODO: Proper error pages
    return <NotFoundPage />
  }

  if (fetching.wheel || !slug) {
    return (
      <Head>
        <title>{getTitle()}</title>
      </Head>
    )
  }

  return (
    <>
      <Head>
        <title>{getTitle(`${title} Popout`)}</title>
      </Head>

      <Box
        sx={{
          width: "fit-content",
          opacity: 0,
          visibility: "hidden",
          transition: theme.transitions.create(["opacity", "visibility"], {
            duration: 500,
            delay: wheel.spinning ? 0 : wheel?.fadeDuration ?? 5000,
            easing: theme.transitions.easing.easeOut,
          }),
          ...(wheel.spinning && {
            opacity: 1,
            visibility: "visible",
          }),
        }}
        className="fade"
      >
        <Wheel
          diameter={680}
          entries={entries}
          rotation={wheel.rotation}
          spinning={wheel.spinning}
          spinDuration={wheel?.spinDuration ?? 0}
          colors={wheel.theme?.colors}
        />
      </Box>
    </>
  )
}

RandomWheelPopoutPage.getLayout = (page) => page

export default RandomWheelPopoutPage
