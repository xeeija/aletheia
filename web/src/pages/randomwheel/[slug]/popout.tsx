import { Box, useTheme } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getTitle, LayoutNextPage } from "../../../components/layout";
import { Wheel } from "../../../components/randomWheel";
import { useRandomWheelBySlugEntriesQuery, useRandomWheelBySlugQuery } from "../../../generated/graphql";

const RandomWheelPopoutPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const theme = useTheme()

  const [{ data, fetching }, fetchWheel] = useRandomWheelBySlugQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [{ data: entriesData }, fetchEntries] = useRandomWheelBySlugEntriesQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const [wheelRotation, setWheelRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)

  const wheel = data?.randomWheelBySlug
  const entries = entriesData?.randomWheelBySlug?.entries

  const title = wheel?.name || `Wheel #${slug}`

  // socket
  useEffect(() => {
    if (!wheel?.id) {
      // console.log("no wheel")
      return
    }

    const socket = io(process.env.SOCKET_SERVER_URL ?? process.env.SERVER_URL ?? "http://localhost:4000", {
      path: process.env.SOCKET_SERVER_PATH ?? "/socket",
    })

    socket.on("connect", () => {
      // console.log("connect")
      socket.emit("wheel:join", wheel.id)
      // console.log(`join ${wheel.id.substring(0, 6)}`)
    })

    socket.on("wheel:spin", ({ rotation }) => {
      // console.log("wheel:spin", { rotation, winner, entry })

      const revolutions = ~~(Math.random() * 2 + (wheel.spinDuration / 1000) - 1)
      // console.log(revolutions)

      setSpinning(true)
      setWheelRotation(rotation + (360 * revolutions))

      setTimeout(() => {
        setSpinning(false)
        setWheelRotation(rotation)
      }, wheel.spinDuration + 500 + 10)

    })

    socket.on("wheel:entries", () => {
      // console.log("wheel:entries")

      // TODO: Refactor to update the "local" entries with entry from socket?
      // Depending on type, add/delete/clear
      fetchEntries({
        requestPolicy: "cache-and-network",
      })
    })

    socket.on("wheel:update", () => {
      // console.log("wheel")

      fetchWheel({
        requestPolicy: "cache-and-network",
      })
    })

    return () => {
      socket.off("wheel:spin")
      socket.disconnect()
      // console.log(`disconnect ${wheel.id.substring(0, 6)}`)
    }
  }, [wheel?.id, wheel?.spinDuration, fetchEntries, fetchWheel])

  if (fetching || !slug) {
    return <Head>
      <title>{getTitle()}</title>
    </Head>
  }

  return (
    <>
      <Head>
        <title>{getTitle(`${title} Popout`)}</title>
      </Head>

      <Box sx={{
        width: "fit-content",
        opacity: 0,
        visibility: "hidden",
        transition: theme.transitions.create(["opacity", "visibility"], {
          duration: 500,
          delay: spinning ? 0 : wheel?.fadeDuration ?? 5000,
          easing: theme.transitions.easing.easeOut
        }),
        ...(spinning && {
          opacity: 1,
          visibility: "visible"
        }),
      }} className="fade">
        <Wheel
          diameter={680}
          entries={entries}
          rotation={(wheelRotation || wheel?.rotation) ?? 0}
          spinning={spinning}
          spinDuration={wheel?.spinDuration ?? 0}
        />
      </Box>
    </>
  )
}

RandomWheelPopoutPage.getLayout = (page) => page

export default RandomWheelPopoutPage
