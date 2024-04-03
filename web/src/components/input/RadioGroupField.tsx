import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

export interface RadioOption {
  value: string
  label: ReactNode
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"
  disabled?: boolean
  hidden?: boolean
  helperText?: ReactNode
}

interface Props {
  name: string
  label?: ReactNode
  helperText?: ReactNode
  row?: boolean
  options?: RadioOption[]
  children?: ReactNode
}

export const RadioGroupField: FC<Props> = ({ name, label, helperText, row, options, children }) => {
  const [field] = useField(name)
  const hasLabel = label !== undefined && label !== null

  const optionHelperText = options?.find((o) => o.value === field.value)?.helperText

  return (
    <FormControl>
      {hasLabel && (
        // focussed = false disables the color of the FormLabel when focussed
        // and probably click/focus on it, which would be only for checkboxes I think?
        <FormLabel id={`${name}Label`} focused={false}>
          {label}
        </FormLabel>
      )}
      <RadioGroup row={row} aria-labelledby={hasLabel ? `${name}Label` : undefined} {...field}>
        {(options ?? [])
          .filter((option) => !option.hidden)
          .map(({ value, label, color, disabled }) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio color={color} />}
              label={label}
              disabled={disabled}
            />
          ))}

        {children}
      </RadioGroup>
      {(helperText || optionHelperText) && (
        <FormHelperText sx={{ mt: -0.25, ml: 0, mb: 0.5 }}>
          <div>{helperText}</div>
          <div>{optionHelperText}</div>
        </FormHelperText>
      )}
    </FormControl>
  )
}
