import { Box, Button, Typography } from "@mui/material"
import React, { useState } from "react"
import { CreateEditWheelDialog } from "../components/randomWheel"
import { useMyRandomWheelsQuery } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import Link from "next/link"

const RandomWheelPage: LayoutNextPage = () => {

  const [{ data }] = useMyRandomWheelsQuery()

  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const wheels = data?.myRandomWheels

  const wheelsEmpty = (wheels?.length ?? 0) === 0

  return (
    <>
      <Typography variant="h3">Create wheel</Typography>
      <Box sx={{ my: 2 }}>
        <Button variant="contained" color="success" onClick={() => setCreateDialogOpen(true)}>Create</Button>
      </Box>

      <Typography variant="h3">My Wheels</Typography>
      {!wheelsEmpty && (
        <Box>
          {wheels?.map(wheel => (
            <Box key={wheel.id} sx={{ pb: 1 }}>
              <div>Name: {wheel.name ?? "-"}</div>
              <span>Slug </span>
              <Link href={`randomwheel/${wheel.slug}`} passHref>
                <Button sx={{ textTransform: "none" }}>
                  {wheel.slug}
                </Button>
              </Link>
            </Box>
          ))}
        </Box>
      )}

      {wheelsEmpty && <p>You dont have any RandomWheels yet.</p>}

      <CreateEditWheelDialog type="create" open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} />
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel", navTitle: "Random Wheel" })

export default RandomWheelPage
