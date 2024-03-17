import { LoadingButton } from "@/components"
import { ChannelRewardValues, RewardFormFields } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { useChannelRewards } from "@/hooks"
import { FormDialogProps } from "@/types"
import { getDurationUnit } from "@/utils/math"
import { Box, Portal } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"

type Props = FormDialogProps<ChannelRewardValues> & {
  reward: CustomRewardFragment
  // formRef?: RefObject<FormikProps<ChannelRewardValues>>
  // actionsRef?: RefObject<Element>
  // onClose?: () => void
  readonly?: boolean
}

export const EditChannelRewardForm: FC<Props> = ({ reward, formRef, actionsRef, onClose, readonly }) => {
  const { updateReward, fetchingUpdate } = useChannelRewards(false)

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

  // TODO: fix numbers in formik: they are saved as string, eg, "60" instead of 60
  // they are messing with dirty, because 60 !== "60"

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validate={() => {
        // Yup Validation
      }}
      onSubmit={async (values) => {
        const cooldownSec = Number(values.globalCooldown) || 0 * values.cooldownUnit

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
          onClose?.()
        } else {
          // TODO: handle error
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
