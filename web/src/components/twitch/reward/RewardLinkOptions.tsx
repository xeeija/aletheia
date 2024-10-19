"use client"

import {
  BooleanField,
  InputField,
  LinkInputField,
  LoadingButton,
  LoadingIconButton,
  NumberField,
  SelectField,
} from "@/components"
import { LinkAdd } from "@/components/icons"
import { ChannelRewardIcon } from "@/components/twitch"
import { CustomRewardMenuItemFragment, RewardLinkFragment } from "@/generated/graphql"
import { useRewardLinks } from "@/hooks"
import { ItemSize, RewardLinkType } from "@/types"
import { Box, FormHelperText, IconButton, Skeleton, SvgIcon, Tooltip } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, useEffect, useState } from "react"
import { HiCog, HiEye, HiEyeOff, HiTrash } from "react-icons/hi"

type RewardLinkValues = {
  size: ItemSize
  customTitle: string
  fontSize: number | ""
  useApi: boolean
  titleBottom: boolean
  hideTitle: boolean
}

interface Props {
  link: RewardLinkFragment | undefined
  type: RewardLinkType
  reward: CustomRewardMenuItemFragment
  loading?: boolean
  pause?: boolean
}

export const RewardLinkOptions: FC<Props> = ({ link, type, reward, loading, pause }) => {
  const [hide, setHide] = useState(true)
  const [showOptions, setShowOptions] = useState(false)
  const [showStatusPreview, setShowStatusPreview] = useState(false)

  const rewardPreview: CustomRewardMenuItemFragment = {
    ...reward,
    isEnabled: type === "enable" ? !showStatusPreview : reward.isEnabled,
    isPaused: type === "pause" ? showStatusPreview : reward.isPaused,
  }

  const { createRewardLink, deleteRewardLink, fetchingCreate, fetchingDelete } = useRewardLinks({
    pause: pause,
    type: type,
    rewardIds: reward.id,
  })

  const initialValues: RewardLinkValues = {
    size: "xl",
    customTitle: "",
    fontSize: 12,
    useApi: false,
    titleBottom: false,
    hideTitle: false,
  }

  const linkExists = link?.token

  const webUrl = `${window.location.protocol}//${window.location.host}`
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? webUrl
  const widgetBaseUrl = `${webUrl}/twitch/rewardlink`
  const baseUrlApi = `${serverUrl}/api/twitch/reward`

  const initialUrl = `${widgetBaseUrl}/${type}/${link?.token ?? ""}`

  const [url, setUrl] = useState(initialUrl)
  useEffect(() => setUrl(initialUrl), [initialUrl])

  const updateUrl = (values: RewardLinkValues) => {
    const params = new URLSearchParams()

    if (values.size && values.size !== initialValues.size) {
      params.append("size", values.size)
    }

    if (values.customTitle && values.customTitle !== initialValues.customTitle) {
      params.append("title", values.customTitle)
    }

    if (values.fontSize && values.fontSize !== initialValues.fontSize) {
      params.append("fontSize", values.fontSize.toString())
    }

    if (values.titleBottom) {
      params.append("titlePosition", "bottom")
    }

    if (values.hideTitle) {
      params.append("hideTitle", "1")
    }

    const paramsString = !values.useApi && params.toString() ? `?${params.toString()}` : ""

    const baseUrl = values.useApi ? baseUrlApi : widgetBaseUrl
    const newUrl = `${baseUrl}/${link?.type}/${link?.token}${paramsString}`

    setUrl(newUrl)
  }

  const hideIcon = (
    <Tooltip arrow placement="bottom" title={hide ? "Show link" : "Hide link"}>
      <IconButton onClick={() => setHide((x) => !x)} sx={{ p: 0.75, ml: 0.75, mr: -0.75, opacity: 0.7 }}>
        <SvgIcon component={hide ? HiEye : HiEyeOff} viewBox="-2 -2 24 24" />
      </IconButton>
    </Tooltip>
  )

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        {linkExists && (
          <>
            <LinkInputField
              position="start"
              value={url}
              type={hide ? "password" : "text"}
              InputProps={{
                endAdornment: hideIcon,
              }}
            />

            <Tooltip arrow placement="bottom" title={"Options / Preview"}>
              <IconButton color="secondary" sx={{ ml: 0.5 }} onClick={() => setShowOptions((x) => !x)}>
                <HiCog />
              </IconButton>
            </Tooltip>

            <LoadingIconButton
              color="error"
              loading={fetchingDelete}
              tooltip="Delete"
              // sx={{ ml: -0.25 }}
              onClick={async () => {
                const response = await deleteRewardLink(link.id)
                setShowOptions(false)

                if (response.deleted) {
                  // TODO: Show success snackbar
                } else {
                  // TODO: Handle error
                }
              }}
            >
              <HiTrash viewBox="-2 -1 22 22" />
            </LoadingIconButton>
          </>
        )}

        {!linkExists && (
          <LoadingButton
            color="info"
            variant="outlined"
            endIcon={<LinkAdd viewBox="-3 -3 28 28" />}
            loading={loading || fetchingCreate}
            loadingIndicator={loading ? "Loading" : undefined}
            onClick={async () => {
              const response = await createRewardLink(reward.id)

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
      </Box>

      {showOptions && (
        <Formik
          initialValues={initialValues}
          validateOnChange={false}
          onSubmit={(values) => {
            updateUrl(values)
          }}
        >
          {({ values }) => (
            <Form id="rewardLinkOptionsForm" style={{ width: "calc(100%)" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <InputField
                    name="customTitle"
                    label="Custom title"
                    fullWidth
                    submitOnChange
                    disabled={values.useApi}
                  />

                  <NumberField
                    name="fontSize"
                    label="Font size"
                    sx={{ width: 128 }}
                    placeholder={initialValues.fontSize.toString()}
                    submitOnChange
                    disabled={values.useApi}
                  />

                  <SelectField
                    name="size"
                    label="Size"
                    hiddenArrows
                    submitOnChange
                    disabled={values.useApi}
                    options={["sm", "md", "lg", "xl"].map((value) => ({ value, label: value }))}
                    sx={{ width: 128 }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                  <Box sx={{ alignSelf: "flex-start" }}>
                    <BooleanField
                      name="titleBottom"
                      label="Always show title below reward"
                      submitOnChange
                      disabled={values.useApi}
                    />

                    <BooleanField
                      name="hideTitle"
                      label="Don't show reward title"
                      submitOnChange
                      disabled={values.useApi}
                    />

                    <BooleanField name="useApi" label="Use direct API link instead of widget link" submitOnChange />
                  </Box>

                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      gap: 0.5,
                    }}
                  >
                    <FormHelperText disabled={values.useApi} sx={{ textAlign: "center" }}>
                      {values.useApi ? " " : "Preview"}
                    </FormHelperText>

                    {!values.useApi && (
                      <ChannelRewardIcon
                        reward={rewardPreview}
                        size={values.size ?? "xl"}
                        showTitle={!values.hideTitle}
                        showStatus
                        customTitle={values.customTitle || undefined}
                        fontSize={values.fontSize || undefined}
                        titleBottom={values.titleBottom || undefined}
                        button
                        onClick={() => setShowStatusPreview((v) => !v)}
                      />
                    )}

                    {values.useApi && (
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Skeleton variant="rounded" animation={false} sx={{ width: 84, height: 84 }} />
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {/* Show preview */}
    </Box>
  )
}
