"use client"

import { FormControl, FormLabel, Slider, SliderProps } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

type Props = SliderProps & {
  name: string
  label?: ReactNode
}

export const SliderField: FC<Props> = ({ label, ...props }) => {
  const [field] = useField(props.name)
  const hasLabel = label !== undefined && label !== null

  return (
    <FormControl fullWidth>
      {hasLabel && (
        <FormLabel id={`${props.name}Label`} sx={{ display: "block" }}>
          {label}
        </FormLabel>
      )}
      <Slider
        {...field}
        valueLabelDisplay="auto"
        aria-labelledby={hasLabel ? `${props.name}Label` : undefined}
        {...props}
      />
    </FormControl>
  )
}
