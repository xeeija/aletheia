import React from "react"
import { TextField, TextFieldProps } from "@mui/material"
import { useField } from "formik"

export type InputFieldProps = TextFieldProps & {
  name: string // make name required
}

export const InputField: React.FC<InputFieldProps> = ({ children, ...props }) => {
  // const { errors } = useFormikContext<{ [name: string]: string }>()
  // setup formiks handlers on text field

  // returns field props (value, handlers etc.) to spread on the field
  const [field, { error }] = useField(props.name)

  // TODO: Show green checkmark as end icon if valid
  return <TextField
    error={!!error}
    {...field}
    variant="filled"
    size="small"
    {...props}
    // show error message over default helper text
    {...(error && { helperText: error })}
  >
    {children}
  </TextField>
}
