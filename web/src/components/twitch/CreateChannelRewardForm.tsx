import { Box, FormHelperText, InputAdornment, Portal, Typography } from "@mui/material"
import { Form, Formik, FormikProps } from "formik"
import { FC, RefObject } from "react"
import { BooleanField, InputField, LoadingButton, NumberField, SelectField } from "../components"
import { ChannelPoints } from "../icons"

interface InitialValues {
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
  formRef?: RefObject<FormikProps<InitialValues>>
  actionsRef?: RefObject<Element>
}

export const CreateChannelRewardForm: FC<Props> = ({ formRef, actionsRef }) => {
  const initialValues: InitialValues = {
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
      onSubmit={async (values) => {
        console.warn(values.backgroundColor)
      }}
    >
      {({ isSubmitting, dirty, isValid }) => {
        return (
          <Form id="createChennelRewardForm">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box>
                <BooleanField name="isEnabled" label="Enable reward" toggle />
              </Box>

              <InputField name="title" required label="Reward Name" maxLength={45} />

              <InputField
                name="prompt"
                label="Description"
                multiline
                maxLength={200}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault()
                  }
                }}
              />

              <NumberField
                name="cost"
                required
                label="Cost"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ChannelPoints viewBox="-1 -2 22 22" opacity={0.7} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 160, mb: 1 }}
              />

              <Box>
                <BooleanField
                  name="userInputRequired"
                  label="Require user to enter text"
                  helperText="If enabled, a required text field will appear to viewers in the reward."
                  toggle
                  // labelPlacement="start"
                  // fullWidth
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <BooleanField
                  name="autoFulfill"
                  label="Skip reward requests queue"
                  helperText="If enabled, only future rewards will skip the queue for review."
                  toggle
                  // labelPlacement="start"
                  // fullWidth
                />
              </Box>

              <InputField name="backgroundColor" type="color" label="Background Color" />

              <Typography sx={{ mt: 1, fontWeight: 500, fontSize: "1.1em" }}>Cooldown & Limits</Typography>
              <FormHelperText sx={{ mt: -0.75 }}>Leave blank to disable a cooldown or limit.</FormHelperText>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* <BooleanField name="enableGlobalCooldown" label="Redemption cooldown" /> */}
                <Typography>Global Cooldown</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <NumberField
                    name="globalCooldown"
                    placeholder="disabled"
                    hiddenLabel
                    sx={{ width: 220 }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SelectField
                            name="cooldownUnit"
                            hiddenLabel
                            hiddenArrows
                            adornment
                            options={[
                              { label: "Seconds", value: 1 },
                              { label: "Minutes", value: 60 },
                              { label: "Hours", value: 3600 },
                              { label: "Days", value: 3600 * 24 },
                            ]}
                            sx={{ width: 110, mr: -1.25 }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* <BooleanField name="enableMaxRedemptionsPerStream" label="Limit redemptions per stream" /> */}
                <Typography>Limit redemptions per stream</Typography>
                <NumberField name="maxRedemptionsPerStream" hiddenLabel placeholder="disabled" sx={{ width: 220 }} />
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {/* <BooleanField name="enableMaxRedemptionsPerUser" label="Limit redemptions per user" /> */}
                <Typography>Limit redemptions per user</Typography>
                <NumberField
                  name="maxRedemptionsPerUserPerUser"
                  placeholder="disabled"
                  hiddenLabel
                  sx={{ width: 220 }}
                />
              </Box>

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
        )
      }}
    </Formik>
  )
}
