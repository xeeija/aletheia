import { BooleanFieldHelper, BooleanFieldLabel, Tooltip } from "@/components"
import { Box, Checkbox, CheckboxProps, FormControlLabelProps, Switch, TooltipProps } from "@mui/material"
import { FC, ReactNode } from "react"

type Props = CheckboxProps & {
  name?: string
  label?: ReactNode
  labelProps?: Partial<FormControlLabelProps>
  labelPlacement?: "end" | "start" | "top" | "bottom"
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  noClickLabel?: boolean
  helperText?: ReactNode
  toggle?: boolean
  fullWidth?: boolean
  error?: string
}

export const BooleanFieldPlain: FC<Props> = ({
  name,
  label,
  labelProps,
  labelPlacement,
  helperText,
  noClickLabel,
  tooltip,
  tooltipProps,
  error,
  checked,
  toggle,
  fullWidth,
  size,
  ...props
}) => {
  const hasLabel = label !== undefined && label !== null
  const labelId = name ? `${name}Label` : label?.toString().slice(0, 16).toLowerCase().replaceAll(" ", "_")

  const hasError = error !== undefined

  const BooleanComponent = toggle ? Switch : Checkbox

  const checkbox = (
    <BooleanComponent
      aria-labelledby={hasLabel && !noClickLabel ? labelId : undefined}
      aria-describedby={!hasLabel ? tooltip || name : undefined}
      name={name}
      {...props}
      checked={checked}
      color={error ? "error" : props.color}
      // fix this inputProps
      size={size === "large" ? "medium" : size}
    />
  )

  const marginLeft = labelPlacement === "start" ? 1 : undefined

  return (
    <Box>
      <Tooltip title={tooltip ?? ""} {...tooltipProps}>
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
