import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps, Tooltip, TooltipProps } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

type Props = CheckboxProps & {
  label?: ReactNode
  labelProps?: Partial<FormControlLabelProps>
  labelPlacement?: "end" | "start" | "top" | "bottom"
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  noClickLabel?: boolean
} & ({
  name: string
  noForm?: false
} | {
  name?: string
  noForm: true
})

export const CheckboxField: FC<Props> = ({ name, label, labelProps, labelPlacement, noClickLabel, tooltip, tooltipProps, noForm, checked, ...props }) => {

  const [field] = useField(name ?? "")

  const hasLabel = label !== undefined && label !== null
  const labelId = name ? `${name}Label` : label?.toString().slice(0, 16).toLowerCase().replaceAll(" ", "_")

  const checkbox = <Checkbox
    aria-labelledby={hasLabel && !noClickLabel ? labelId : undefined}
    aria-describedby={!hasLabel ? tooltip || name : undefined}
    name={name}
    {...props}
    checked={!noForm ? (field.value ?? false) : checked}
    inputProps={{
      ...props.inputProps,
      ...(!noForm ? field : {}),
    }}
  />

  return (
    <span>
      <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
        {hasLabel ?
          <FormControlLabel
            {...labelProps}
            label={label}
            componentsProps={{
              typography: {
                ...labelProps?.componentsProps?.typography,
                id: labelId
              }
            }}
            control={checkbox}
            labelPlacement={labelPlacement}
          />
          : checkbox
        }

      </Tooltip>
    </span>
  )
}
