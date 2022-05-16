import { FC } from "react";
import { Box } from "@mui/material";

interface Props {
  index: number
  activeTab: number
  keepMounted?: boolean
}

export const TabPanel: FC<Props> = ({ index, activeTab, keepMounted, children }) => {
  return (
    <Box
      role="tabpanel"
      hidden={activeTab !== index}
      sx={{ p: 2 }}
    >
      {(keepMounted || activeTab === index) && (<>{children}</>)}
    </Box>
  )
}
