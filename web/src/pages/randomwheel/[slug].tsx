import { LayoutNextPage, defaultLayout, getTitle } from "@/components"
import {
  AccessTypeBadge,
  ShareWheelDropdown,
  Wheel,
  WheelControls,
  WheelEntries,
  WheelOptionsDropdown,
  WheelSkeleton,
  WinnerDialog,
} from "@/components/randomWheel"
import { useAuth, useRandomWheel } from "@/hooks"
import NotFoundPage from "@/pages/404"
import { Box, IconButton, Paper, SvgIcon, Tooltip, Typography } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { useState } from "react"
import { HiExternalLink } from "react-icons/hi"
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti"

const RandomWheelDetailPage: LayoutNextPage = () => {
  const router = useRouter()
  const { slug: slugQuery } = router.query
  const slug = typeof slugQuery === "string" ? slugQuery : slugQuery?.[0]

  const { user } = useAuth()

  const [{ wheel, entries, winners, fetching, lastWinnerEntry }, { like, deleteEntry }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
    winners: true,
    socket: {
      onSpinStarted: () => setWinnerDialogOpen(false),
      onSpinFinished: () => {
        if (wheel?.editable || wheel?.editAnonymous) {
          setWinnerDialogOpen(true)
        }
      },
    },
  })

  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)

  if (fetching.wheel || !slug) {
    return <WheelSkeleton />
  }

  if (!wheel || !wheel.viewable) {
    // TODO: Proper error pages
    return <NotFoundPage />
  }

  // TODO: Use members, server-side
  // https://nextjs.org/docs/advanced-features/middleware

  const title = wheel.name || `Wheel #${slug}`

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>

      {wheel && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5 }}>
              <Typography variant="h2">{title}</Typography>

              <AccessTypeBadge type={wheel.accessType} />
            </Box>

            <Box>
              <Tooltip arrow placement="bottom" title="Favorite">
                <IconButton
                  color={wheel.liked ? "error" : "secondary"}
                  disabled={!user}
                  sx={{ ml: 1 }}
                  onClick={async () => await like()}
                >
                  <SvgIcon component={wheel.liked ? TiStarFullOutline : TiStarOutline} viewBox="2 2 20 20" />
                </IconButton>
              </Tooltip>

              {/* {wheel.editable && ( */}
              <Tooltip arrow placement="bottom" title="Popout">
                <IconButton color="secondary" href={`${window.location.href}/popout`} target="_blank" sx={{ ml: 1 }}>
                  <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
                </IconButton>
              </Tooltip>
              {/* )} */}

              <ShareWheelDropdown slug={wheel.slug} />

              <WheelOptionsDropdown wheel={wheel} />
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {`${wheel.owner ? `Created by ${wheel.owner.displayname}` : "Anonymous"} • `}
            {new Date(wheel.createdAt as string).toLocaleString()}
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gap: "1em 1em",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "min-content 1fr",
              gridTemplateAreas: `
              "wheel ${wheel.editable || wheel.editAnonymous ? "controls" : "entries"}"
              "wheel entries"
            `,
              // "wheel wheel entries"
            }}
          >
            <Box sx={{ gridArea: "wheel" }}>
              <Paper sx={{ p: 1, height: "100%" }}>
                <Wheel
                  diameter={688}
                  entries={entries}
                  rotation={wheel.rotation}
                  spinning={wheel.spinning}
                  spinDuration={wheel.spinDuration}
                  colors={wheel.theme?.colors}
                />
              </Paper>
            </Box>

            {(wheel.editable || wheel.editAnonymous) && (
              <Box sx={{ gridArea: "controls" }}>
                <WheelControls slug={wheel.slug} disabled={!entries?.length || wheel.spinning} />
              </Box>
            )}

            <WinnerDialog
              open={[winnerDialogOpen, setWinnerDialogOpen]}
              description={winners?.[0]?.name}
              onClose={() => setWinnerDialogOpen(false)}
              onRemove={() => void deleteEntry(lastWinnerEntry?.id ?? "")}
              hideRemove={!wheel.editable && !wheel.editAnonymous}
            />

            <Box sx={{ gridArea: "entries" }}>
              <WheelEntries wheel={wheel} entries={entries} winners={winners} />
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

RandomWheelDetailPage.getLayout = defaultLayout({ navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelDetailPage
