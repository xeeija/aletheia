import { DeleteDialog, Dropdown, LoadingButton, LoadingIconButton } from "@/components"
import { LinkAdd } from "@/components/icons"
import { BooleanField, LinkInputField } from "@/components/input"
import { RandomWheelDetails, useRandomWheelActions } from "@/hooks"
import { Box, IconButton, Paper, SvgIcon, Tooltip, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { HiExternalLink } from "react-icons/hi"
import { TiRefresh } from "react-icons/ti"

type PopoutOptions = {
  fade: boolean
  hideWinnerDialog: boolean
  noPopout: boolean
  test: boolean
  token?: string
}

interface Props {
  wheel: RandomWheelDetails
}

export const PopoutWheelDropdown: FC<Props> = ({ wheel }) => {
  const [anchor, setAnchor] = useState<Element | null>(null)
  const [resetDialogOpen, setResetDialogOpen] = useState(false)

  const { resetShareToken, fetchingReset } = useRandomWheelActions(wheel.id)
  // const [, { fetchWheel }] = useRandomWheelData(wheel.slug, { details: true, fetchOnly: true })

  const token = wheel.shareToken

  const initialValues: PopoutOptions = {
    fade: false,
    noPopout: false,
    hideWinnerDialog: false,
    test: false,
    token: token ?? undefined,
  }

  const privateWheel = wheel.accessType === "PRIVATE"

  const baseUrl = `${window.location.href}`

  const initialUrl = `${baseUrl}/popout${privateWheel ? `?token=${token}` : ""}`
  const [shareUrl, setShareUrl] = useState(initialUrl)
  useEffect(() => setShareUrl(initialUrl), [initialUrl])

  const updateUrl = (values: PopoutOptions) => {
    const params = new URLSearchParams()

    if (privateWheel) {
      params.append("token", token ?? "")
    }

    if (values.fade && !values.noPopout) {
      params.append("fade", values.fade.toString())
    }

    if (values.hideWinnerDialog && !values.noPopout) {
      params.append("winnerDialog", "false")
    }

    if (values.test) {
      params.append("test", values.test.toString())
    }

    const paramsString = params.toString() ? `?${params.toString()}` : ""
    const newUrl = `${baseUrl}${values.noPopout ? "" : "/popout"}${paramsString}`

    setShareUrl(newUrl)
  }

  const validUrlExists = !privateWheel || token

  const wheelEditable = wheel.editable || wheel.editAnonymous

  // if (!privateWheel) {
  //   return (
  //     <Tooltip arrow placement="bottom" title="Popout">
  //       <IconButton color="secondary" href={shareUrl} target="_blank" sx={{ ml: 1 }}>
  //         <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
  //       </IconButton>
  //     </Tooltip>
  //   )
  // }

  return (
    <>
      <Tooltip arrow placement="bottom" title={wheelEditable ? "Popout" : ""}>
        <IconButton
          color="secondary"
          disabled={!wheelEditable}
          onClick={(ev) => setAnchor(ev.currentTarget)}
          sx={{ ml: 1 }}
        >
          <SvgIcon component={HiExternalLink} viewBox="1 1 18 18" />
        </IconButton>
      </Tooltip>

      <Dropdown anchor={anchor} setAnchor={setAnchor}>
        <Paper sx={{ p: 2, width: "24rem" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Popout settings
            </Typography>

            {validUrlExists && (
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <LinkInputField
                  position="start"
                  value={shareUrl}
                  helperText="Customize this link with the options below."
                />

                <LoadingIconButton
                  color="error"
                  loading={fetchingReset}
                  tooltip="Reset token"
                  onClick={() => setResetDialogOpen(true)}
                >
                  <TiRefresh viewBox="1 2 20 20" />
                </LoadingIconButton>

                <DeleteDialog
                  title="Reset token?"
                  open={resetDialogOpen}
                  closeOnConfirm
                  onConfirm={async () => {
                    await resetShareToken()
                  }}
                  onClose={() => setResetDialogOpen(false)}
                >
                  This will regenerate the token to view this wheel in popout mode. The previous link will no longer
                  work.
                </DeleteDialog>
              </Box>
            )}

            {!validUrlExists && (
              <LoadingButton
                color="info"
                variant="outlined"
                endIcon={<LinkAdd viewBox="-3 -3 28 28" />}
                loading={fetchingReset}
                // loadingIndicator={fetchingReset ? "Loading" : undefined}
                onClick={async () => await resetShareToken()}
              >
                Generate private link
              </LoadingButton>
            )}

            <Formik
              initialValues={initialValues}
              validateOnChange={false}
              enableReinitialize
              onSubmit={(values) => {
                updateUrl(values)
              }}
            >
              {({ values }) => (
                <Form id="popoutOptionsForm" style={{ width: "calc(100%)" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, ml: 1.5 }}>
                    <BooleanField
                      name="fade"
                      label="Only show the wheel when spinning"
                      disabled={values.noPopout}
                      submitOnChange
                    />

                    <BooleanField
                      name="hideWinnerDialog"
                      label="Hide winner dialog"
                      disabled={values.noPopout}
                      submitOnChange
                    />

                    <BooleanField
                      name="noPopout"
                      label="Show this page instead of popout page"
                      // helperText="If this is checked, show this page. Otherwise show a seperate page only with the wheel."
                      submitOnChange
                    />

                    {/* <BooleanField name="test" label="Enable testing mode" submitOnChange /> */}
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Dropdown>
    </>
  )
}
