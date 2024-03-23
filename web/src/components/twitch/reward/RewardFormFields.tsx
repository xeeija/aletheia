import { BooleanField, InputField, NumberField, SelectField } from "@/components"
import { ChannelPoints } from "@/components/icons"
import { Box, FormHelperText, InputAdornment, Typography } from "@mui/material"
import { FC } from "react"

interface Props {
  readonly?: boolean
}

export const RewardFormFields: FC<Props> = ({ readonly }) => {
  return (
    <>
      <Box>
        <BooleanField name="isEnabled" label="Enable reward" toggle disabled={readonly} />
      </Box>

      <InputField name="title" required label="Reward Name" maxLength={45} disabled={readonly} />

      <InputField
        name="prompt"
        label="Description"
        multiline
        maxLength={200}
        disabled={readonly}
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
        disabled={readonly}
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
          disabled={readonly}
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
          disabled={readonly}
          // labelPlacement="start"
          // fullWidth
        />
      </Box>

      <InputField name="backgroundColor" type="color" label="Background Color" disabled={readonly} />

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
            disabled={readonly}
            sx={{ width: 220 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SelectField
                    name="cooldownUnit"
                    hiddenLabel
                    hiddenArrows
                    adornment
                    disabled={readonly}
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
        <NumberField
          name="maxRedemptionsPerStream"
          hiddenLabel
          placeholder="disabled"
          sx={{ width: 220 }}
          disabled={readonly}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* <BooleanField name="enableMaxRedemptionsPerUser" label="Limit redemptions per user" /> */}
        <Typography>Limit redemptions per user per stream</Typography>
        <NumberField
          name="maxRedemptionsPerUserPerStream"
          placeholder="disabled"
          hiddenLabel
          sx={{ width: 220 }}
          disabled={readonly}
        />
      </Box>
    </>
  )
}
