import { Badge, Box, Button, IconButton, InputAdornment, List, Paper, Skeleton, SvgIcon, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import { HiDotsVertical, HiExternalLink, HiLink, HiPencil, HiRefresh, HiShare, HiTrash } from "react-icons/hi";
import { TiArrowRepeat, TiRefresh, TiStarFullOutline, TiStarOutline, TiUserAdd } from "react-icons/ti";
import { Dropdown, LinkListItem, TabPanel } from "../../components";
import { LayoutNextPage, defaultLayout, getTitle } from "../../components/layout";
import { AccessTypeBadge, AddEntryForm, ClearEntriesDialog, CreateEditWheelDialog, DeleteWheelDialog, EditMembersDialog, EntryList, Wheel, WinnerDialog, WinnerList } from "../../components/randomWheel";
import { RedemptionSyncDialog } from "../../components/randomWheel/RedemptionSyncDialog";
import { useAuth, useRandomWheel } from "../../hooks";
import NotFoundPage from "../404";

const RandomWheelDetailPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const { user } = useAuth()

  const [
    { wheel, entries, winners, fetching, lastWinnerEntry },
    { spin, clear, like, deleteEntry, deleteWheel },
  ] = useRandomWheel(slug ?? "", {
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

  const [entriesTab, setEntriesTab] = useState(0)

  const [optionsAnchor, setOptionsAnchor] = useState<Element | null>(null)
  const [shareAnchor, setShareAnchor] = useState<Element | null>(null)

  const [winnerDialogOpen, setWinnerDialogOpen] = useState(false)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const [redemptionDialogOpen, setRedemptionDialogOpen] = useState(false)

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const onDeleteDialog = async () => {
    await deleteWheel()
    router.push("/randomwheel")
  }

  const copyHandler: MouseEventHandler<HTMLButtonElement> = () => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/r/${slug}`)
  }

  if (fetching.wheel || !slug) {
    return <Box>
      <Typography variant="h1" width="42%"><Skeleton /></Typography>
      <Typography width="32%"><Skeleton sx={{ animationDelay: 50 }} /></Typography>
      <Box sx={{
        mt: 2,
        display: "grid",
        gap: "1em 1em",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: "min-content 1fr",
      }}>
        <Skeleton variant="rectangular" height="calc(80vh - 64px)" sx={{ animationDelay: 100 }} />
        <Skeleton variant="rectangular" height="calc(80vh - 64px)" sx={{ animationDelay: 100 }} />
      </Box>

    </Box>
  }

  if (!wheel) {
    // TODO: Proper error pages
    return <NotFoundPage />
  }

  // TODO: Use members, server-side
  // https://nextjs.org/docs/advanced-features/middleware

  if (!wheel.viewable) {
    return <NotFoundPage />
  }

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
              <Typography variant="h2">
                {title}
              </Typography>

              <AccessTypeBadge type={wheel.accessType} />
            </Box>

            <Box>

              <Tooltip arrow placement="bottom" title="Favorite">
                <IconButton color={wheel.liked ? "error" : "secondary"}
                  disabled={!user}
                  sx={{ ml: 1 }}
                  onClick={like}
                >
                  <SvgIcon component={wheel.liked ? TiStarFullOutline : TiStarOutline} viewBox="2 2 20 20" />
                </IconButton>
              </Tooltip>

              {/* <Tooltip arrow placement="bottom" title="Favorite">
                <IconButton color={wheelLiked ? "error" : "secondary"}
                  disabled={!user}
                  sx={{ ml: 1 }}
                  onClick={async () => {
                    const res = await likeRandomWheel({
                      randomWheelId: wheel.id,
                      like: !wheelLiked
                    })
                    // TODO: Error when undefined?
                    setWheelLiked(Boolean(res.data?.likeRandomWheel))
                  }}
                >
                  {wheelLiked ?
                    <SvgIcon component={TiHeart} viewBox="2.5 2.5 19 19" /> :
                    // <SvgIcon component={TiHeartFullOutline} viewBox="1 0.5 21 21" /> :
                    <SvgIcon component={TiHeartOutline} viewBox="1 0.5 21 21" />
                  }
                </IconButton>
              </Tooltip> */}

              {/* {wheel.editable && ( */}
              <Tooltip arrow placement="bottom" title="Popout">
                <IconButton color="secondary"
                  href={`${window.location.href}/popout`}
                  target="_blank"
                  sx={{ ml: 1 }}
                >
                  <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
                </IconButton>
              </Tooltip>
              {/* )} */}

              <Tooltip arrow placement="bottom" title="Share">
                <IconButton color="secondary" onClick={(ev) => setShareAnchor(ev.currentTarget)}>
                  <HiShare />
                  {/* <HiLink /> */}
                </IconButton>
              </Tooltip>

              <Dropdown anchor={shareAnchor} setAnchor={setShareAnchor} >
                <Paper sx={{ p: 1.5, width: "18rem" }}>

                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Share
                  </Typography>

                  <TextField
                    size="small"
                    variant="filled"
                    hiddenLabel
                    fullWidth
                    defaultValue={`${window.location.host}/r/${slug}`}
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
                  />

                </Paper>
              </Dropdown>

              <Tooltip arrow placement="bottom-end" title="More options">
                <IconButton color="secondary"
                  disabled={!wheel.editable && !wheel.editAnonymous}
                  onClick={(ev) => setOptionsAnchor(ev.currentTarget)}
                >
                  <HiDotsVertical />
                </IconButton>
              </Tooltip>

              <Dropdown anchor={optionsAnchor} setAnchor={setOptionsAnchor}>
                <Paper sx={{ p: 1.5, width: 180 }}>

                  <List dense sx={{ py: 0 }}>
                    <LinkListItem name="Test spin" icon={<SvgIcon component={TiRefresh} viewBox="2 3 20 20" />} disabled />
                    <LinkListItem
                      name="Edit"
                      icon={<SvgIcon component={HiPencil} viewBox="0 0 20 20" />}
                      // href={`${window.location.href}/edit`}
                      onClick={() => {
                        // TODO: Make default option in Dropdown or LinkListItem or so to close on clicking a button
                        setOptionsAnchor(null)
                        setEditDialogOpen(true)
                      }}
                    />
                    {(wheel.editable || wheel.editAnonymous) && wheel.owner &&
                      <LinkListItem
                        name="Members"
                        icon={<SvgIcon component={TiUserAdd} />}
                        onClick={() => {
                          setOptionsAnchor(null)
                          setMembersDialogOpen(true)
                        }}
                      />
                    }
                    {wheel.editable && user.id &&
                      <LinkListItem
                        name="Sync"
                        icon={<SvgIcon component={TiArrowRepeat} viewBox="2 1 22 22" />}
                        onClick={() => {
                          setOptionsAnchor(null)
                          setRedemptionDialogOpen(true)
                        }}
                      />
                    }
                    {wheel.owner && user?.id === wheel.owner.id && (
                      <>
                        <LinkListItem divider />
                        <LinkListItem
                          name="Delete"
                          color="error"
                          icon={<SvgIcon component={HiTrash} viewBox="-2 -2 24 24" />}
                          onClick={() => {
                            setOptionsAnchor(null)
                            setDeleteDialogOpen(true)
                          }} />
                      </>
                    )}
                  </List>

                </Paper>
              </Dropdown>

              {(wheel.editable || wheel.editAnonymous) && (
                <CreateEditWheelDialog type="edit" open={editDialogOpen} slug={wheel.slug} onClose={() => setEditDialogOpen(false)} />
              )}

              {(wheel.editable || wheel.editAnonymous) && wheel.owner &&
                <EditMembersDialog
                  open={membersDialogOpen}
                  slug={wheel.slug}
                  onClose={() => setMembersDialogOpen(false)}
                  readonly={wheel.owner.id !== user?.id}
                />
              }

              {wheel.editable &&
                <RedemptionSyncDialog
                  open={redemptionDialogOpen}
                  slug={wheel.slug}
                  onClose={() => setRedemptionDialogOpen(false)}
                  readonly={wheel.owner.id !== user?.id}
                />
              }

              {wheel.owner && wheel.owner?.id === user?.id &&
                <DeleteWheelDialog
                  open={deleteDialogOpen}
                  onClose={() => setDeleteDialogOpen(false)}
                  onDelete={onDeleteDialog}
                />
              }

            </Box>

          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {`${wheel.owner ? `von ${wheel.owner.displayname}` : "anonymous"} • `}
            {new Date(wheel.createdAt).toLocaleString()}
          </Typography>

          <Box sx={{
            mt: 2,
            display: "grid",
            gap: "1em 1em",
            gridTemplateColumns: "2fr 1fr",
            gridTemplateRows: "min-content 1fr",
            gridTemplateAreas: `
              "wheel ${(wheel.editable || wheel.editAnonymous) ? "controls" : "names"}"
              "wheel names"
            `,
            // "wheel wheel names"
          }}>

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
                <Paper sx={{ p: 2 }}>

                  <Badge badgeContent={entries?.length} color="success">
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={!entries?.length || wheel.spinning}
                      endIcon={<SvgIcon component={HiRefresh} viewBox="0 0 20 20" />}
                      onClick={spin}
                    >
                      Spin
                    </Button>
                  </Badge>

                  <Button
                    color="error"
                    variant="outlined"
                    disabled={!entries?.length || wheel.spinning}
                    endIcon={<HiTrash />}
                    onClick={() => setClearDialogOpen(true)}
                    sx={{ ml: 2 }}
                  >
                    Clear
                  </Button>

                  <ClearEntriesDialog
                    open={clearDialogOpen}
                    onClose={() => setClearDialogOpen(false)}
                    onClear={clear}
                  />

                </Paper>
              </Box>
            )}

            <WinnerDialog
              open={[winnerDialogOpen, setWinnerDialogOpen]}
              description={winners?.[0]?.name}
              onClose={() => setWinnerDialogOpen(false)}
              onRemove={async () => await deleteEntry(lastWinnerEntry?.id ?? "")}
              hideRemove={!wheel.editable && !wheel.editAnonymous}
            />

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

                    <EntryList entries={entries ?? []} editable={wheel.editable || wheel.editAnonymous} spinning={wheel.spinning} autoScroll />

                    {(wheel.editable || wheel.editAnonymous) &&
                      <AddEntryForm wheelId={wheel.id} spinning={wheel.spinning} />
                    }

                  </Box>
                </TabPanel>

                <TabPanel index={1} activeTab={entriesTab} fullHeight>
                  <WinnerList winners={
                    (winners ?? []).map(winner => ({
                      ...winner,
                      createdAt: new Date(winner.createdAt)
                    }))
                  }
                    spinning={wheel.spinning}
                    editable={wheel.editable || wheel.editAnonymous}
                  />
                </TabPanel>

              </Paper>

            </Box>
          </Box>

        </>
      )}
    </>
  )
}

RandomWheelDetailPage.getLayout = defaultLayout({ navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelDetailPage
