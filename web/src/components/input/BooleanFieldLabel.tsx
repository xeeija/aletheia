import { FormControlLabel, FormControlLabelProps } from "@mui/material"
import { FC } from "react"

type Props = FormControlLabelProps & {
  toggle?: boolean
  hasError?: boolean
  marginLeft?: number
  fullWidth?: boolean
}

export const BooleanFieldLabel: FC<Props> = ({ toggle, hasError, marginLeft, fullWidth, id, label, ...props }) => {
  return (
    <FormControlLabel
      {...props}
      label={label}
      componentsProps={{
        typography: {
          ...props.componentsProps?.typography,
          color: hasError ? "error" : props?.componentsProps?.typography?.color,
          id: id,
        },
      }}
      sx={{
        gap: toggle ? 0.75 : undefined,
        marginLeft: marginLeft,
        ...(fullWidth && {
          display: "flex",
          justifyContent: "space-between",
        }),
        ...props.sx,
      }}
    />
  )
}
