import { NoData } from "@/components"
import { Virtuoso } from "@/components/client/react-virtuoso"
import { RandomWheelWinnerFragment } from "@/generated/graphql"
import { Box, ListItem, ListItemText, Skeleton, Typography } from "@mui/material"
import { useFormatter } from "next-intl"
import { FC } from "react"

interface Props {
  winners: RandomWheelWinnerFragment[]
  // wheel: RandomWheelDetails
  spinning?: boolean
  editable?: boolean
}

// TODO: Infinite scroll (bis alle Winner geladen sind), oder load more Button?
// Winner in der WinnerList component laden, und nicht in Wheel, sondern wheel übergeben, oder wheel id

export const WinnerList: FC<Props> = ({ winners, spinning, editable }) => {
  const maxHeight = 464 + (!editable ? 84 : 0)

  // const [{ winners: winnersInput, fetching }] = useRandomWheel(wheel.slug ?? "", {
  //   details: true,
  //   winners: true,
  // })

  const { dateTime } = useFormatter()

  return (
    <Box>
      {winners?.length > 0 && (
        <>
          <Box sx={{ px: 1.5, pb: 2 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 0.5,
                mb: 0.75,
                fontWeight: 500,
              }}
            >
              {!spinning && `Latest winner • ${dateTime(new Date(winners[0]?.createdAt), "short")}`}
              {spinning && <Skeleton width="30%" />}
            </Typography>
            <Typography variant="h3" noWrap>
              {!spinning ? winners[0]?.name : <Skeleton width="45%" />}
            </Typography>
          </Box>

          <Virtuoso
            data={winners.slice(1)}
            computeItemKey={(_, winner) => winner.id}
            style={{ height: maxHeight }}
            itemContent={(_, { name, createdAt }) => (
              <ListItem role="listitem" dense sx={{ mt: 0 }}>
                <ListItemText
                  primary={name}
                  secondary={dateTime(new Date(createdAt), "short")}
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                  sx={{ my: 0, pb: 1 }}
                />
              </ListItem>
            )}
          />

          {/* <List sx={{ pb: 0.5, overflowY: "auto", maxHeight: maxHeight }}>
            {winners.slice(1).map(({ name, createdAt }, i) => (
              <ListItem key={i} role="listitem" dense sx={{ mt: 0 }}>
                <ListItemText
                  primary={name}
                  secondary={createdAt.toLocaleString()}
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    fontWeight: 500,
                  }}
                  sx={{ my: 0, pb: 1 }}
                />
              </ListItem>
            ))}
          </List> */}
        </>
      )}

      {!winners?.length && (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <NoData iconSize={140} image="/img/winners.svg" sx={{ mt: 0 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography variant="h6">Spin to win!</Typography>
              <Typography color="text.secondary">No one has won yet.</Typography>
            </Box>
          </NoData>
        </Box>
      )}
    </Box>
  )
}
