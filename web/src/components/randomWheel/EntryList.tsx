import { FC } from "react";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, SvgIcon, useTheme, Checkbox } from "@mui/material";
import { HiTrash } from "react-icons/hi";

interface Props {
  entries: string[]
}

export const EntryList: FC<Props> = ({ entries }) => {

  const theme = useTheme()

  // const itemTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 0,
  // })
  // const itemInTransition = theme.transitions.create(["opacity", "visibility", "transform"], {
  //   duration: theme.transitions.duration.shortest,
  //   delay: 1000,
  // })

  // map delays
  const itemTransition = [0, 1000].map(delay => (
    theme.transitions.create(["opacity", "visibility", "transform"], {
      duration: theme.transitions.duration.shortest,
      delay: delay,
    })
  ))

  return (
    <List role="list" style={{ maxHeight: 490 }}>
      {entries.map((entry, i) => (
        <ListItem key={i} role="listitem" dense button sx={{
          transition: itemTransition,
          "&:hover + .hoverItem, &:hover .hoverItem": {
            transition: itemTransition[1],
            visibility: "visible",
            opacity: 1,
            // transform: "scale(1) translateY(-50%)",
          }
        }}>
          {/* TODO: For transitions, maybe makes it easier? -> https://mui.com/material-ui/transitions/ */}
          <ListItemText id={`entry-${i}`} primary={entry} primaryTypographyProps={{
            fontSize: "1rem",
            fontWeight: 500,
          }} />
          <ListItemSecondaryAction className="hoverItem" sx={{
            transition: itemTransition[0],
            opacity: 0,
            visibility: "hidden",
            // transform: "scale(0) translateY(-100%)",
            "&:hover": {
              transition: itemTransition[1],
              opacity: 1,
              visibility: "visible",
              // transform: "scale(1) translateY(-50%)",
            }
          }}>
            {/* TODO: Delete nur mit shift halten */}
            <IconButton onClick={() => { /*deleteName(i)*/ }}>
              <SvgIcon component={HiTrash} fontSize="small" viewBox="0 0 20 20" color="error" />
              {/* <TiDelete fontSize="small" color="error" /> */}
            </IconButton>

            {/* <Checkbox edge="end"
              inputProps={{
                'aria-labelledby': `entry-${entry}`
              }} sx={{
                visibility: "visible",
                opacity: 1,
              }} /> */}

          </ListItemSecondaryAction>

          {/* <ListItemSecondaryAction>
            <Checkbox edge="end"
              inputProps={{
                'aria-labelledby': `entry-${entry}`
              }} sx={{
                visibility: "visible",
                opacity: 1,
              }} />
          </ListItemSecondaryAction> */}
        </ListItem>
      ))}
    </List>

  )
}