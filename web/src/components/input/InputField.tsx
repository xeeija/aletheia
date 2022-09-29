import { FC } from "react"
import { CircularProgress, InputAdornment, SvgIcon, TextField, TextFieldProps, Tooltip, TooltipProps } from "@mui/material"
import { FieldValidator, useField, useFormikContext } from "formik"
import { TiTick } from "react-icons/ti"

export type InputFieldProps = TextFieldProps & {
  name: string // make name required
  icon?: boolean
  validate?: FieldValidator
  // validateAsync?: ValidatorFnAsync
  hiddenArrows?: boolean
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
}

export const InputField: FC<InputFieldProps> = ({ name, icon, validate, required, hiddenArrows, tooltip, tooltipProps, ...props }) => {

  // Custom validation idea: https://github.com/jaredpalmer/formik/issues/512#issuecomment-643788203

  const { isValidating, status, setStatus, validateField } = useFormikContext()

  // returns field props (value, handlers etc.) to spread on the field
  const [field, { error, touched }] = useField({
    name: name,
    validate: validate,
  })

  const hasError = error !== undefined
  const isFieldValidating = isValidating && status?.[name]

  return <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
    <TextField
      error={error !== undefined && touched}
      {...field}
      onBlur={(ev) => {
        // WORKAROUND for isValidating at field level
        // set the field name in the status, and clear after 1s
        // (would be nice in a onValidationComplete event or so)
        // only shows validating spinner if isValidating and this field is updated
        // TRY: -> useReducer instead of state for isFieldValidating

        if (icon) {
          setStatus({
            ...status,
            [name]: true
          })
        }

        field.onBlur(ev)
        validateField(name)

        if (icon) {
          setTimeout(() => setStatus({}), 1000)
        }
      }}
      variant="filled"
      size="small"
      InputProps={{
        ...(icon && touched && {
          endAdornment: <InputAdornment position="end">
            {!hasError && !isFieldValidating && <SvgIcon component={TiTick} color="success" />}
            {isFieldValidating && <CircularProgress color="info" sx={{ p: 1.25 }} />}
          </InputAdornment>
        }),
        ...props.InputProps,
      }}
      InputLabelProps={{
        required: required
      }}
      className={`${props.className}${hiddenArrows ? " hidden-arrows" : ""}`}
      name={name}
      {...props}
      // show error message over default helper text
      {...(hasError && touched && { helperText: error })}
    />
  </Tooltip>
}
