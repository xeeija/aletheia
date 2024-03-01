import { Box } from "@mui/material"
import { FC } from "react"

interface Props {
  index: number
  activeTab: number
  keepMounted?: boolean
  fullHeight?: boolean
  noPadding?: boolean
}

export const TabPanel: FC<Props> = ({ index, activeTab, keepMounted, children, fullHeight, noPadding }) => {
  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== index}
      sx={{
        ...(!noPadding && { p: 2 }),
        ...(fullHeight && { height: "calc(100% - 48px)" }),
      }}
    >
      {(keepMounted || activeTab === index) && <>{children}</>}
    </Box>
  )
}
