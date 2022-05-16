import { FC } from "react";
import { Typography, List, ListItem, ListItemText, SvgIcon, Box } from "@mui/material";
import { HiSpeakerphone } from "react-icons/hi";

interface Winner {
  name: string
  createdAt: string
}

interface Props {
  winners: Winner[]
}

export const WinnerList: FC<Props> = ({ winners }) => {

  return (
    winners.length > 0 ?
      // Winners present
      <>
        <Box sx={{ px: 1.5, pb: 1.5 }}>
          <Typography variant="overline" color="textSecondary">
            Latest winner &nbsp;&bull;&nbsp; {winners[0]?.createdAt}
          </Typography>
          <Typography variant="h4" noWrap>
            {winners[0]?.name}
          </Typography>
        </Box>

        {/* Maybe toggle previous winners */}
        <List sx={{ pb: 0, }}>
          {winners.slice(1).map(({ name, createdAt }, i) => (
            <ListItem key={i} role="listitem" dense sx={{ mt: 0 }}>
              <ListItemText primary={name} secondary={createdAt} primaryTypographyProps={{
                fontSize: "1rem",
                fontWeight: 500,
              }} />
            </ListItem>
          ))}
        </List>
      </> :
      // No winners yet
      <Box sx={{ textAlign: "center", p: 3 }}>
        <Typography variant="h6" color="textSecondary">
          <SvgIcon component={HiSpeakerphone} fontSize="large" />
          <div>No one has won yet ...</div>
        </Typography>
      </Box>
  )
}