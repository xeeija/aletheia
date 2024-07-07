import { LayoutNextPage, getTitle } from "@/components"
import { Wheel, WinnerDialog } from "@/components/randomWheel"
import { useRandomWheel } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { Box, Skeleton, useTheme } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"

const RandomWheelPopoutPage: LayoutNextPage = () => {
  const theme = useTheme()
  const router = useRouter()

  const { slug: slugQuery } = router.query
  const slug = typeof slugQuery === "string" ? slugQuery : slugQuery?.[0]

  const params = new URLSearchParams(router.asPath.split("?")?.[1])

  const token = params.get("token") ?? undefined
  const fade = params.get("fade") === "true" ?? false
  const hideWinnerDialog = params.get("winnerDialog") === "false" ?? false
  const testMode = params.get("test") === "true" ?? false

  const [{ wheel, lastWinnerEntry, entries, fetching }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
    token: token,
    socket: {
      onSpinStarted: () => setWinnerDialogOpen(false),
      onSpinFinished: () => {
        if (!hideWinnerDialog) {
          setWinnerDialogOpen(true)

          setTimeout(
            () => {
              setWinnerDialogOpen(false)
            },
            (wheel?.fadeDuration ?? 6000) * 0.9
          )
        }
      },
    },
  })

  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)

  const title = wheel?.name || `Wheel #${slug}`

  if (fetching.wheel || !slug) {
    return (
      <>
        <Head>
          <title>{getTitle(`${title} Popout`)}</title>
        </Head>

        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="fade"
        >
          <Skeleton variant="circular" sx={{ width: 670, height: 670, mr: 2 }} />
        </Box>
      </>
    )
  }

  if (!wheel || !wheel.viewable) {
    // TODO: Proper error pages
    return <NotFoundPage />
  }

  return (
    <>
      <Head>
        <title>{getTitle(`${title} Popout`)}</title>
      </Head>

      <Box />
      <Box
        sx={{
          // width: "fit-content",
          width: "100%",
          // height: "100svh",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...(fade && {
            opacity: testMode ? 0.1 : 0,
            visibility: testMode ? undefined : "hidden",
            transition: theme.transitions.create(["opacity", "visibility"], {
              duration: 500,
              delay: wheel.spinning ? 0 : wheel?.fadeDuration ?? 5000,
              easing: theme.transitions.easing.easeOut,
            }),
            ...(wheel.spinning && {
              opacity: 1,
              visibility: "visible",
            }),
          }),
        }}
        className="fade"
      >
        <Box>
          <Wheel
            diameter={680}
            entries={entries}
            rotation={wheel.rotation}
            spinning={wheel.spinning}
            spinDuration={wheel?.spinDuration ?? 0}
            colors={wheel.theme?.colors}
          />

          <WinnerDialog
            open={[winnerDialogOpen, setWinnerDialogOpen]}
            description={lastWinnerEntry?.name}
            hideRemove
            hideClose
          />
        </Box>
      </Box>
    </>
  )
}

RandomWheelPopoutPage.getLayout = (page) => page

export default RandomWheelPopoutPage
