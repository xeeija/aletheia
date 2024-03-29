import { Box, List, ListItem, ListItemText, Skeleton, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import { HiSpeakerphone } from "react-icons/hi"

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
      <Typography variant="h6" color="textSecondary">
        <SvgIcon component={HiSpeakerphone} fontSize="large" />
        <div>No one has won yet ...</div>
      </Typography>
    </Box>
  )
}
