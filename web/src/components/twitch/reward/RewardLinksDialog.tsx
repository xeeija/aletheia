import { LoadingButton, LoadingIconButton } from "@/components"
import { LinkAdd } from "@/components/icons"
import { FormDialog, LinkInputField } from "@/components/input"
import { CustomRewardFragment } from "@/generated/graphql"
import { useRewardLinks } from "@/hooks"
import { Box, IconButton, SvgIcon, Tooltip, Typography } from "@mui/material"
import { Dispatch, FC, SetStateAction, useState } from "react"
import { HiEye, HiEyeOff, HiTrash } from "react-icons/hi"
import { TiWarning } from "react-icons/ti"

interface Props {
  reward: CustomRewardFragment
  open: boolean
  onClose: () => void
}

export const RewardLinksDialog: FC<Props> = ({ reward, open, onClose }) => {
  const enableBaseUrl = "/api/twitch/reward/enable"
  const pauseBaseUrl = "/api/twitch/reward/pause"

  const {
    rewardLinks,
    fetching,
    createRewardLink: createEnable,
    fetchingCreate: creatingEnable,
    deleteRewardLink: deleteEnable,
    fetchingDelete: deletingEnable,
  } = useRewardLinks({
    rewardIds: reward.id,
    pause: !open,
    type: "enable",
  })

  const {
    createRewardLink: createPause,
    fetchingCreate: creatingPause,
    deleteRewardLink: deletePause,
    fetchingDelete: deletingPause,
  } = useRewardLinks({
    rewardIds: reward.id,
    pause: true,
    type: "pause",
  })

  const enableLink = rewardLinks?.find((l) => l.type === "enable")
  const pauseLink = rewardLinks?.find((l) => l.type === "pause")

  const enableLinkExists = enableLink?.token !== undefined
  const pauseLinkExists = pauseLink?.token !== undefined

  const [hideEnable, setHideEnable] = useState(true)
  const [hidePause, setHidePause] = useState(true)

  const hideIcon = (hide: boolean, setHide: Dispatch<SetStateAction<boolean>>) => (
    <Tooltip arrow placement="bottom" title={hide ? "Show link" : "Hide link"}>
      <IconButton onClick={() => setHide((x) => !x)} sx={{ p: 0.75, ml: 0.75, mr: -0.75, opacity: 0.7 }}>
        <SvgIcon component={hide ? HiEye : HiEyeOff} viewBox="-2 -2 24 24" />
      </IconButton>
    </Tooltip>
  )

  return (
    <FormDialog maxWidth="sm" title="Reward links" open={open} cancelText="Close" onClose={onClose} closeOnBackdrop>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
          <SvgIcon color="warning">
            <TiWarning />
          </SvgIcon>
          <Typography sx={{ color: "warning.main" }}>
            Be careful! Everyone with the link can update the respective channel reward without authentication.
            Don&apos;t share them publicly.
          </Typography>
        </Box>

        <div>
          <Typography sx={{ mb: 1, fontWeight: 500 }}>Enable/Disable reward</Typography>

          {enableLinkExists && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <LinkInputField
                position="start"
                value={`${window.location.host}${enableBaseUrl}/${enableLink?.token}`}
                type={hideEnable ? "password" : "text"}
                InputProps={{
                  endAdornment: hideIcon(hideEnable, setHideEnable),
                }}
              />

              <LoadingIconButton
                color="error"
                loading={deletingEnable}
                onClick={async () => {
                  const response = await deleteEnable(enableLink.id)

                  if (response.deleted) {
                    // TODO: Show success snackbar
                  } else {
                    // TODO: Handle error
                  }
                }}
              >
                <HiTrash viewBox="-2 -1 22 22" />
              </LoadingIconButton>
            </Box>
          )}

          {!enableLinkExists && (
            <LoadingButton
              color="info"
              variant="outlined"
              endIcon={<LinkAdd viewBox="-3 -3 28 28" />}
              loading={fetching || creatingEnable}
              loadingIndicator={fetching ? "Loading" : undefined}
              onClick={async () => {
                const response = await createEnable(reward.id)

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

          {pauseLinkExists && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <LinkInputField
                position="start"
                value={`${window.location.host}${pauseBaseUrl}/${pauseLink?.token}`}
                type={hidePause ? "password" : "text"}
                InputProps={{
                  endAdornment: hideIcon(hidePause, setHidePause),
                }}
              />

              <LoadingIconButton
                color="error"
                loading={deletingPause}
                onClick={async () => {
                  const response = await deletePause(pauseLink.id)

                  if (response.deleted) {
                    // TODO: Show success snackbar
                  } else {
                    // TODO: Handle error
                  }
                }}
              >
                <HiTrash viewBox="-2 -1 22 22" />
              </LoadingIconButton>
            </Box>
          )}

          {!pauseLinkExists && (
            <LoadingButton
              color="info"
              variant="outlined"
              endIcon={<LinkAdd viewBox="-3 -3 28 28" />}
              loading={fetching || creatingPause}
              loadingIndicator={fetching ? "Loading" : undefined}
              onClick={async () => {
                const response = await createPause(reward.id)

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
    </FormDialog>
  )
}
