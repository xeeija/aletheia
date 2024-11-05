import { Box, Typography } from "@mui/material"
import Image from "next/image"
import { FC } from "react"

interface Props {}

export const NotFound: FC<Props> = () => {
  return (
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
        src="/img/mathematics.svg"
        priority
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
          404 Not Found
        </Typography>

        <Typography variant="h1" sx={{ mt: 4 }}>
          The page you are looking for is imaginary.
        </Typography>

        <Typography variant="body1" sx={{ fontSize: "1.125em", mt: 2 }} className="muted">
          Please rotate the keyboard by 90 degrees and try again.
        </Typography>
      </Box>
    </Box>
  )
}
