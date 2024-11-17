"use client"

import { LoadingButton } from "@/components"
import { RewardGroupFormFields, RewardGroupValues, RewardItemList } from "@/components/twitch"
import { CustomRewardFragment, RewardGroupFragment } from "@/generated/graphql"
import { useAlert, useRewardGroupsActions } from "@/hooks"
import { FormDialogProps } from "@/types"
import { Box, Portal, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"
import { array, boolean, object, string } from "yup"

type Props = FormDialogProps<RewardGroupValues> & {
  rewardGroup: RewardGroupFragment
  channelRewards?: CustomRewardFragment[]
  readonly?: boolean
}

export const EditRewardGroupForm: FC<Props> = ({
  rewardGroup,
  channelRewards,
  formRef,
  actionsRef,
  onClose,
  readonly,
}) => {
  const { updateGroup, fetchingUpdate } = useRewardGroupsActions()

  const { showSuccess, showError } = useAlert()

  const initialValues: RewardGroupValues = {
    name: rewardGroup.name ?? "",
    active: rewardGroup.active,
    items: rewardGroup?.items ?? [],
  }

  const validationSchema = object().shape({
    name: string(), //.required("Required"),
    active: boolean(),
    items: array()
      .of(
        object().shape({
          rewardId: string().required("Required"),
          triggerCooldown: boolean(),
        })
      )
      .min(1, "At least one reward is required"),
  })

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values) => {
        const response = await updateGroup(
          rewardGroup.id,
          {
            name: values.name,
            active: values.active,
          },
          values.items.map((item) => ({
            rewardId: item.rewardId,
            triggerCooldown: item.triggerCooldown,
          }))
        )

        if (response.rewardGroup) {
          showSuccess(`'${response.rewardGroup.name}' updated successfully`)
          onClose?.()
        } else {
          // if (!handleTwitchApiError(response.error, setShowError)) {
          showError(response.error?.message || "An error occurred")
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
