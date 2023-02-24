import { FC, ReactNode } from "react"
import { Grid } from "@mui/material"
import { InputField, RadioGroupField, SliderField } from "../components"
import { useAuth } from "../../hooks"

interface Mark {
  value: number
  label?: ReactNode
}

const durations = [4, 6, 8, 10, 12]

const durationScale = (x: number) => x / 1000
const durationLabelFormat = (x: number) => `${x}s`
const durationMarks: Mark[] = durations.map(x => ({ value: x * 1000, label: `${x}s` }))
// [2, 3, 5, 8]

interface Props { }

export const WheelFormFields: FC<Props> = () => {

  const { authenticated } = useAuth()

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <InputField name="name" label="Title" fullWidth />
      </Grid>

      <Grid item xs={12}>
        <RadioGroupField name="accessType" label="Access type" row options={[
          { value: "PUBLIC", label: "Public", color: "success" },
          { value: "PRIVATE", label: "Private", color: "secondary", disabled: !authenticated },
        ]} />
      </Grid>

      <Grid item xs={12}>
        <SliderField name="spinDuration"
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
        <SliderField name="fadeDuration"
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
