import { getTitle } from "@/components"
import NotFoundPage from "@/pages_old/404"
import { Box, Typography } from "@mui/material"
import { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

interface ErrorConfig {
  title: string
  subtitle: string
  imageSrc: string
}

const errorConfig: { [statusCode: number]: ErrorConfig } = {
  500: {
    // statusMessage
    title: "Oops, something went wrong.",
    subtitle: "But dont worry, it's not on your end - it's us.",
    imageSrc: "/img/monitor.svg",
  },
}

interface Props {
  statusCode: number
  statusMessage: string
}

const Error: NextPage<Props> = ({ statusCode, statusMessage }) => {
  const error = errorConfig[statusCode]

  if (!error) {
    return <NotFoundPage />
  }

  return (
    <>
      <Head>
        <title>{getTitle(statusMessage)}</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 6,
          py: 4,
          px: 2,
          // minHeight: "50vh",
        }}
      >
        <Image
          src={error.imageSrc}
          alt=""
          width={300}
          height={240}
          draggable="false"
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />

        <Box>
          <Typography variant="h4" className="muted">
            {statusCode} {statusMessage}
          </Typography>

          <Typography variant="h1" sx={{ mt: 4 }}>
            {error.title}
          </Typography>

          <Typography variant="body1" sx={{ fontSize: "1.125em", mt: 2 }} className="muted">
            {error.subtitle}
          </Typography>
        </Box>
      </Box>
    </>
  )
}

Error.getInitialProps = ({ res }) => {
  return {
    statusCode: res?.statusCode ?? 404,
    statusMessage: res?.statusMessage ?? "Not Found",
  }
}

export default Error
