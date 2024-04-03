import { NoData } from "@/components"
import { Box, List, ListItem, ListItemText, Skeleton, Typography } from "@mui/material"
import { FC } from "react"

interface Winner {
  name: string
  createdAt: Date
}

interface Props {
  winners: Winner[]
  spinning?: boolean
  editable?: boolean
}

export const WinnerList: FC<Props> = ({ winners, spinning, editable }) => {
  const maxHeight = 468 + (!editable ? 84 : 0)

  return winners.length > 0 ? (
    // Winners present
    <>
      <Box sx={{ px: 1.5, pb: 1.5 }}>
        <Typography variant="overline" color="textSecondary">
          Latest winner &nbsp;&bull;&nbsp; {winners[0]?.createdAt.toLocaleString()}
        </Typography>
        <Typography variant="h3" noWrap>
          {!spinning ? winners[0]?.name : <Skeleton width="40%" />}
        </Typography>
      </Box>

      {/* Maybe toggle previous winners */}
      <List sx={{ pb: 0, overflowY: "auto", maxHeight: maxHeight }}>
        {winners.slice(1).map(({ name, createdAt }, i) => (
          <ListItem key={i} role="listitem" dense sx={{ mt: 0 }}>
            <ListItemText
              primary={name}
              secondary={createdAt.toLocaleString()}
              primaryTypographyProps={{
                fontSize: "1rem",
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  ) : (
    // No winners yet
    <Box sx={{ textAlign: "center", p: 3 }}>
      <NoData iconSize="md">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Typography variant="h6">Spin to win!</Typography>
          <Typography color="text.secondary">No one has won yet.</Typography>
        </Box>
      </NoData>
    </Box>
  )
}
