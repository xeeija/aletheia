import { NoData } from "@/components"
import { NoDataWheelListActions } from "@/components/randomWheel"
import { Button, SvgIcon, Typography } from "@mui/material"
import Link from "next/link"
import { FC } from "react"
import { TiStarOutline } from "react-icons/ti"

interface Props {
  type: "my" | "shared" | "favorite"
  authenticated: boolean
}

export const NoDataWheelList: FC<Props> = ({ type = "my", authenticated }) => {
  const image = {
    my: undefined,
    shared: "/img/share.svg",
    favorite: "/img/for_review.svg",
  }

  return (
    <NoData
      image={!authenticated ? "/img/buffer.svg" : image[type]}
      iconSize={authenticated && type === "my" ? "lg" : 200}
    >
      <Typography variant="h5" color="text.secondary">
        {type === "my" && "You don't have any Random Wheels yet."}
        {type === "shared" && "You don't have any shared Random Wheels yet."}
        {type === "favorite" && "You don't have any favorites yet."}
      </Typography>

      {authenticated && type === "my" && (
        <>
          <Typography color="textSecondary" sx={{ mt: -2, textAlign: "center" }}>
            Create your first wheel! We will save all your wheels here, <br />
            so you always have them ready.
          </Typography>

          <NoDataWheelListActions />
        </>
      )}

      {authenticated && type === "shared" && (
        <Typography color="textSecondary" sx={{ mt: -2, textAlign: "center" }}>
          Shared wheels of other users will be shown here.
        </Typography>
      )}

      {authenticated && type === "favorite" && (
        <Typography color="textSecondary" sx={{ mt: -2, textAlign: "center" }}>
          Add a wheel to your favorites with the
          <SvgIcon
            component={TiStarOutline}
            color="secondary"
            viewBox="-2 -6 28 28"
            sx={{ transform: "translateY(3px)" }}
          />
          star icon <br />
          on the wheel page, and it will show up here.
        </Typography>
      )}

      {!authenticated && (
        <>
          <Typography color="textSecondary" sx={{ mt: -1, mb: -1, textAlign: "center" }}>
            Login to save your created wheels and join other private wheels!
          </Typography>
          <Typography color="textSecondary" sx={{ mt: -1, textAlign: "center" }}>
            You can also create wheels without logging in, but all wheels <br />
            will be public and you can&apos;t set permissions for accessing them.
          </Typography>
          <Link href="/login" passHref legacyBehavior>
            <Button variant="outlined" color="primary">
              Login
            </Button>
          </Link>
        </>
      )}
    </NoData>
  )
}
