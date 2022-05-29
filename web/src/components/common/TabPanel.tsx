import { FC } from "react";
import { Box } from "@mui/material";

interface Props {
  index: number
  activeTab: number
  keepMounted?: boolean
  fullHeight?: boolean
}

export const TabPanel: FC<Props> = ({ index, activeTab, keepMounted, children, fullHeight }) => {
  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== index}
      sx={{
        p: 2,
        ...(fullHeight && { height: "calc(100% - 48px)" }),
      }}
    >
      {(keepMounted || activeTab === index) && (<>{children}</>)}
    </Box>
  )
}
