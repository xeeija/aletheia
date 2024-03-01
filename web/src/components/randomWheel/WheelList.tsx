import { SkeletonList } from "@/components"
import { WheelListItem } from "@/components/randomWheel"
import { RandomWheelDetailsFragment } from "@/generated/graphql"
import { Box } from "@mui/material"
import { FC } from "react"

interface Props {
  items?: RandomWheelDetailsFragment[]
  loading?: boolean
}

export const WheelList: FC<Props> = ({ items, loading }) => {
  return (
    <Box
      sx={{
        gap: 2,
        mt: 2,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(256px, 1fr))",
      }}
    >
      {!loading && items?.map((wheel) => <WheelListItem wheel={wheel} key={wheel.id} />)}

      {loading && <SkeletonList n={5} height={100} />}
    </Box>
  )
}
