import {
  CircularProgress,
  FormHelperText,
  InputAdornment,
  SvgIcon,
  TextField,
  TextFieldProps,
  Tooltip,
  TooltipProps,
} from "@mui/material"
import { FieldValidator, useField, useFormikContext } from "formik"
import { FC } from "react"
import { TiTick } from "react-icons/ti"

export type InputFieldProps = TextFieldProps & {
  name: string // make name required
  icon?: boolean
  validate?: FieldValidator
  // validateAsync?: ValidatorFnAsync
  hiddenArrows?: boolean
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  maxLength?: number
  adornment?: boolean
  submitOnChange?: boolean
  submitOnBlur?: boolean
}

export const InputField: FC<InputFieldProps> = ({
  name,
  icon,
  validate,
  required,
  hiddenArrows,
  tooltip,
  tooltipProps,
  maxLength,
  adornment,
  submitOnChange,
  submitOnBlur,
  ...props
}) => {
  // Custom validation idea: https://github.com/jaredpalmer/formik/issues/512#issuecomment-643788203

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { isValidating, status, setStatus, validateField, submitForm } = useFormikContext()

  // returns field props (value, handlers etc.) to spread on the field
  const [field, { error, touched }] = useField({
    name: name,
    validate: validate,
  })

  const hasError = error !== undefined
  const isFieldValidating = isValidating && (status as { [name: string]: string })?.[name]

  const maxLengthAdornment = (
    <InputAdornment position="end" sx={{ alignItems: props.multiline ? "end" : undefined }}>
      <FormHelperText>
        {`${field.value}`.length}/{maxLength}
      </FormHelperText>
    </InputAdornment>
  )

  return (
    <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
      <TextField
        error={error !== undefined && touched}
        {...props}
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
              [name]: true,
            })
          }

          validateField(name)

          field.onBlur(ev)
          props.onBlur?.(ev)

          if (submitOnBlur) {
            submitForm()
          }

          if (icon) {
            setTimeout(() => setStatus({}), 1000)
          }
        }}
        onChange={(ev) => {
          if (maxLength && ev.target.value.length > maxLength) {
            return
          }

          field.onChange(ev)
          props.onChange?.(ev)

          if (submitOnChange) {
            submitForm()
          }
        }}
        variant="filled"
        size="small"
        InputProps={{
          ...props.InputProps,
          endAdornment:
            (maxLength ?? 0) > 0 ? (
              <>
                {maxLengthAdornment}
                {props.InputProps?.endAdornment}
              </>
            ) : (
              props.InputProps?.endAdornment
            ),
          ...(icon &&
            touched && {
              endAdornment: (
                <>
                  <InputAdornment position="end">
                    {!hasError && !isFieldValidating && <SvgIcon component={TiTick} color="success" />}
                    {isFieldValidating && <CircularProgress color="info" sx={{ p: 1.25 }} />}
                    {(maxLength ?? 0) > 0 ? maxLengthAdornment : null}
                    {props.InputProps?.endAdornment}
                  </InputAdornment>
                </>
              ),
            }),
          ...(adornment && {
            sx: {
              ...props.InputProps?.sx,
              textAlign: "right",
              backgroundColor: "transparent !important",
              "::before, ::after": {
                borderBottomWidth: 0,
              },
              ".MuiFilledInput-input:focus": {
                backgroundColor: "transparent !important",
              },
            },
          }),
        }}
        sx={{
          ...props.sx,
          ...(adornment && {
            backgroundColor: "transparent",
          }),
        }}
        className={`${props.className}${hiddenArrows ? " hidden-arrows" : ""}`}
        name={name}
        InputLabelProps={{
          ...props.InputLabelProps,
          required: required,
        }}
        // show error message over default helper text
        {...(hasError && touched && { helperText: error })}
      />
    </Tooltip>
  )
}
