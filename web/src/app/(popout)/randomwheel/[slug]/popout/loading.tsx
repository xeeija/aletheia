import { Skeleton } from "@mui/material"
import { FC } from "react"

const RandomWheelPopoutLoading: FC = () => {
  // from default Wheel size
  const skeletonSize = 600

  return <Skeleton variant="circular" sx={{ width: skeletonSize, height: skeletonSize }} />
}

export default RandomWheelPopoutLoading
