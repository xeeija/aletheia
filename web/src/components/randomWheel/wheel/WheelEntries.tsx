"use client"

import { TabPanel } from "@/components"
import { AddEntryForm, EntryList, WinnerList } from "@/components/randomWheel"
import { RandomWheelEntryFragment, RandomWheelWinnerFragment } from "@/generated/graphql"
import { RandomWheelDetails } from "@/hooks"
import { Box, Chip, Paper, Tab, Tabs } from "@mui/material"
import { FC, useDeferredValue, useState, useTransition } from "react"

interface Props {
  wheel: RandomWheelDetails
  entries: RandomWheelEntryFragment[] | undefined
  winners: RandomWheelWinnerFragment[] | undefined
}

export const WheelEntries: FC<Props> = ({ wheel, entries, winners }) => {
  const [entriesTab, setEntriesTab] = useState(0)

  const [, startTransition] = useTransition()
  const deferredTab = useDeferredValue(entriesTab)

  // const [{ entries, winners }] = useRandomWheel(wheel.slug, { entries: true, winners: true })

  return (
    <Paper sx={{ height: "100%" }}>
      <Tabs
        value={deferredTab}
        onChange={(_, value: number) => startTransition(() => setEntriesTab(value))}
        variant="fullWidth"
        sx={{
          borderStartStartRadius: 6,
          borderStartEndRadius: 6,
        }}
      >
        {/* <Tooltip
        arrow
        placement="top"
        enterDelay={1000}
        title={entries?.length ? `${entries?.length ?? 0} entries` : ""}
      > */}
        <Tab
          sx={{ flexDirection: "row", gap: 1 }}
          itemType="capitalize"
          label={
            <>
              <span>Entries</span>
              <Chip
                label={entries?.length || 1}
                size="small"
                sx={{
                  height: 22,
                  transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  transform: entries?.length ? "" : "scale(0)",
                }}
              />
            </>
          }
        />
        {/* </Tooltip> */}

        <Tab
          sx={{ flexDirection: "row", gap: 1 }}
          itemType="capitalize"
          label={
            <>
              <span>Winners</span>
              <Chip
                label={winners?.length || 1}
                size="small"
                sx={{
                  height: 22,
                  transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  transform: winners?.length ? "" : "scale(0)",
                }}
              />
            </>
          }
        />
      </Tabs>
      <TabPanel index={0} activeTab={entriesTab} fullHeight>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            gap: 1,
          }}
        >
          <EntryList
            entries={entries ?? []}
            editable={wheel.editable || wheel.editAnonymous}
            spinning={wheel.spinning}
            autoScroll
          />

          {(wheel.editable || wheel.editAnonymous) && (
            <AddEntryForm
              wheelId={wheel.id}
              spinning={wheel.spinning}
              entries={wheel.uniqueEntries ? entries?.map((e) => e.name) : undefined}
            />
          )}
        </Box>
      </TabPanel>
      <TabPanel index={1} activeTab={entriesTab} fullHeight>
        <WinnerList
          winners={winners ?? []}
          spinning={wheel.spinning}
          editable={wheel.editable || wheel.editAnonymous}
        />
      </TabPanel>
    </Paper>
  )
}
