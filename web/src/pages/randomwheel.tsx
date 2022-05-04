import { Typography } from "@mui/material"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { RandomWheelCreateForm } from "../components/randomWheel/RandomWheelCreateForm"
import { RandomWheel, Error, useGetRandomWheelsOfCurrentUserQuery } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "./_app"

export const RandomWheelPage: LayoutNextPage = () => {

  const [{ data }] = useGetRandomWheelsOfCurrentUserQuery()

  const [wheels, setWheels] = useState<RandomWheel[] | null | undefined>(undefined)
  const [error, setError] = useState<Error | null | undefined>(undefined)

  useEffect(() => {
    setWheels(data?.getRandomWheelsOfCurrentUser.randomWheels)
    setError(data?.getRandomWheelsOfCurrentUser.error)
  }, [data?.getRandomWheelsOfCurrentUser])

  return (
    <>
      <Head>
        <title>Random Wheel | Aletheia</title>
      </Head>

      <Typography variant="h2">My Wheels</Typography>
      <div>
        {wheels && (
          <>
            {wheels?.map(wheel => (
              <p key={wheel.slug}>
                Name: {wheel.name ?? "-"}<br />
                Slug: {wheel.slug}
              </p>
            ))}

            {wheels.length === 0 && (
              <p>You dont have any wheels yet.</p>
            )}
          </>
        )}

        {error && (
          <p>You made an Oopsie! {error.errorMessage}</p>
        )}
      </div>

      <Typography variant="h3" sx={{ pt: 2 }}>Create wheel</Typography>
      <div>

        <RandomWheelCreateForm wheelState={[wheels, setWheels]} />

      </div>
    </>
  )
}

RandomWheelPage.getLayout = defaultLayout({ title: "Random Wheel" })

export default RandomWheelPage