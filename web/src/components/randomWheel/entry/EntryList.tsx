import { NoData } from "@/components"
import { EntryListItem } from "@/components/randomWheel"
import { RandomWheelEntryFragment } from "@/generated/graphql"
import { Box, List, Skeleton, Typography } from "@mui/material"
import { FC, useEffect, useMemo, useRef, useState } from "react"
import { Virtuoso, VirtuosoHandle } from "react-virtuoso"

interface Props {
  entries: RandomWheelEntryFragment[]
  editable?: boolean
  spinning?: boolean
  autoScroll?: boolean
  autoScrollThreshold?: number
}

export const EntryList: FC<Props> = ({ entries, editable, spinning, autoScroll, autoScrollThreshold = 3 }) => {
  const maxHeight = 480 + (!editable ? 88 + 64 : 0)

  // const [deleteEnabled, setDeleteEnabled] = useState(false)

  // useEffect(() => {
  //   const keydownListener: (this: Window, ev: KeyboardEvent) => any =
  //     (ev) => {
  //       if (ev.key === "Shift" && !deleteEnabled) {
  //         setDeleteEnabled(true)
  //       }
  //     }

  //   const keyupListener: (this: Window, ev: KeyboardEvent) => any =
  //     (ev) => {
  //       if (ev.key === "Shift" && deleteEnabled) {
  //         setDeleteEnabled(false)
  //       }
  //     }

  //   window.addEventListener("keydown", keydownListener)
  //   window.addEventListener("keyup", keyupListener)

  //   return () => {
  //     window.removeEventListener("keydown", keydownListener)
  //     window.removeEventListener("keyup", keyupListener)
  //   }
  // })

  // const itemTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 0,
  // })
  // const itemInTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 1000,
  // })

  const [scrolling, setScrolling] = useState(false)
  const [scrolledBottom, setScrolledBottom] = useState(false)

  const virtuosoRef = useRef<VirtuosoHandle>(null)

  // auto scroll
  useEffect(() => {
    if (!autoScroll) {
      return
    }

    let timeout: NodeJS.Timeout

    if (scrolledBottom) {
      // delay scroll to bottom, so the list doesn't jump around, when scrolling up again
      timeout = setTimeout(() => {
        virtuosoRef.current?.scrollToIndex({ index: entries.length, behavior: "smooth" })
      }, 200)
    }

    // cancel scroll to bottom, if scrolled up again
    // also fires when entries change, but is started again above if still scrolled to bottom
    return () => clearTimeout(timeout)
  }, [entries, autoScroll, scrolledBottom])

  const totalWeight = useMemo(() => entries.reduce((acc, entry) => acc + entry.weight, 0), [entries])

  const widths = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map(() => (2 + Math.round(Math.random() * 3)) * 10),
    []
  )

  return (
    <>
      <List role="list" sx={{ py: 0, mt: -0.5, overflowY: "auto", maxHeight: maxHeight }}>
        {/* TODO: Provider and custom hook for alerts, maybe with possibility to stack them (see: notistack) */}

        {entries.length > 0 && (
          <Virtuoso
            ref={virtuosoRef}
            data={entries}
            computeItemKey={(_, entry) => entry.id}
            isScrolling={setScrolling}
            style={{ height: maxHeight }}
            rangeChanged={({ endIndex }) => {
              setScrolledBottom(endIndex >= entries.length - autoScrollThreshold)
            }}
            components={{
              ScrollSeekPlaceholder: ({ height, index }) => (
                <Skeleton width={`${widths[index % widths.length]}%`} height={height} />
              ),
            }}
            scrollSeekConfiguration={
              entries.length > 100 && {
                enter: (velocity) => Math.abs(velocity) > 300,
                exit: (velocity) => Math.abs(velocity) < 120,
              }
            }
            itemContent={(_, entry) => (
              <EntryListItem
                entry={entry}
                editable={editable}
                disabled={spinning}
                totalWeight={totalWeight}
                scrolling={scrolling}
              />
            )}
          />
        )}

        {!entries.length && (
          <Box sx={{ textAlign: "center", p: 3, mt: 0.5 }}>
            <NoData iconSize="md">
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <Typography variant="h6" color="text.secondary">
                  Add an entry below.
                </Typography>
              </Box>
            </NoData>
          </Box>
        )}

        {/* {entries.map((entry) => (
        <EntryListItem
          key={entry.id}
          entry={entry}
          readonly={!editable}
          disabled={spinning}
          totalWeight={totalWeight}
        />
      ))} */}
      </List>
    </>
  )
}

// type ScrollProps = ScrollSeekPlaceholderProps & { widths?: number[]; width?: number }
type ScrollProps = { height: number; width?: number }

// export const ScrolLSkeleton: FC<ScrollProps> = ({ index, height, widths, width }) => {
export const ScrolLSkeleton: FC<ScrollProps> = ({ height, width }) => {
  // const width = widths?.length ? `${widths[index % widths?.length]}%` : "42%"
  return (
    // <ListItem>
    <Skeleton width={`${width}%`} height={height} />
    // sx={{
    //   mt: 0.125,
    //   ml: -1,
    // }}
    // </ListItem>
  )
}
