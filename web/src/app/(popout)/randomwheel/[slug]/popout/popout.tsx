"use client"

import { Wheel, WinnerDialog } from "@/components/randomWheel"
import type { RandomWheelEntryFragment } from "@/generated/graphql"
import { useRandomWheel, type RandomWheelDetails, type RandomWheelSocketOptions, type SpinFinishedFn } from "@/hooks"
import { Box, useTheme } from "@mui/material"
import { notFound, useSearchParams } from "next/navigation"
import { FC, useCallback, useMemo, useState } from "react"

// type SearchParams = {
//   token?: string
//   fade?: string // | "true" | "false"
//   winnerDialog?: string // | "true" | "false"
//   test?: string // | "true" | "false"
// }

interface Props {
  slug: string | undefined
  token?: string
  wheel?: RandomWheelDetails
  entries?: RandomWheelEntryFragment[]
}

export const Popout: FC<Props> = ({ slug, token, wheel: initialWheel, entries: initialEntries }) => {
  const theme = useTheme()
  const params = useSearchParams()

  // const token = params?.get("token") ?? undefined
  const fade = params.get("fade") === "true"
  const hideWinnerDialog = params.get("winnerDialog") === "false"
  const testMode = params.get("test") === "true"

  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)

  const onSpinStarted = useCallback(() => {
    setWinnerDialogOpen(false)
  }, [])

  const onSpinFinished = useCallback<SpinFinishedFn>(
    (result) => {
      const wheel = result.wheel

      if (!hideWinnerDialog) {
        setWinnerDialogOpen(true)
        setTimeout(() => setWinnerDialogOpen(false), wheel?.fadeDuration ?? 6000)
      }
    },
    [hideWinnerDialog]
  )

  const socketOptions = useMemo<RandomWheelSocketOptions>(
    () => ({
      enabled: true,
      onSpinStarted,
      onSpinFinished,
    }),
    [onSpinStarted, onSpinFinished]
  )

  const [{ wheel, lastWinnerEntry, entries }] = useRandomWheel(slug ?? "", {
    details: true,
    entries: true,
    token: token,
    socket: socketOptions,
    initialWheel: initialWheel,
    initialEntries: initialEntries,
    id: initialWheel?.id,
  })

  if (!wheel) {
    notFound()
  }

  const diameter = 680

  return (
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
            delay: wheel.spinning ? 0 : (wheel.fadeDuration ?? 5000),
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
          diameter={diameter}
          entries={entries}
          rotation={wheel.rotation}
          spinning={wheel.spinning}
          spinDuration={wheel.spinDuration ?? 0}
          colors={wheel.theme?.colors}
          popout
          behindBackdrop={winnerDialogOpen}
        />

        <WinnerDialog
          open={[winnerDialogOpen, setWinnerDialogOpen]}
          description={lastWinnerEntry?.name}
          hideRemove
          hideClose
          popout
          backdropWidth={diameter - 8}
        />
      </Box>
    </Box>
  )
}
