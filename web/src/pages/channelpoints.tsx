import { Button, SvgIcon, Typography } from "@mui/material"
import { FormikProps } from "formik"
import { useRef, useState } from "react"
import { TiPlus } from "react-icons/ti"
import { FormDialog } from "../components"
import { LayoutNextPage, defaultLayout } from "../components/layout"
import { CreateChannelRewardForm } from "../components/twitch"
import { useChannelRewards } from "../hooks"

export const ChannelPointsPage: LayoutNextPage = () => {

  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const formRef = useRef<FormikProps<any>>(null)
  const actionsRef = useRef(null)

  const { channelRewards } = useChannelRewards()

  return (
    <>
      <Typography variant="h4" sx={{ mb: 1 }}>Rewards</Typography>

      {/* <Link href="/channelpoints/create" passHref> */}
      <Button
        color="success"
        variant="contained"
        startIcon={<SvgIcon component={TiPlus} inheritViewBox />}
        onClick={() => setCreateDialogOpen(true)}
      >
        Create Reward
      </Button>
      {/* </Link> */}

      {channelRewards?.map((reward) => (
        <pre key={reward.id}>
          {reward.title}
        </pre>
      ))}

      <FormDialog
        keepMounted
        maxWidth="sm"
        title={"Create Channel Reward"}
        open={createDialogOpen}
        onClose={() => {
          setCreateDialogOpen(false)

          if (formRef.current) {
            setTimeout(() => formRef.current?.resetForm(), 350)
          }
        }}
        actionsRef={actionsRef}
      >
        <CreateChannelRewardForm actionsRef={actionsRef} formRef={formRef} />
      </FormDialog>
    </>
  )
}

ChannelPointsPage.getLayout = defaultLayout({ title: "Channel Points", navTitle: "Channel Points" })

export default ChannelPointsPage
