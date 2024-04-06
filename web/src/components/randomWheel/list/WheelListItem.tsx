import { AccessTypeBadge } from "@/components/randomWheel"
import { RandomWheelDetailsFragment } from "@/generated/graphql"
import { Box, Card, CardActionArea, CardContent, Chip, SvgIcon, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"
import { TiThList } from "react-icons/ti"

interface Props {
  wheel: RandomWheelDetailsFragment
}

export const WheelListItem: FC<Props> = ({ wheel }) => {
  return (
    <Card>
      <Link href={`randomwheel/${wheel.slug}`} passHref legacyBehavior>
        <CardActionArea sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6">{wheel.name || `Wheel #${wheel.slug}`}</Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(wheel.createdAt).toLocaleString(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </Typography>

            <Box sx={{ display: "flex", gap: 0.5, mt: 1 }}>
              <AccessTypeBadge type={wheel.accessType} />

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
    </Card>
  )
}
