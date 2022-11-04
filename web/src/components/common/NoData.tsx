import { FC } from "react"
import { Box, Typography } from "@mui/material"
import Image from "next/image"

interface Props { }

export const NoData: FC<Props> = ({ children }) => {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 3,
      mt: 2,
    }}>
      <Image src="/img/void.svg" alt="" width={120} height={120} draggable="false" />

      <Typography variant="h6" color="text.secondary" gutterBottom>
        {/* {"You don't have any Random Wheels yet."} */}
        {children}
      </Typography>
    </Box>
  )
}
