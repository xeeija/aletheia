import { FC, ReactNode } from "react"
import { Grid } from "@mui/material"
import { InputField, RadioGroupField, SliderField } from "../components"

interface Mark {
  value: number
  label?: ReactNode
}

const durationScale = (x: number) => x / 1000
const durationLabelFormat = (x: number) => `${x}s`
const durationMarks: Mark[] = [2, 4, 6, 8, 10].map(x => ({ value: x * 1000, label: `${x}s` }))
// [2, 3, 5, 8]

interface Props { }

export const WheelFormFields: FC<Props> = () => {

  return (
    <Grid container spacing={2}>

      <Grid item xs={12}>
        <InputField name="name" label="Title" fullWidth />
      </Grid>

      <Grid item xs={12}>
        <RadioGroupField name="accessType" label="Access type" row options={[
          { value: "PRIVATE", label: "Private", color: "secondary" },
          { value: "PUBLIC", label: "Public", color: "success" },
        ]} />
      </Grid>

      <Grid item xs={12}>
        <SliderField name="spinDuration"
          label="Spin duration"
          min={2000}
          max={10000}
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
          min={2000}
          max={10000}
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
