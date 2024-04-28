import { LoadingButton } from "@/components"
import { ChannelRewardValues, RewardFormFields } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { useAlert, useChannelRewards } from "@/hooks"
import { FormDialogProps } from "@/types"
import { getDurationUnit } from "@/utils/math"
import { handleTwitchApiError } from "@/utils/twitch"
import { Box, Portal } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"
import { boolean, number, object, string } from "yup"

type Props = FormDialogProps<ChannelRewardValues> & {
  reward: CustomRewardFragment
  readonly?: boolean
}

export const EditChannelRewardForm: FC<Props> = ({ reward, formRef, actionsRef, onClose, readonly }) => {
  const { updateReward, fetchingUpdate } = useChannelRewards(false)
  const { showSuccess, showError } = useAlert()

  const cooldownUnit = reward.globalCooldown ? getDurationUnit(reward.globalCooldown) : 60
  const cooldown = reward.globalCooldown ? reward.globalCooldown / cooldownUnit : ""

  const initialValues: ChannelRewardValues = {
    title: reward.title,
    prompt: reward.prompt,
    cost: reward.cost,
    userInputRequired: reward.userInputRequired,
    isEnabled: reward.isEnabled,
    autoFulfill: reward.autoFulfill,
    backgroundColor: reward.backgroundColor,
    globalCooldown: cooldown,
    maxRedemptionsPerStream: reward.maxRedemptionsPerStream ?? "",
    maxRedemptionsPerUserPerStream: reward.maxRedemptionsPerUserPerStream ?? "",
    cooldownUnit: cooldownUnit,
  }

  const validationSchema = object().shape({
    title: string().required("Required"),
    cost: number().required("Required").min(1, "Must be at least 1"),
    prompt: string(),
    userInputRequired: boolean(),
    isEnabled: boolean(),
    autoFulfill: boolean(),
    backgroundColor: string(),
    globalCooldown: number()
      .min(60, "Must be at least 1")
      .when("cooldownUnit", {
        is: (val: number) => val < 60,
        then: (schema) => schema.min(60, "Must be at least 60"),
        otherwise: (schema) => schema.min(1, "Must be at least 1"),
      }),
    maxRedemptionsPerStream: number().min(1, "Must be at least 1"),
    maxRedemptionsPerUserPerStream: number().min(1, "Must be at least 1"),
    cooldownUnit: number(),
  })

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values) => {
        const cooldownSec = (Number(values.globalCooldown) || 0) * values.cooldownUnit

        const response = await updateReward(reward.id, {
          title: values.title,
          cost: Number(values.cost) || 0,
          prompt: values.prompt || null,
          globalCooldown: cooldownSec || null,
          maxRedemptionsPerStream: Number(values.maxRedemptionsPerStream) || null,
          maxRedemptionsPerUserPerStream: Number(values.maxRedemptionsPerUserPerStream) || null,
          backgroundColor: values.backgroundColor || null,
          autoFulfill: values.autoFulfill,
          isEnabled: values.isEnabled,
          userInputRequired: values.userInputRequired,
        })

        if (response.reward) {
          showSuccess(`'${response.reward.title}' updated successfully`)
          onClose?.()
        } else {
          if (!handleTwitchApiError(response.error, undefined, showError)) {
            showError(response.error?.message || "An error occurred")
          }
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form id="editChennelRewardForm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <RewardFormFields readonly={readonly} />

            <Portal container={actionsRef?.current}>
              {!readonly && (
                <LoadingButton
                  type="submit"
                  variant="contained"
                  // color="primary"
                  loading={isSubmitting}
                  disabled={!dirty || !isValid || fetchingUpdate}
                  form="editChennelRewardForm"
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
