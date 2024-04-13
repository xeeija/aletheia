import { Box, Skeleton, Typography } from "@mui/material"
import { FC } from "react"

interface Props {}

export const WheelSkeleton: FC<Props> = () => {
  return (
    <Box>
      <Typography variant="h1" width="42%">
        <Skeleton />
      </Typography>
      <Typography width="32%">
        <Skeleton sx={{ animationDelay: 50 }} />
      </Typography>
      <Box
        sx={{
          mt: 2,
          display: "grid",
          gap: "1em 1em",
          gridTemplateColumns: "2fr 1fr",
          gridTemplateRows: "min-content 1fr",
        }}
      >
        <Skeleton variant="rectangular" height="calc(80vh - 64px)" sx={{ animationDelay: 100 }} />
        <Skeleton variant="rectangular" height="calc(80vh - 64px)" sx={{ animationDelay: 100 }} />
      </Box>
    </Box>
  )
}
