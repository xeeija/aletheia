import { Box } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"
import { CheckboxField, InputField } from "../components"

interface InitialValues {
  // max 40 char
  title: string
  // min 1
  cost: number,
  // max 200 char, required if userInputRequired
  prompt?: string
  userInputRequired?: boolean
  // min value 60 (seconds)
  globalCooldown?: number
  backgroundColor?: string
  isEnabled?: boolean
  maxRedemptionsPerStream?: number
  maxRedemptionsPerUserPerStream?: number
  autoFulfill?: boolean
}

interface Props {
  formRef?: RefObject<FormikProps<InitialValues>>
}

export const CreateChannelRewardForm: FC<Props> = ({ formRef }) => {

  const initialValues: InitialValues = {
    title: "",
    // prompt: "b",
    cost: 1,
    // userInputRequired: false,
    // globalCooldown: 2,
    // backgroundColor: "",
    // isEnabled: true,
    // maxRedemptionsPerStream: null,
    // maxRedemptionsPerUserPerStream: 3,
    // autoFulfill: false
  }

  return (
    <Formik
      innerRef={formRef}
      initialValues={initialValues}
      enableReinitialize
      validate={() => {
        // Yup Validation
      }}
      onSubmit={async (values) => {

      }}
    >
      {({ }) => {
        return (
          <Form>
            <Box sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}>
              <InputField name="title" label="Reward Name" />
              <InputField name="prompt" label="Description" />

              {/* Toggle instead of checkbox */}
              <CheckboxField name="userInputRequired" label="Require user to enter text" />

              <InputField name="cost" type="number" label="Cost" />
              <hr />
              <InputField name="backgroundColor" type="color" label="Background Color" />

              {/* Toggle instead of checkbox */}
              <CheckboxField name="autoFulfill" label="Skip reward requests queue" />

              <hr />

              {/* Toggle for enable/disable */}

              <InputField name="globalCooldown" type="number" label="Redemption cooldown" />
              <InputField name="maxRedemptionsPerStream" type="number" label="Limit redemptions per stream" />
              <InputField name="maxRedemptionsPerUserPerStream" type="number" label="Limit redemptions per user" />

            </Box>
          </Form>
        )
      }}
    </Formik>
  )
}