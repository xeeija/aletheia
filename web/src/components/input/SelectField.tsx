import { FC, ReactNode } from "react"
import { MenuItem } from "@mui/material"
import { InputField, InputFieldProps } from "../components"

interface SelectOption {
  value: string
  label: ReactNode
}

type Props = InputFieldProps & {
  options?: SelectOption[]
}

export const SelectField: FC<Props> = ({ options, children, ...props }) => {
  return (
    <InputField select {...props}>
      {
        options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))
        ?? children
      }
    </InputField>
  )
}
