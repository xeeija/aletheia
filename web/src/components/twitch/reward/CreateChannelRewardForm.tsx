import { LoadingButton } from "@/components"
import { RewardFormFields } from "@/components/twitch"
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
}

export const CreateChannelRewardForm: FC<Props> = ({ formRef, actionsRef }) => {
  const initialValues: ChannelRewardValues = {
    title: "",
    prompt: "",
    cost: "",
    userInputRequired: false,
    isEnabled: true,
    autoFulfill: false,
    backgroundColor: "",
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
        // Yup Validation
      }}
      onSubmit={(values) => {
        console.warn(values)
        return
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
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
