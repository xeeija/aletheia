import { WheelList } from "@/components/randomWheel"
import { Box, Skeleton, Typography } from "@mui/material"
import { FC } from "react"

const RandomWheelLoading: FC = () => {
  return (
    <Box sx={{ pt: 2 }}>
      <Box sx={{ display: "flex", gap: 2, pb: 1 }}>
        <Skeleton>
          <Typography variant="button">Wheels tab</Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant="button">Wheels tab</Typography>
        </Skeleton>
        <Skeleton>
          <Typography variant="button">Wheels tab</Typography>
        </Skeleton>
      </Box>

      <WheelList loading />
    </Box>
  )
}

export default RandomWheelLoading
