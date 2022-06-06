import { Badge, Box, Button, IconButton, InputAdornment, List, Paper, SvgIcon, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { HiDotsVertical, HiExternalLink, HiLink, HiPencil, HiShare, HiTrash } from "react-icons/hi";
import { TiArrowSync, TiRefresh } from "react-icons/ti";
import { io } from "socket.io-client";
import { Dropdown, LinkListItem, TabPanel } from "../../components";
import { defaultLayout, LayoutNextPage } from "../../components/layout";
import { AddEntryForm, ClearEntriesDialog, EntryList, Wheel, WinnerDialog, WinnerList } from "../../components/randomWheel";
import { useClearRandomWheelMutation, useDeleteRandomWheelEntryMutation, useRandomWheelBySlugEntriesQuery, useRandomWheelBySlugQuery, useRandomWheelBySlugWinnersQuery, useSpinRandomWheelMutation } from "../../generated/graphql";

const RandomWheelDetailPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const [{ data }] = useRandomWheelBySlugQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [{ data: winnersData }, fetchWinners] = useRandomWheelBySlugWinnersQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [{ data: entriesData }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [, spinRandomWheel] = useSpinRandomWheelMutation()
  const [, deleteEntry] = useDeleteRandomWheelEntryMutation()
  const [, clearRandomWheel] = useClearRandomWheelMutation()

  const [entriesTab, setEntriesTab] = useState(0)

  const wheel = data?.randomWheelBySlug
  const winners = winnersData?.randomWheelBySlug?.winners
  const entries = entriesData?.randomWheelBySlug?.entries

  // const [winners, setWinners] = useState<RandomWheelWinnerFragment[]>([])
  // useEffect(() => {
  //   if (winnersData?.randomWheelBySlug?.winners) {
  //     setWinners(winnersData?.randomWheelBySlug?.winners)
  //   }
  // }, [winnersData?.randomWheelBySlug?.winners])
  // const [entries, setEntries] = useState<RandomWheelEntryFragment[]>([])

  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)

  const [optionsAnchor, setOptionsAnchor] = useState<Element | null>(null)
  const [shareAnchor, setShareAnchor] = useState<Element | null>(null)

  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)
  const onRemoveWinnerDialog = async () => {

    // TODO: use entry from socket wheel:spin
    const winnerIndex = winners?.[0].winnerIndex

    console.log(winnerIndex)
    if (!(winnerIndex || winnerIndex === 0)) return

    const { data } = await deleteEntry({ id: entries?.[winnerIndex].id ?? "" }, {
      additionalTypenames: ["RandomWheelEntry"]
    })

    if (data?.deleteRandomWheelEntry) {
      // setEntries(entries.filter(e => e.id !== entries[winnerIndex].id))
    } else {
      // TODO: Error
    }

  }

  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const onClearDialog = async () => {
    if (!wheel) {
      return
    }

    const { data } = await clearRandomWheel({
      id: wheel?.id
    })

    // setEntries([])
    setWheelRotation(0)

    console.log(`deleted ${data?.clearRandomWheel} entries`)
    // TODO: Alerts and error handling

  }

  const copyHandler: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(`https://${window.location.host}/r/${slug}`)
  }

  const spinHandler: MouseEventHandler<HTMLButtonElement> = async () => {

    if (!wheel) {
      console.log("no wheel to spin")
      return
    }

    if (spinning) {
      console.log("already spinning")
      return
    }

    const { data, error } = await spinRandomWheel({
      wheelId: wheel?.id
    })

    if (!data) {
      // error handling
      console.warn(error)
      return
    }

    setTimeout(() => {
      setWinnerDialogOpen(true)
    }, 6500 + 10)

  }

  // socket
  useEffect(() => {
    if (!wheel?.id) {
      console.log("no wheel")
      return
    }

    const socket = io(process.env.SOCKET_SERVER_URL ?? process.env.SERVER_URL ?? "http://localhost:4000", {
      path: process.env.SOCKET_SERVER_PATH ?? "/socket",
    })

    socket.on("connect", () => {
      console.log("connect")
      socket.emit("wheel:join", wheel.id)
      console.log(`join ${wheel.id.substring(0, 6)}`)
    })

    socket.on("wheel:spin", ({ rotation, winner, entry }) => {
      console.log("wheel:spin", { rotation, winner, entry })

      const revolutions = ~~(Math.random() * (6 - 5 + 1) + 5)
      console.log(revolutions)

      setSpinning(true)
      setWheelRotation(rotation + (360 * revolutions))

      // TODO: Refactor to update the "local" winners with winner from socket?
      fetchWinners({ requestPolicy: "cache-and-network" })

      setTimeout(() => {
        setSpinning(false)
        setWheelRotation(rotation)
      }, 6500 + 10)

    })

    socket.on("wheel:entries", () => {
      console.log("wheel:entries")

      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      fetchEntries({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:spin")
      socket.disconnect()
      console.log(`disconnect ${wheel.id.substring(0, 6)}`)
    }
  }, [wheel?.id, fetchEntries, fetchWinners])

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

      {wheel && (
        <Box sx={{
          maxWidth: "85rem",
          mx: "auto",
        }}>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>

            <Typography variant="h2" sx={{}}>
              {wheel.name}
            </Typography>

            <Box>

              <Tooltip arrow placement="bottom" title="Popout">
                <IconButton color="secondary"
                  href={`${window.location.href}/popout`}
                  target="_blank"
                  sx={{ ml: 1 }}
                >
                  <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
                </IconButton>
              </Tooltip>

              <Tooltip arrow placement="bottom" title="Share">
                <IconButton color="secondary" onClick={(ev) => setShareAnchor(ev.currentTarget)}>
                  <HiShare />
                  {/* <HiLink /> */}
                </IconButton>
              </Tooltip>

              <Dropdown anchor={shareAnchor} setAnchor={setShareAnchor} >
                <Paper sx={{ p: 1.5, width: "20rem" }}>

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Share
                  </Typography>

                  <TextField
                    size="small"
                    variant="filled"
                    hiddenLabel
                    fullWidth
                    defaultValue={`${window.location.host}/r/${slug}`}
                    inputProps={{
                      style: {
                        // fontSize: "0.925rem",
                      }
                    }}
                    InputProps={{
                      readOnly: true,
                      sx: { pl: 1 },
                      startAdornment: (<InputAdornment position="start">
                        <Tooltip arrow placement="bottom" title="Copy">
                          <IconButton onClick={copyHandler} sx={{ p: 0.75, mx: -0.25 }}>
                            <SvgIcon color="secondary" component={HiLink} viewBox="-1 -1 22 22" />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>),
                      // endAdornment: (<InputAdornment position="end">
                      //   <SvgIcon color="secondary" component={HiClipboardCopy} />
                      // </InputAdornment>)
                    }}
                    onFocus={(ev) => {
                      ev.currentTarget.select()
                    }}
                  // onClick={(ev) => {
                  //   // console.log("click")
                  //   // navigator.clipboard.writeText(`${window.location.host}/r/${slug}`)
                  // }}
                  />

                </Paper>
              </Dropdown>

              <Tooltip arrow placement="bottom-end" title="More options">
                <IconButton color="secondary"
                  onClick={(ev) => setOptionsAnchor(ev.currentTarget)}
                >
                  <HiDotsVertical />
                </IconButton>
              </Tooltip>

              <Dropdown anchor={optionsAnchor} setAnchor={setOptionsAnchor}>
                <Paper sx={{ p: 1.5, width: 180 }}>

                  <List dense sx={{ py: 0 }}>
                    <LinkListItem name="Test spin" icon={<SvgIcon component={TiRefresh} viewBox="3 3 20 20" />} />
                    <LinkListItem name="Edit" icon={<SvgIcon component={HiPencil} viewBox="0 0 20 20" />} />
                    <LinkListItem name="Delete" icon={<SvgIcon component={HiTrash} />} />
                  </List>

                </Paper>
              </Dropdown>

            </Box>

          </Box>

          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.7 }}>
            {`von ${wheel.owner.displayname} • ${new Date(wheel.createdAt).toLocaleString()}`}
          </Typography>

          <Box sx={{
            mt: 2,
            display: "grid",
            gap: "1em 1em",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "min-content 1fr",
            gridTemplateAreas: `
              "wheel controls"
              "wheel names"
            `,
            // "wheel wheel names"
          }}>

            <Box sx={{ gridArea: "wheel" }}>
              <Paper sx={{ p: 2, height: "100%" }}>

                <Wheel diameter={677} entries={entries} rotation={wheelRotation || wheel.rotation} spinning={spinning} />

              </Paper>
            </Box>
            <Box sx={{ gridArea: "controls" }}>
              <Paper sx={{ p: 2 }}>

                <Badge badgeContent={entries?.length} color="success">
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!entries?.length}
                    startIcon={<SvgIcon component={TiArrowSync} viewBox="1 1 22 22" />}
                    onClick={spinHandler}
                  >
                    Spin
                  </Button>
                </Badge>

                <WinnerDialog
                  open={[winnerDialogOpen, setWinnerDialogOpen]}
                  description={winners?.[0]?.name}
                  onClose={() => setWinnerDialogOpen(false)}
                  onRemove={onRemoveWinnerDialog}
                />

                {/* <Button
                color="primary"
                variant="outlined"
                // className={cl.errorOutlined}
                disabled={entries.length === 0}
                startIcon={<SvgIcon component={TiRefresh} viewBox="2 3 20 20" />}
                // onClick={() => setClearDialogOpen(true)}
                sx={{ ml: 2 }}
              >
                Test
              </Button> */}

                <Button
                  color="error"
                  variant="outlined"
                  disabled={!entries?.length}
                  startIcon={<HiTrash />}
                  onClick={() => setClearDialogOpen(true)}
                  sx={{ ml: 2 }}
                >
                  Clear
                </Button>

                <ClearEntriesDialog
                  open={clearDialogOpen}
                  onClose={() => setClearDialogOpen(false)}
                  onClear={onClearDialog}
                />


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

                <TabPanel index={0} activeTab={entriesTab} fullHeight>
                  <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    gap: 2,
                  }}>

                    <EntryList entries={entries ?? []} />
                    <AddEntryForm wheelId={wheel.id} />

                  </Box>
                </TabPanel>

                <TabPanel index={1} activeTab={entriesTab} fullHeight>
                  <WinnerList winners={
                    (winners ?? []).map(winner => ({
                      ...winner,
                      createdAt: new Date(winner.createdAt)
                    }))
                  }
                    spinning={spinning}
                  />
                </TabPanel>

              </Paper>

            </Box>
          </Box>

        </Box>
      )}
    </>
  )
}

export default RandomWheelDetailPage

RandomWheelDetailPage.getLayout = defaultLayout({ title: "Random Wheel" })
