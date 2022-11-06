import { Box, Button, IconButton, SvgIcon, Tab, Tabs, Tooltip } from "@mui/material"
import React, { useState } from "react"
import { CreateEditWheelDialog, WheelList } from "../components/randomWheel"
import { useMyRandomWheelsQuery } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import { TiPlus } from "react-icons/ti"
import { HiDotsVertical } from "react-icons/hi"
import { NoData, TabPanel } from "../components"

const wheelsTypes = ["my", "shared", "favorite"]

const RandomWheelPage: LayoutNextPage = () => {

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [wheelsTab, setWheelsTab] = useState(0)

  const [{ data, fetching }] = useMyRandomWheelsQuery({
    variables: {
      type: wheelsTypes[wheelsTab]
    },
  })

  const wheels = data?.myRandomWheels
  const wheelsEmpty = (wheels?.length ?? 0) === 0

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        {/* <Typography variant="h2">My Wheels</Typography> */}

        <Tabs
          value={wheelsTab}
          onChange={(_, value) => setWheelsTab(value)}
        >
          {/* itemType prop for new variant, because there is no variant prop */}
          <Tab label="My Wheels" itemType="capitalize" />
          <Tab label="Shared Wheels" itemType="capitalize" />
          <Tab label="Favorites" itemType="capitalize" />
        </Tabs>

        <Box>
          <Button variant="outlined" color="success"
            endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
            onClick={() => setCreateDialogOpen(true)}
          >
            New
          </Button>

          <Tooltip placement="bottom-end" title="More options">
            <IconButton color="secondary" sx={{ ml: 1 }} disabled>
              <HiDotsVertical />
            </IconButton>
          </Tooltip>

        </Box>
      </Box>

      {[0, 1, 2].map((i) => (
        <TabPanel key={i} index={i} activeTab={wheelsTab} fullHeight noPadding>
          <WheelList items={wheels} loading={fetching} />
        </TabPanel>
      ))}

      {wheelsEmpty && !fetching && (
        <NoData>
          {"You don't have any Random Wheels yet."}
        </NoData>
      )}

      <CreateEditWheelDialog type="create" open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel", navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelPage
