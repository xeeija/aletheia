import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import { defaultLayout, LayoutNextPage } from "../../../components/layout";
import { useRandomWheelBySlugQuery } from "../../../generated/graphql";
import { useAuth } from "../../../hooks";
import { EditWheelForm } from "../../../components/randomWheel";

const RandomWheelEditPage: LayoutNextPage = () => {

  const router = useRouter()
  const { slug } = router.query

  const { user } = useAuth()

  const [{ data }] = useRandomWheelBySlugQuery({
    variables: {
      slug: typeof slug === "string" ? slug : slug?.[0] ?? ""
    }
  })

  const wheel = data?.randomWheelBySlug

  return (
    <>
      <Head>
        <title>Random Wheel | Aletheia</title>
      </Head>

      {wheel && (
        <Box sx={{
          maxWidth: "85rem",
          mx: "auto",
        }}>
          <Typography variant="h2" sx={{}}>
            {wheel.name}
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5, opacity: 0.7, mb: 2 }}>
            {`von ${wheel.owner.displayname} • ${new Date(wheel.createdAt).toLocaleString()}`}
          </Typography>

          <EditWheelForm slug={wheel.slug} />

        </Box>
      )}
    </>
  )
}

export default RandomWheelEditPage

RandomWheelEditPage.getLayout = defaultLayout({ title: "Random Wheel" })
