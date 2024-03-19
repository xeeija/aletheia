import { AlertPopup, LoadingButton } from "@/components"
import { RewardFormFields } from "@/components/twitch"
import { useChannelRewards } from "@/hooks"
import { FormDialogProps } from "@/types"
import { handleTwitchApiError } from "@/utils/twitch"
import { Box, Portal } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, ReactNode, useState } from "react"
import { boolean, number, object, string } from "yup"

export interface ChannelRewardValues {
  // max 45 char
  title: string
  // min 1
  cost: number | ""
  // max 200 char
  prompt: string
  userInputRequired: boolean
  // min value 60 (seconds)
  backgroundColor: string
  isEnabled: boolean
  globalCooldown: number | ""
  maxRedemptionsPerStream: number | ""
  maxRedemptionsPerUserPerStream: number | ""
  autoFulfill: boolean
  cooldownUnit: number
}

type Props = FormDialogProps<ChannelRewardValues>

export const CreateChannelRewardForm: FC<Props> = ({ formRef, actionsRef, onClose }) => {
  const { createReward, fetchingCreate } = useChannelRewards(false)
  const [showError, setShowError] = useState<ReactNode>(null)
  const [showSuccess, setShowSuccess] = useState<ReactNode>(null)

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
    maxRedemptionsPerUserPerStream: "",
    cooldownUnit: 60,
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
      // validate={() => {}}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values) => {
        const cooldownSec = Number(values.globalCooldown) || 0 * values.cooldownUnit

        const response = await createReward({
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
          setShowSuccess(`'${response.reward.title}' created successfully`)
          onClose?.()
        } else {
          if (!handleTwitchApiError(response.error, setShowError)) {
            setShowError(response.error?.message || "An error occurred")
          }
        }
      }}
    >
      {({ isSubmitting, dirty }) => (
        <Form id="createChennelRewardForm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <RewardFormFields />

            <AlertPopup severity="success" messageState={[showSuccess, setShowSuccess]} />
            <AlertPopup severity="warning" messageState={[showError, setShowError]} />

            <Portal container={actionsRef?.current}>
              <LoadingButton
                type="submit"
                variant="contained"
                color="success"
                loading={isSubmitting}
                disabled={!dirty || fetchingCreate}
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
