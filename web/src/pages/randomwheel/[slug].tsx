import { Badge, Box, Button, IconButton, Paper, Tab, Tabs, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiExternalLink, HiOutlineShare, HiShare, HiTrash } from "react-icons/hi";
import { TiArrowForward, TiArrowSync, TiExport, TiTrash } from "react-icons/ti";
import { TabPanel } from "../../components";
import { defaultLayout, LayoutNextPage } from "../../components/layout";
import { AddEntryForm, EntryList, Wheel, WinnerList } from "../../components/randomWheel";
import { RandomWheelEntryFragment, useRandomWheelBySlugQuery } from "../../generated/graphql";

const RandomWheelDetailPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const [{ data }] = useRandomWheelBySlugQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [entriesTab, setEntriesTab] = useState(0)

  const wheel = data?.randomWheelBySlug

  const [entries, setEntries] = useState<RandomWheelEntryFragment[]>([])

  useEffect(() => {
    setEntries(data?.randomWheelBySlug?.entries ?? [])
  }, [data?.randomWheelBySlug?.entries])

  if (!wheel) {
    // TODO: Proper error pages
    return (
      <Typography variant="h3">404 Not found</Typography>
    )
  }

  return (
    <>
      <Head>
        <title>Random Wheel | Aletheia</title>
      </Head>

      {wheel && (<>

        <Typography variant="h3">Random Wheel</Typography>

        <div>{wheel.name}</div>
        <div>
          {"Erstellt am "}
          {new Date(wheel.createdAt).toLocaleString()}
        </div>

        <Box sx={{
          my: 2,
          display: "grid",
          gap: 2,
          gridTemplateColumns: "repeat(3, 4fr)",
          gridTemplateRows: "auto",
          gridTemplateAreas: `
            "wheel wheel share"
            "wheel wheel names"
            "controls controls names"
          `,
        }}>

          <Box sx={{ gridArea: "wheel" }}>
            <Paper sx={{ p: 2, height: "100%" }}>

              <Wheel diameter={600} entries={entries} />

            </Paper>
          </Box>
          <Box sx={{ gridArea: "controls" }}>
            {/* <Paper sx={{ p: 2 }}>

              <div>Controls</div>

            </Paper> */}
          </Box>
          <Box sx={{ gridArea: "share" }}>
            <Paper sx={{ p: 2 }}>

              <div>Share</div>

            </Paper>
          </Box>
          <Box sx={{ gridArea: "names" }}>

            <Paper sx={{ height: "100%" }}>

              <Tabs
                value={entriesTab}
                onChange={(_, value) => setEntriesTab(value)}
                variant="fullWidth"
                sx={{
                  borderStartStartRadius: 6,
                  borderStartEndRadius: 6,
                }}
              >
                <Tab label="Names" />
                <Tab label="Winners" />
              </Tabs>

              <TabPanel index={0} activeTab={entriesTab}>

                <EntryList entries={entries} setEntries={setEntries} />
                <AddEntryForm wheelId={wheel.id} entries={entries} setEntries={setEntries} />

              </TabPanel>

              <TabPanel index={1} activeTab={entriesTab}>
                <WinnerList winners={
                  wheel.winners.map(winner => ({
                    ...winner,
                    createdAt: new Date(winner.createdAt)
                  }))
                } />
              </TabPanel>

            </Paper>

          </Box>
        </Box>

      </>)
      }
    </>
  )
}

export default RandomWheelDetailPage

RandomWheelDetailPage.getLayout = defaultLayout({ title: "Random Wheel" })
