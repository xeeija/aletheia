import { LoadingButton } from "@/components"
import { ChannelRewardValues, RewardFormFields } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { useChannelRewards } from "@/hooks"
import { Box, Portal } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"

interface Props {
  reward: CustomRewardFragment
  formRef?: RefObject<FormikProps<ChannelRewardValues>>
  actionsRef?: RefObject<Element>
  onClose?: () => void
}

export const EditChannelRewardForm: FC<Props> = ({ reward, formRef, actionsRef, onClose }) => {
  const { updateReward, fetchingUpdate, errorUpdate } = useChannelRewards(false)

  const initialValues: ChannelRewardValues = {
    title: reward.title,
    prompt: reward.prompt,
    cost: reward.cost,
    userInputRequired: reward.userInputRequired,
    isEnabled: reward.isEnabled,
    autoFulfill: reward.autoFulfill,
    backgroundColor: reward.backgroundColor,
    globalCooldown: reward.globalCooldown ?? "",
    maxRedemptionsPerStream: reward.maxRedemptionsPerStream ?? "",
    maxRedemptionsPerUser: reward.maxRedemptionsPerUserPerStream ?? "",
    cooldownUnit: 60,
  }
  // TODO: show cooldown correctly (divide to show in biggest time unit)

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
          maxRedemptionsPerUser: Number(values.maxRedemptionsPerUser) || null,
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
            <RewardFormFields />

            <Portal container={actionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                // color="primary"
                loading={isSubmitting}
                disabled={!dirty || !isValid}
                form="editChennelRewardForm"
              >
                Update
              </LoadingButton>
            </Portal>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
