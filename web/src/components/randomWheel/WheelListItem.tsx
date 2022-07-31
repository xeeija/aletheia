import { FC } from "react"
import { Box, Card, CardActionArea, CardContent, Chip, SvgIcon, Typography } from "@mui/material"
import { HiGlobe, HiLockClosed } from "react-icons/hi"
import { TiThList } from "react-icons/ti"
import { RandomWheelDetailsFragment } from "../../generated/graphql"
import Link from "next/link"

interface Props {
  wheel: RandomWheelDetailsFragment
}

export const WheelListItem: FC<Props> = ({ wheel }) => {
  return (
    <Card>
      <Link href={`randomwheel/${wheel.slug}`} passHref>
        <CardActionArea>
          <CardContent>
            <Typography variant="h6">
              {wheel.name ?? `Wheel #${wheel.slug}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(wheel.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
              <Chip
                label={wheel.accessType.toLowerCase()}
                component="div"
                size="small"
                variant="outlined"
                sx={{ textTransform: "capitalize", opacity: 1, fontWeight: 500 }}
                color={wheel.accessType === "PRIVATE" ? "secondary" : "success"}
                icon={<SvgIcon
                  component={wheel.accessType === "PRIVATE" ? HiLockClosed : HiGlobe}
                  viewBox="0 0 20 20"
                />}
              />

              <Chip
                component="div"
                size="small"
                variant="outlined"
                label={wheel._count?.entries ?? 0}
                sx={{ opacity: 0.8, fontWeight: 500 }}
                icon={<SvgIcon component={TiThList} viewBox="-2 -1 26 26" />}
              />
            </Box>

          </CardContent>
        </CardActionArea>
      </Link>
    </Card >
  )
}
