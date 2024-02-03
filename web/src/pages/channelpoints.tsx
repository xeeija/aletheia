import { Box, Button, IconButton, SvgIcon, Tab, Tabs, Tooltip } from "@mui/material"
import { FormikProps } from "formik"
import { useRef, useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"
import { FormDialog, NoData } from "../components"
import { LayoutNextPage, defaultLayout } from "../components/layout"
import { CreateChannelRewardForm } from "../components/twitch"
import { useChannelRewards } from "../hooks"

export const ChannelPointsPage: LayoutNextPage = () => {
  const [createRewardDialogOpen, setCreateRewardDialogOpen] = useState(false)
  const [createGroupDialogOpen, setCreateGroupDialogOpen] = useState(false)
  const [tab, setTab] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef<FormikProps<any>>(null)
  const actionsRef = useRef(null)

  const { channelRewards, fetching: fetchingRewards } = useChannelRewards()

  const channelRewardsEmpty = (channelRewards?.length ?? 0) === 0

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs value={tab} onChange={(_, value: number) => setTab(value)}>
          {/* itemType prop for new variant, because there is no variant prop */}
          <Tab label="Rewards" itemType="capitalize" />
          <Tab label="Reward Groups" itemType="capitalize" />
        </Tabs>

        {tab === 0 && (
          <Box>
            <Button
              variant="outlined"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateRewardDialogOpen(true)}
            >
              Create
            </Button>

            <Tooltip placement="bottom-end" title="More options">
              <IconButton color="secondary" sx={{ ml: 1 }} disabled>
                <HiDotsVertical />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {tab === 1 && (
          <Box>
            <Button
              variant="outlined"
              color="success"
              endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
              onClick={() => setCreateGroupDialogOpen(true)}
            >
              Create
            </Button>

            <Tooltip placement="bottom-end" title="More options">
              <IconButton color="secondary" sx={{ ml: 1 }} disabled>
                <HiDotsVertical />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 2 }}>
        {tab === 0 && (
          <Box>
            {/* <Link href="/channelpoints/create" passHref>
              <Button
                color="success"
                variant="contained"
                startIcon={<SvgIcon component={TiPlus} inheritViewBox />}
                onClick={() => setCreateRewardDialogOpen(true)}
              >
                Create Reward
              </Button>
            </Link> */}

            {channelRewards?.map((reward) => <pre key={reward.id}>{reward.title}</pre>)}

            {channelRewardsEmpty && !fetchingRewards && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <NoData>{"You don't have any channel point rewards yet."}</NoData>

                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                    onClick={() => setCreateRewardDialogOpen(true)}
                  >
                    Create reward
                  </Button>
                </Box>
              </Box>
            )}

            <FormDialog
              keepMounted
              maxWidth="sm"
              title={"Create Channel Reward"}
              open={createRewardDialogOpen}
              onClose={() => {
                setCreateRewardDialogOpen(false)

                if (formRef.current) {
                  setTimeout(() => formRef.current?.resetForm(), 350)
                }
              }}
              actionsRef={actionsRef}
            >
              <CreateChannelRewardForm actionsRef={actionsRef} formRef={formRef} />
            </FormDialog>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            {channelRewardsEmpty && !fetchingRewards && (
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <NoData>{"You don't have any rewards groups yet."}</NoData>

                <Box>
                  <Button
                    variant="contained"
                    color="success"
                    endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
                    onClick={() => setCreateGroupDialogOpen(true)}
                  >
                    Create group
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points", fullWidth: false })

export default ChannelPointsPage
