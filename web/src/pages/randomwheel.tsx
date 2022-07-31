import { Box, Button, IconButton, Skeleton, SvgIcon, Tooltip, Typography } from "@mui/material"
import React, { useState } from "react"
import { CreateEditWheelDialog, WheelListItem } from "../components/randomWheel"
import { useMyRandomWheelsQuery } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import Image from "next/image"
import { TiPlus } from "react-icons/ti"
import { HiDotsVertical } from "react-icons/hi"

const RandomWheelPage: LayoutNextPage = () => {

  const [{ data, fetching }] = useMyRandomWheelsQuery()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const wheels = data?.myRandomWheels

  const wheelsEmpty = (wheels?.length ?? 0) === 0

  return (
    <>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between"
      }}>
        <Typography variant="h2">My Wheels</Typography>
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

      {(!wheelsEmpty || fetching) && (
        <Box sx={{
          gap: 2,
          mt: 2,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
        }}>
          {!wheelsEmpty && wheels?.map(wheel => (
            <WheelListItem wheel={wheel} key={wheel.id} />
          ))}

          {fetching && [1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} height={100} variant="rectangular" sx={{ animationDelay: `${i * 50}ms` }} />
          ))}
        </Box>
      )}

      {wheelsEmpty && !fetching && (
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
          mt: 2,
        }}>
          <Image src="/img/void.svg" alt="" width={120} height={120} draggable="false" />

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {"You don't have any Random Wheels yet."}
          </Typography>
        </Box>
      )}

      <CreateEditWheelDialog type="create" open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel", navTitle: "Random Wheel", fullWidth: false })

export default RandomWheelPage
