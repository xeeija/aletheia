import { MenuItem } from "@mui/material"
import { FC, ReactNode } from "react"
import { InputField, InputFieldProps } from "../components"

interface SelectOption {
  value: string
  label: ReactNode
}

type Props = InputFieldProps & {
  options?: SelectOption[]
}

// TODO: Rework with Autocomplete
// TODO: Doesnt work with custom MenuItem's as children yet, only with options prop

export const SelectField: FC<Props> = ({ options, children, ...props }) => {
  return (
    <InputField select {...props} sx={{
      ...props.sx,
      ...(props.fullWidth ? { width: "100%" } : {})
    }}>
      {children}
      {options?.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </InputField>
  )
}
