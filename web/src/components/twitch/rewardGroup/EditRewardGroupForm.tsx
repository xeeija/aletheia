import { AlertPopup, LoadingButton } from "@/components"
import { RewardGroupFormFields, RewardGroupValues, RewardItemList } from "@/components/twitch"
import { RewardGroupFragment } from "@/generated/graphql"
import { useChannelRewards, useRewardGroups } from "@/hooks"
import { FormDialogProps } from "@/types"
import { Box, Portal, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, ReactNode, useState } from "react"
import { array, boolean, object, string } from "yup"

type Props = FormDialogProps<RewardGroupValues> & {
  rewardGroup: RewardGroupFragment
  readonly?: boolean
}

export const EditRewardGroupForm: FC<Props> = ({ rewardGroup, formRef, actionsRef, readonly }) => {
  const { updateGroup, fetchingUpdate, rewardGroup: group } = useRewardGroups({ id: rewardGroup.id })

  const { channelRewards } = useChannelRewards()

  const [showError, setShowError] = useState<ReactNode>(null)
  const [showSuccess, setShowSuccess] = useState<ReactNode>(null)

  const initialValues: RewardGroupValues = {
    name: rewardGroup.name ?? "",
    active: rewardGroup.active,
    items: group?.items ?? [],
  }

  const validationSchema = object().shape({
    name: string(), //.required("Required"),
    active: boolean(),
    items: array().of(
      object().shape({
        rewardId: string().required("Required"),
        triggerCooldown: boolean(),
      })
    ),
  })

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values) => {
        const response = await updateGroup(rewardGroup.id, {
          name: values.name,
          active: values.active,
        })

        if (response.rewardGroup) {
          setShowSuccess(`'${response.rewardGroup.name}' updated successfully`)
          // onClose?.()
        } else {
          // if (!handleTwitchApiError(response.error, setShowError)) {
          setShowError(response.error?.message || "An error occurred")
          // }
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form id="editRewardGroupForm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <RewardGroupFormFields readonly={readonly} />

            <Typography sx={{ mt: 1, fontWeight: 500, fontSize: "1.1em" }}>Rewards in this group</Typography>

            <RewardItemList channelRewards={channelRewards} />

            <AlertPopup severity="success" messageState={[showSuccess, setShowSuccess]} />
            <AlertPopup severity="warning" messageState={[showError, setShowError]} hideDuration={8000} />

            <Portal container={actionsRef?.current}>
              {!readonly && (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  // color="primary"
                  loading={isSubmitting}
                  disabled={!dirty || !isValid || fetchingUpdate}
                  form="editRewardGroupForm"
                >
                  Update
                </LoadingButton>
              )}
            </Portal>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
