import { ThemeColor } from "@/types"
import { Checkbox, CheckboxProps, Switch, SwitchProps } from "@mui/material"
import { useField } from "formik"

type Props = {
  name: string
  toggle?: boolean
  hasLabel?: boolean
  labelId?: string
  noClickLabel?: boolean
  tooltip?: string
  color?: ThemeColor | "default"
  size: "small" | "medium"
} & ({ toggle: false; props: CheckboxProps } | { toggle: true; props: SwitchProps })

export const BooleanComponent = ({
  name,
  toggle,
  hasLabel,
  labelId,
  noClickLabel,
  tooltip,
  color,
  size,
  // inputProps,
  props,
}: Props) => {
  const [field, { error, touched }] = useField<boolean>(name ?? "")

  const commonProps: CheckboxProps & SwitchProps = {
    "aria-labelledby": hasLabel && !noClickLabel ? labelId : undefined,
    "aria-describedby": !hasLabel ? tooltip || name : undefined,
    name: name,
    checked: Boolean(field.value),
    color: error ? "error" : color,
    // fix this inputProps
    size: size,
    inputProps: {
      ...props.inputProps,
      ...field,
      value: `${field.value}`,
    },
  }

  const Component = toggle ? (
    <Switch {...props} {...commonProps} name={name} />
  ) : (
    <Checkbox {...props} {...commonProps} name={name} />
  )

  return {
    component: Component,
    error,
    touched,
  } as const
}
