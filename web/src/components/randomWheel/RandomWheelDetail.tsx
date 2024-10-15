"use client"

import { getTitle } from "@/components"
import { Wheel, WheelControls, WheelEntries, WheelSkeleton, WheelToolbar, WinnerDialog } from "@/components/randomWheel"
import { useRandomWheel } from "@/hooks"
import { Box, Paper } from "@mui/material"
import Head from "next/head"
import { notFound } from "next/navigation"
import { FC, useState } from "react"

interface Props {
  slug: string | undefined
  token?: string
}

export const RandomWheelDetail: FC<Props> = ({ slug, token }) => {
  const [{ wheel, entries, winners, fetching, lastWinnerEntry }, { deleteEntry }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
    winners: true,
    token: token,
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
    notFound()
    // return <NotFoundPage />
  }

  // TODO: Use members, server-side
  // https://nextjs.org/docs/advanced-features/middleware

  const title = wheel.name || `Wheel #${slug}`
  const wheelDiameter = 688

  return (
    <>
      <Head>
        <title>{getTitle(title)}</title>
      </Head>

      <WheelToolbar wheel={wheel} />

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: "1em 1em",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "min-content 1fr",
          gridTemplateAreas: `
            "wheel ${wheel.editable || wheel.editAnonymous ? "controls" : "entries"}"
            "wheel entries"`,
        }}
      >
        <Box sx={{ gridArea: "wheel" }}>
          <Paper sx={{ p: 1, height: "100%" }}>
            <Wheel
              diameter={wheelDiameter}
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
  )
}
