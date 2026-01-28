"use client"

import { Wheel, WheelControls, WheelEntries, WheelSkeleton, WheelToolbar, WinnerDialog } from "@/components/randomWheel"
import {
  useLocalAddRandomWheelWinnerMutation,
  type RandomWheelEntryFragment,
  type UserNameFragment,
} from "@/generated/graphql"
import { RandomWheelSocketOptions, SpinFinishedFn, useRandomWheel, type RandomWheelDetails } from "@/hooks"
import { Box, Paper } from "@mui/material"
import { notFound } from "next/navigation"
import { FC, useCallback, useMemo, useState } from "react"

interface Props {
  slug: string | null
  token?: string
  wheel?: RandomWheelDetails
  entries?: RandomWheelEntryFragment[]
  user?: UserNameFragment
}

export const RandomWheelDetail: FC<Props> = ({ slug, token, wheel: initialWheel, entries: initialEntries, user }) => {
  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)
  // const [lastWinnerEntry, setLastWinnerEntry] = useState<RandomWheelEntry>()

  const [, addRandomWheelWinner] = useLocalAddRandomWheelWinnerMutation()

  const onSpinStarted = useCallback(() => {
    // console.log("onSpinStarted")
    setWinnerDialogOpen(false)
  }, [])

  const onSpinFinished = useCallback<SpinFinishedFn>(
    ({ wheel, winner }) => {
      // console.log("onSpinFinished", { wheel, winner })

      addRandomWheelWinner({ winner }, { requestPolicy: "cache-only" })

      if (wheel?.editable) {
        setWinnerDialogOpen(true)
        // setLastWinnerEntry(result.entry)
      }
    },
    [addRandomWheelWinner]
  )

  const socketOptions = useMemo<RandomWheelSocketOptions>(
    () => ({
      enabled: true,
      onSpinStarted,
      onSpinFinished,
    }),
    [onSpinStarted, onSpinFinished]
  )

  const [{ wheel, entries, winners, fetching, lastWinnerEntry }, { deleteEntry }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
    winners: true,
    token: token,
    socket: socketOptions,
    initialWheel,
    initialEntries,
  })

  if (fetching.wheel && !initialWheel) {
    return <WheelSkeleton />
  }

  if (!wheel && !initialWheel) {
    // TODO: Proper error pages
    notFound()
  }

  // TODO: Use members, server-side
  // https://nextjs.org/docs/advanced-features/middleware

  const wheelDiameter = 688
  const editable = wheel?.editable || wheel?.editAnonymous

  return (
    <>
      {/* <pre>{JSON.stringify(wheel, undefined, 2)}</pre> */}

      <WheelToolbar wheel={wheel} user={user} />

      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: "1em 1em",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "min-content 1fr",
          gridTemplateAreas: `
            "wheel ${editable ? "controls" : "entries"}"
            "wheel entries"`,
        }}
      >
        <Box sx={{ gridArea: "wheel" }}>
          <Paper sx={{ p: 1, height: "100%" }}>
            <Wheel
              diameter={wheelDiameter}
              entries={entries}
              rotation={wheel?.rotation}
              spinning={wheel?.spinning}
              spinDuration={wheel?.spinDuration}
              colors={wheel?.theme?.colors}
            />
          </Paper>
        </Box>

        {editable && (
          <Box sx={{ gridArea: "controls" }}>
            <WheelControls
              slug={wheel?.slug ?? initialWheel?.slug ?? ""}
              disabled={!entries?.length || wheel?.spinning}
            />
          </Box>
        )}

        <WinnerDialog
          open={[winnerDialogOpen, setWinnerDialogOpen]}
          description={winners?.[0]?.name}
          onClose={() => setWinnerDialogOpen(false)}
          onRemove={() => void deleteEntry(lastWinnerEntry?.id ?? "")}
          hideRemove={!editable}
        />

        <Box sx={{ gridArea: "entries" }}>
          <WheelEntries wheel={wheel} entries={entries} winners={winners} />
        </Box>
      </Box>
    </>
  )
}
