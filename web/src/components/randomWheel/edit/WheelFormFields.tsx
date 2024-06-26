import { BooleanField, ColorMenuItem, InputField, RadioGroupField, SelectField, SliderField } from "@/components"
import { useColorThemesQuery } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Grid } from "@mui/material"
import { FC, ReactNode } from "react"

interface Mark {
  value: number
  label?: ReactNode
}

const durations = [4, 6, 8, 10, 12]

const durationScale = (x: number) => x / 1000
const durationLabelFormat = (x: number) => `${x}s`
const durationMarks: Mark[] = durations.map((x) => ({ value: x * 1000, label: `${x}s` }))
// [2, 3, 5, 8]

interface Props {}

export const WheelFormFields: FC<Props> = () => {
  const { authenticated } = useAuth()
  const [{ data }] = useColorThemesQuery()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <InputField name="name" label="Title" fullWidth />
      </Grid>

      <Grid item xs={12} container sx={{ flexDirection: "column" }}>
        <RadioGroupField
          name="accessType"
          label="Access type"
          row
          options={[
            {
              value: "PUBLIC",
              label: "Public",
              color: "success",
              helperText: "Everyone with the link can view the wheel.",
            },
            {
              value: "PRIVATE",
              label: "Private",
              color: "secondary",
              disabled: !authenticated,
              helperText: "Only members can view the wheel. Add members from the dropdown under 'Members'.",
            },
          ]}
        />

        <BooleanField
          name="editAnonymous"
          label="Everyone can edit the wheel"
          disabled={!authenticated}
          helperText={
            "If checked, everyone who can view the wheel can edit it. " +
            "Otherwise, only members with the 'Edit' role can edit the wheel."
          }
        />

        <BooleanField
          name="uniqueEntries"
          label="Only allow unique entries"
          helperText="Exisiting duplicate entries in the wheel are not removed."
        />
      </Grid>

      <Grid item xs={12}>
        <SelectField
          name="theme"
          label="Color theme"
          sx={{ width: "16rem" }}
          options={data?.colorThemes?.map((option) => ({
            value: option.id,
            label: <ColorMenuItem noMenuItem name={option.name} colors={option.colors} />,
          }))}
        />
      </Grid>

      <Grid item xs={12}>
        <SliderField
          name="spinDuration"
          label="Spin duration"
          min={durationMarks[0].value}
          max={durationMarks[durationMarks.length - 1].value}
          step={500}
          scale={durationScale}
          marks={durationMarks}
          valueLabelFormat={durationLabelFormat}
          size="small"
        />
      </Grid>

      <Grid item xs={12}>
        <SliderField
          name="fadeDuration"
          label="Fade out duration"
          min={durationMarks[0].value}
          max={durationMarks[durationMarks.length - 1].value}
          step={500}
          scale={durationScale}
          marks={durationMarks}
          valueLabelFormat={durationLabelFormat}
          size="small"
        />
      </Grid>
    </Grid>
  )
}
