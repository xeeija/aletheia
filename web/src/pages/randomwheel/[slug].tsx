import { Box, IconButton, InputAdornment, Paper, SvgIcon, Tab, Tabs, TextField, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiPaperAirplane } from "react-icons/hi";
import { TabPanel } from "../../components";
import { LayoutNextPage } from "../../components/layout";
import { EntryList, WinnerList } from "../../components/randomWheel";
import { useRandomWheelBySlugQuery } from "../../generated/graphql";

const RandomWheelDetailPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const [{ data }] = useRandomWheelBySlugQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [entriesTab, setEntriesTab] = useState(0)

  if (data?.randomWwheelBySlug.__typename === "AppError") {
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

      {data?.randomWwheelBySlug.__typename === "RandomWheel" && (<>

        <Typography variant="h3">Random Wheel</Typography>

        <div>{data.randomWwheelBySlug.name}</div>
        <div>
          {"Erstellt am "}
          {new Date(data.randomWwheelBySlug.createdAt).toLocaleString()}
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
            <Paper sx={{ p: 2, height: "20rem" }}>

              <div>Wheel</div>

              <Box sx={{ fontFamily: "Consolas" }}>
                <Box>&nbsp;&nbsp;________</Box>
                <Box>&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</Box>
                <Box>/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\</Box>
                <Box>\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/</Box>
                <Box>&nbsp;{"\\________/"}</Box>
              </Box>

            </Paper>
          </Box>
          <Box sx={{ gridArea: "controls" }}>
            <Paper sx={{ p: 2 }}>

              <div>Controls</div>

            </Paper>
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

                <EntryList entries={["Alice", "Bob", "Charlie"]} />

                {/* TOOO: Form for add names, in own component */}

                <TextField
                  label="Add name"
                  variant="filled"
                  size="small"
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton aria-label="Add name" edge="end" sx={{ mr: -0.75 }}>
                        <SvgIcon component={HiPaperAirplane} viewBox="0 0 20 20" sx={{ transform: "rotate(90deg)" }} />
                      </IconButton>
                    </InputAdornment>
                  }}
                  sx={{
                    mt: 1
                  }}
                />

                {/* <TextField className={cl.mart}
                  variant="filled"
                  color="primary"
                  size="small"
                  label="Add name"
                  fullWidth
                  // disabled={spinning}
                  onKeyPress={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      // e.preventDefault()
                      addName(addNameRef.current?.value ?? "")
                    }
                  }}
                  InputProps={{
                    inputRef: addNameRef,
                    disableUnderline: true,
                    endAdornment: (
                      <InputAdornment className={cl.endAdornment} position="end">
                        <IconButton aria-label="Add name" edge="end" disabled={spinning}
                          onClick={() => addName(addNameRef.current?.value ?? "")}>
                          <SendRounded />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }} /> */}

              </TabPanel>

              <TabPanel index={1} activeTab={entriesTab}>
                <WinnerList winners={[
                  { name: "Mallory", createdAt: "today" },
                  { name: "Dave", createdAt: "16.5.2022" },
                  { name: "Eve", createdAt: "15.6.2022" },
                ]} />
              </TabPanel>

            </Paper>

          </Box>
        </Box>

      </>)}
    </>
  )
}

export default RandomWheelDetailPage
