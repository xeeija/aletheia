import { Checkbox, CheckboxProps, FormControlLabel, Tooltip, TooltipProps } from "@mui/material"
import { useField } from "formik"
import { FC, ReactNode } from "react"

type Props = CheckboxProps & {
  name: string
  label?: ReactNode
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
}

export const CheckboxField: FC<Props> = ({ name, label, tooltip, tooltipProps, ...props }) => {

  const [field] = useField(name)
  const hasLabel = label !== undefined && label !== null
  const labelId = `${name}Label`

  const checkbox = <Checkbox
    aria-labelledby={hasLabel ? labelId : undefined}
    aria-describedby={!hasLabel ? tooltip || name : undefined}
    name={name}
    {...props}
    checked={field.value ?? false}
    inputProps={{
      ...props.inputProps,
      ...field,
    }}
  />

  return (
    <span>
      <Tooltip title={tooltip ?? ""} arrow enterDelay={1000} {...tooltipProps}>
        {hasLabel ?
          <FormControlLabel
            label={label}
            componentsProps={{
              typography: { id: labelId }
            }}
            control={checkbox}
          />
          : checkbox
        }

      </Tooltip>
    </span>
  )
}
