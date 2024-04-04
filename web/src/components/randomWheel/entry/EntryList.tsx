import { AlertPopup } from "@/components"
import { RandomWheelEntryFragment } from "@/generated/graphql"
import { List, ListItem, Skeleton } from "@mui/material"
import { FC, ReactNode, useEffect, useRef, useState } from "react"
import { Virtuoso } from "react-virtuoso"
import { EntryListItem } from "./EntryListItem"

interface Props {
  entries: RandomWheelEntryFragment[]
  editable?: boolean
  spinning?: boolean
  autoScroll?: boolean
  autoScrollThreshold?: number
}

export const EntryList: FC<Props> = ({ entries, editable, spinning, autoScroll, autoScrollThreshold = 50 }) => {
  const maxHeight = 470 + (!editable ? 88 + 64 : 0)

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

  // map delays

  const [showError, setShowError] = useState<ReactNode>(null)
  const [scrolling, setScrolling] = useState(false)

  // auto scroll
  const listRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const list = listRef?.current

    // scrollHeight - clientHeight = scrollTopMax
    if (autoScroll && list && list.scrollHeight - list.clientHeight - list.scrollTop < autoScrollThreshold) {
      list?.scrollTo({ top: list.scrollHeight - list.clientHeight })
    }
  }, [entries, listRef, autoScroll, autoScrollThreshold])

  const totalWeight = entries.reduce((acc, entry) => acc + entry.weight, 0)
  const entriesCount = entries.length

  return (
    <>
      <List role="list" ref={listRef} sx={{ py: 0, overflowY: "auto", maxHeight: maxHeight }}>
        {/* TODO: Provider and custom hook for alerts, maybe with possibility to stack them (see: notistack) */}
        <AlertPopup severity="success" messageState={[showError, setShowError]} />

        <Virtuoso
          style={{ height: maxHeight }}
          data={entries}
          isScrolling={setScrolling}
          components={{
            ScrollSeekPlaceholder: ScrolLSkeleton,
          }}
          scrollSeekConfiguration={{
            enter: (velocity) => entriesCount > 100 && Math.abs(velocity) > 120,
            exit: (velocity) => Math.abs(velocity) < 80,
          }}
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

export const ScrolLSkeleton: FC = () => {
  return (
    <ListItem>
      <Skeleton width="40%" sx={{ mt: 0.125, ml: -1 }} />
    </ListItem>
  )
}
