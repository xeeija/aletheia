import { Box, Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps, FormHelperText, Switch, Tooltip, TooltipProps } from "@mui/material"
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
  toggle?: boolean
  fullWidth?: boolean
} & ({
  name: string
  noForm?: false
} | {
  name?: string
  noForm: true
})

export const BooleanField: FC<Props> = ({ name, label, labelProps, labelPlacement, helperText, noClickLabel, tooltip, tooltipProps, noForm, checked, toggle, fullWidth, ...props }) => {

  const [field, { error, touched }] = useField(name ?? "")

  const hasLabel = label !== undefined && label !== null
  const labelId = name ? `${name}Label` : label?.toString().slice(0, 16).toLowerCase().replaceAll(" ", "_")

  const hasError = error !== undefined && touched

  const BooleanComponent = toggle ? Switch : Checkbox

  const checkbox = <BooleanComponent
    aria-labelledby={hasLabel && !noClickLabel ? labelId : undefined}
    aria-describedby={!hasLabel ? tooltip || name : undefined}
    name={name}
    {...props}
    checked={!noForm ? (field.value ?? false) : checked}
    color={error ? "error" : props.color}
    inputProps={{
      ...props.inputProps,
      ...(!noForm && field),
    }}
  />

  const marginLeft = labelPlacement === "start" ? 1 : undefined
  const helperMarginLeftToggle = (labelPlacement === "end" || labelPlacement === undefined) && toggle ? (props.size === "small" ? 2.5 : 4.5) : 0
  const helperMarginLeftCheckbox = (labelPlacement === "end" || labelPlacement === undefined) && !toggle ? (props.size === "small" ? 1.75 : 2) : 0

  return (
    <Box>
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
              sx={{
                gap: toggle ? 0.75 : undefined,
                marginLeft: marginLeft,
                ...(fullWidth && {
                  display: "flex",
                  justifyContent: "space-between",
                }),
                ...labelProps?.sx
              }}
            />
            : checkbox
          }
          {helperText || hasError ? (
            <FormHelperText
              disabled={props.disabled}
              required={props.required}
              error={hasError}
              sx={{ mt: -0.75, ml: (marginLeft ?? 1.75) + helperMarginLeftToggle + helperMarginLeftCheckbox }}
            >
              {hasError ? error : helperText}
            </FormHelperText>
          ) : null}
        </Box>
      </Tooltip>
    </Box>
  )
}
