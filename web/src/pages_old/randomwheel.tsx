import { LayoutNextPage, TabPanel, defaultLayout } from "@/components"
import { CreateEditWheelDialog, NoDataWheelList, WheelList } from "@/components/randomWheel"
import { useMyRandomWheelsQuery } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Box, Button, IconButton, SvgIcon, Tab, Tabs } from "@mui/material"
import { useState } from "react"
import { HiDotsVertical } from "react-icons/hi"
import { TiPlus } from "react-icons/ti"

type WheelListType = "my" | "shared" | "favorite"
const wheelsTypes: WheelListType[] = ["my", "shared", "favorite"]

const RandomWheelPage: LayoutNextPage = () => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [wheelsTab, setWheelsTab] = useState(0)

  const { user, authenticated } = useAuth()

  const [{ data, fetching }] = useMyRandomWheelsQuery({
    variables: {
      type: wheelsTypes[wheelsTab],
    },
  })

  const wheels = data?.myRandomWheels
  const wheelsEmpty = (wheels?.length ?? 0) === 0

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <Typography variant="h2">My Wheels</Typography> */}

        {user && (
          <Tabs value={wheelsTab} onChange={(_, value: number) => setWheelsTab(value)}>
            {/* itemType prop for new variant, because there is no variant prop */}
            <Tab label="My Wheels" itemType="capitalize" />
            <Tab label="Shared Wheels" itemType="capitalize" />
            <Tab label="Favorites" itemType="capitalize" />
          </Tabs>
        )}
        {!user && <div></div>}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            color="success"
            endIcon={<SvgIcon component={TiPlus} viewBox="0 1 24 24" />}
            onClick={() => setCreateDialogOpen(true)}
          >
            New Wheel
          </Button>

          {/* <Tooltip placement="bottom-end" title="More options"> */}
          <IconButton color="secondary" disabled>
            <HiDotsVertical />
          </IconButton>
          {/* </Tooltip> */}
        </Box>
      </Box>

      {[0, 1, 2].map((i) => (
        <TabPanel key={i} index={i} activeTab={wheelsTab} fullHeight noPadding>
          <WheelList items={wheels} loading={fetching} />
        </TabPanel>
      ))}

      {wheelsEmpty && !fetching && <NoDataWheelList type={wheelsTypes[wheelsTab]} authenticated={authenticated} />}

      <CreateEditWheelDialog type="create" open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel", navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelPage
