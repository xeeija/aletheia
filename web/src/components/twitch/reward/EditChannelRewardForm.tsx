import { LoadingButton } from "@/components"
import { ChannelRewardValues, RewardFormFields } from "@/components/twitch"
import { CustomRewardFragment } from "@/generated/graphql"
import { Box, Portal } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"

interface Props {
  reward: CustomRewardFragment
  formRef?: RefObject<FormikProps<ChannelRewardValues>>
  actionsRef?: RefObject<Element>
}

export const EditChannelRewardForm: FC<Props> = ({ reward, formRef, actionsRef }) => {
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
      onSubmit={(values) => {
        console.warn(values)
        return
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
