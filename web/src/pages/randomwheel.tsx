import { Box, Button, Typography } from "@mui/material"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { CreateWheelForm } from "../components/randomWheel"
import { RandomWheel, AppError, useMyRandomWheelsQuery, RandomWheelDetailsFragment } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import Link from "next/link"

const RandomWheelPage: LayoutNextPage = () => {

  const [{ data }] = useMyRandomWheelsQuery()

  const [wheels, setWheels] = useState<RandomWheelDetailsFragment[] | undefined>(data?.myRandomWheels)
  // const [error, setError] = useState<AppError | null | undefined>(undefined)

  useEffect(() => {
    setWheels(data?.myRandomWheels)
    //   switch (data?.myRandomWheels.__typename) {
    //     case "RandomWheelList":
    //       setWheels(data?.myRandomWheels.items)
    //       setError(null)
    //       break

    //     case "AppError":
    //       setError(data?.myRandomWheels)
    //       break
    //   }
  }, [data?.myRandomWheels])

  // const wheels = data?.myRandomWheels

  return (
    <>
      <Head>
        <title>Random Wheel | Aletheia</title>
      </Head>

      <Typography variant="h3">Create wheel</Typography>
      <Box sx={{ pb: 2 }}>
        <CreateWheelForm wheelState={[wheels, setWheels]} />
      </Box>

      <Typography variant="h3">My Wheels</Typography>
      <div>
        {wheels && (
          <>
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

            {wheels.length === 0 && (
              <p>You dont have any wheels yet.</p>
            )}
          </>
        )}

        {(!wheels || wheels.length === 0) && (
          <p>You dont have any RandomWheels yet.</p>
        )}
      </div>
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel", navTitle: "Random Wheel" })

export default RandomWheelPage