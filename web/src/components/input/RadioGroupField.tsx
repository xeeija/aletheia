import { FC, ReactNode } from "react"
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"
import { useField } from "formik"

interface RadioOption {
  value: string
  label: ReactNode
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"
}

interface Props {
  name: string
  label?: ReactNode
  row?: boolean
  options?: RadioOption[]
}

export const RadioGroupField: FC<Props> = ({ name, label, row, options, children }) => {

  const [field] = useField(name)
  const hasLabel = label !== undefined && label !== null

  return (
    <FormControl>
      {hasLabel && (
        // focussed = false disables the color of the FormLabel when focussed
        // and probably click/focus on it, which would be only for checkboxes I think?
        <FormLabel id={`${name}Label`} focused={false}>
          {label}
        </FormLabel>
      )}
      <RadioGroup row={row}
        aria-labelledby={hasLabel ? `${name}Label` : undefined}
        {...field}
      >
        {(options ?? []).map(({ value, label, color }) => (
          <FormControlLabel key={value} value={value} control={<Radio color={color} />} label={label} />
        ))}

        {children}
      </RadioGroup>
    </FormControl>
  )
}
