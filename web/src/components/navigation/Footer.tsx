import { Box, Typography } from "@mui/material"
import { FC } from "react"

interface Props { }

export const Footer: FC<Props> = () => {
  return (
    <Box component="footer" sx={{
      display: "flex",
      justifyContent: "center",
    }}>
      <Typography variant="subtitle2" color="text.disabled"
        sx={{
          fontSize: "0.8125rem",
          "& > *:not(:first-of-type)::before": {
            content: "'•'",
            px: 0.5,
          }
        }}
      >
        <span>
          Made with <Typography component="span" color="text.secondary" variant="inherit">💜</Typography> by Xeeija
        </span>
      </Typography>
    </Box>
  )
}
