import { LoadingButton } from "@/components"
import { RewardFormFields } from "@/components/twitch"
import { useChannelRewards } from "@/hooks"
import { Box, Portal } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"

export interface ChannelRewardValues {
  // max 40 char
  title: string
  // min 1
  cost: number | ""
  // max 200 char, required if userInputRequired
  prompt: string
  userInputRequired: boolean
  // min value 60 (seconds)
  backgroundColor: string
  isEnabled: boolean
  globalCooldown: number | ""
  maxRedemptionsPerStream: number | ""
  maxRedemptionsPerUser: number | ""
  autoFulfill: boolean
  cooldownUnit: number
}

interface Props {
  formRef?: RefObject<FormikProps<ChannelRewardValues>>
  actionsRef?: RefObject<Element>
  onClose?: () => void
}

export const CreateChannelRewardForm: FC<Props> = ({ formRef, actionsRef, onClose }) => {
  const { createReward, fetchingCreate, errorCreate } = useChannelRewards(false)

  const initialValues: ChannelRewardValues = {
    title: "",
    prompt: "",
    cost: "",
    userInputRequired: false,
    isEnabled: true,
    autoFulfill: false,
    backgroundColor: "#000000",
    globalCooldown: "",
    maxRedemptionsPerStream: "",
    maxRedemptionsPerUser: "",
    cooldownUnit: 60,
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validate={() => {
        // TODO: Yup Validation
      }}
      onSubmit={async (values) => {
        console.warn(values)

        const cooldownSec = Number(values.globalCooldown) || 0 * values.cooldownUnit

        const response = await createReward({
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
      {({ isSubmitting, dirty, isValid, values }) => (
        <Form id="createChennelRewardForm">
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
                color="success"
                loading={isSubmitting}
                disabled={!dirty || !isValid}
                form="createChennelRewardForm"
              >
                Create
              </LoadingButton>
            </Portal>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
