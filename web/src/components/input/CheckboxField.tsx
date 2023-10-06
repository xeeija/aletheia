import { Box, Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps, FormHelperText, Tooltip, TooltipProps } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

type Props = CheckboxProps & {
  label?: ReactNode
  labelProps?: Partial<FormControlLabelProps>
  labelPlacement?: "end" | "start" | "top" | "bottom"
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  noClickLabel?: boolean
  helperText?: ReactNode
} & ({
  name: string
  noForm?: false
} | {
  name?: string
  noForm: true
})

export const CheckboxField: FC<Props> = ({ name, label, labelProps, labelPlacement, helperText, noClickLabel, tooltip, tooltipProps, noForm, checked, ...props }) => {

  const [field, { error, touched }] = useField(name ?? "")

  const hasLabel = label !== undefined && label !== null
  const labelId = name ? `${name}Label` : label?.toString().slice(0, 16).toLowerCase().replaceAll(" ", "_")

  const hasError = error !== undefined && touched

  const checkbox = <Checkbox
    aria-labelledby={hasLabel && !noClickLabel ? labelId : undefined}
    aria-describedby={!hasLabel ? tooltip || name : undefined}
    name={name}
    {...props}
    checked={!noForm ? (field.value ?? false) : checked}
    color={error ? "error" : props.color}
    inputProps={{
      ...props.inputProps,
      ...(!noForm ? field : {}),
    }}
  />

  return (
    <span>
      <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
        <Box>
          {hasLabel ?
            <FormControlLabel
              {...labelProps}
              label={label}
              componentsProps={{
                typography: {
                  ...labelProps?.componentsProps?.typography,
                  color: hasError ? "error" : labelProps?.componentsProps?.typography?.color,
                  id: labelId
                }
              }}
              control={checkbox}
              labelPlacement={labelPlacement}
            />
            : checkbox
          }
          {helperText || hasError ? (
            <FormHelperText
              disabled={props.disabled}
              required={props.required}
              error={hasError}
              sx={{ mt: -0.75, ml: 1.75 }}
            >
              {hasError ? error : helperText}
            </FormHelperText>
          ) : null}
        </Box>
      </Tooltip>
    </span>
  )
}
