import { Box, Skeleton, Typography } from "@mui/material"
import { FC } from "react"

const RandomWheelSlugLoading: FC = () => {
  return (
    <Box>
      <Typography variant="h2">
        <Skeleton sx={{ width: 400 }} />
      </Typography>
      <Typography variant="body1">
        <Skeleton sx={{ width: 200 }} />
      </Typography>

      <Skeleton variant="rounded" sx={{ mt: 2.5, width: "100%", height: 600 }} />
    </Box>
  )
}

export default RandomWheelSlugLoading
