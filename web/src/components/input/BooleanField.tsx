import { BooleanFieldHelper, BooleanFieldLabel } from "@/components"
import { Box, Checkbox, CheckboxProps, FormControlLabelProps, Switch, Tooltip, TooltipProps } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

type Props = CheckboxProps & {
  name: string
  label?: ReactNode
  labelProps?: Partial<FormControlLabelProps>
  labelPlacement?: "end" | "start" | "top" | "bottom"
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  noClickLabel?: boolean
  helperText?: ReactNode
  toggle?: boolean
  fullWidth?: boolean
}

export const BooleanField: FC<Props> = ({
  name,
  label,
  labelProps,
  labelPlacement,
  helperText,
  noClickLabel,
  tooltip,
  tooltipProps,
  toggle,
  fullWidth,
  size,
  ...props
}) => {
  const [field, { error, touched }] = useField<boolean>(name ?? "")

  const hasLabel = label !== undefined && label !== null
  const labelId = name ? `${name}Label` : label?.toString().slice(0, 16).toLowerCase().replaceAll(" ", "_")

  const hasError = error !== undefined && touched

  const marginLeft = labelPlacement === "start" ? 1 : undefined

  const BooleanComponent = toggle ? Switch : Checkbox

  const checkbox = (
    <BooleanComponent
      aria-labelledby={hasLabel && !noClickLabel ? labelId : undefined}
      aria-describedby={!hasLabel ? tooltip || name : undefined}
      name={name}
      {...props}
      checked={Boolean(field.value) ?? false}
      color={error ? "error" : props.color}
      // fix this inputProps
      size={(toggle && size === "large" ? "medium" : size) as "small" | "medium"}
      inputProps={{
        ...props.inputProps,
        ...field,
        value: `${field.value}`,
      }}
    />
  )

  return (
    <Box>
      <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
        <Box>
          {hasLabel ? (
            <BooleanFieldLabel
              control={checkbox}
              label={label}
              hasError={hasError}
              labelPlacement={labelPlacement}
              id={labelId}
              toggle={toggle}
              fullWidth={fullWidth}
              {...labelProps}
            />
          ) : (
            checkbox
          )}
          {helperText || hasError ? (
            <BooleanFieldHelper
              hasError={hasError}
              toggle={toggle}
              labelPlacement={labelPlacement}
              size={size === "large" ? "medium" : size}
              margin={marginLeft ?? 1.75}
              disabled={props.disabled}
              required={props.required}
            >
              {hasError ? error : helperText}
            </BooleanFieldHelper>
          ) : null}
        </Box>
      </Tooltip>
    </Box>
  )
}
