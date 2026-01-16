import { Tooltip } from "@/components"
import { AccessTypeBadge } from "@/components/randomWheel"
import { RandomWheelListItemFragment } from "@/generated/graphql"
import { Box, Card, CardActionArea, CardContent, Chip, SvgIcon, Typography } from "@mui/material"
import { useFormatter } from "next-intl"
import Link from "next/link"
import { FC } from "react"
import { TiThList } from "react-icons/ti"

interface Props {
  wheel: RandomWheelListItemFragment
}

export const WheelListItem: FC<Props> = ({ wheel }) => {
  const { dateTime } = useFormatter()

  return (
    <Card>
      <CardActionArea href={`randomwheel/${wheel.slug}`} LinkComponent={Link} sx={{ height: "100%" }}>
        <CardContent>
          <Tooltip title={wheel.title} placement="top">
            <Typography variant="h6" className="line-clamp line-clamp-2">
              {wheel.title}
            </Typography>
          </Tooltip>
          {/* <Typography variant="body2" color="text.secondary">
            {new Date(wheel.createdAt).toLocaleString(undefined, {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </Typography> */}
          <Typography variant="body2" color="text.secondary">
            <span>{dateTime(new Date(wheel.createdAt), "short")}</span>
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
    </Card>
  )
}
