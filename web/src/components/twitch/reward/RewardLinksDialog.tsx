import { LoadingButton } from "@/components"
import { LinkAdd } from "@/components/icons"
import { FormDialog, LinkInputField } from "@/components/input"
import { CustomRewardFragment } from "@/generated/graphql"
import { useRewardLinks } from "@/hooks"
import { Box, IconButton, SvgIcon, Typography } from "@mui/material"
import { FC } from "react"
import { HiTrash } from "react-icons/hi"
import { TiWarning } from "react-icons/ti"

interface Props {
  reward: CustomRewardFragment
  open: boolean
  onClose: () => void
  // anchor: Element | null
  // setAnchor: Dispatch<SetStateAction<Element | null>>
}

export const RewardLinksDialog: FC<Props> = ({ reward, open, onClose }) => {
  const enableBaseUrl = "/api/twitch/reward/enable"
  const pauseBaseUrl = "/api/twitch/reward/pause"

  const { rewardLinks, createRewardLink, fetchingCreate, deleteRewardLink } = useRewardLinks(reward.id, !open)

  // const [deleteRewardOpen, setDeleteRewardOpen] = useState<string | null>(null)

  const enableLink = rewardLinks?.find((l) => l.type === "enable")
  const pauseLink = rewardLinks?.find((l) => l.type === "pause")

  const showEnableLink = enableLink?.token !== undefined
  const showPauseLink = pauseLink?.token !== undefined

  return (
    // <Dropdown anchor={anchor} setAnchor={setAnchor}>
    <FormDialog
      // keepMounted
      maxWidth="sm"
      title="Reward links"
      open={open}
      cancelText="Close"
      onClose={() => {
        // closeHandler()
        onClose()

        // if (formRef.current) {
        //   setTimeout(() => formRef.current?.resetForm(), 350)
        // }
      }}
      // actionsRef={actionsRef}
    >
      {/* <Paper sx={{ p: 1.5, width: "24rem", display: "flex", flexDirection: "column", gap: 2 }}> */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
          <SvgIcon color="warning">
            <TiWarning />
          </SvgIcon>
          <Typography sx={{ color: "warning.main" }}>
            Be careful! Everyone with the link can update the respective channel reward without authentication.
          </Typography>
        </Box>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Enable/Disable reward</Typography>

          {showEnableLink && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <LinkInputField value={`${window.location.host}${enableBaseUrl}/${enableLink?.token}`} />

              <IconButton
                color="error"
                onClick={async () => {
                  const response = await deleteRewardLink(enableLink.id)

                  if (response.deleted) {
                    // TODO: Show success snackbar
                  } else {
                    // TODO: Handle error
                  }
                }}
              >
                <HiTrash viewBox="-2 -1 22 22" />
              </IconButton>
            </Box>
          )}

          {!showEnableLink && (
            <LoadingButton
              color="info"
              variant="outlined"
              endIcon={<LinkAdd />}
              onClick={async () => {
                const response = await createRewardLink(reward.id, "enable")

                if (response.rewardLink) {
                  // TODO: Show success snackbar
                } else {
                  // TODO: Handle error
                }
              }}
            >
              Generate link
            </LoadingButton>
          )}
        </div>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Pause reward</Typography>

          {showPauseLink && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <LinkInputField value={`${window.location.host}${pauseBaseUrl}/${pauseLink?.token}`} />

              <IconButton
                color="error"
                onClick={async () => {
                  const response = await deleteRewardLink(pauseLink.id)

                  if (response.deleted) {
                    // TODO: Show success snackbar
                  } else {
                    // TODO: Handle error
                  }
                }}
              >
                <HiTrash viewBox="-2 -1 22 22" />
              </IconButton>
            </Box>
          )}

          {!showPauseLink && (
            <LoadingButton
              color="info"
              variant="outlined"
              endIcon={<LinkAdd />}
              loading={fetchingCreate}
              onClick={async () => {
                const response = await createRewardLink(reward.id, "pause")

                if (response.rewardLink) {
                  // TODO: Show success snackbar
                } else {
                  // TODO: Handle error
                }
              }}
            >
              Generate link
            </LoadingButton>
          )}
        </div>
      </Box>
      {/* </Paper> */}
    </FormDialog>
    // </Dropdown>
  )
}
