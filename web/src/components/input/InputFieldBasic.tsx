"use client"

import { MaxLengthAdornment } from "@/components"
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  SvgIcon,
  TextField,
  TextFieldProps,
  Tooltip,
  TooltipProps,
} from "@mui/material"
import { FC, useDeferredValue } from "react"
import { TiTick, TiWarning } from "react-icons/ti"

export type BaseInputFieldProps = TextFieldProps & {
  name?: string
  icon?: boolean
  hiddenArrows?: boolean
  tooltip?: string
  tooltipProps?: Partial<TooltipProps>
  maxLength?: number
  showMaxLength?: number
  adornment?: boolean
  readonly?: boolean
}

export type InputFieldBasicProps = {
  errorMessage?: string
  touched?: boolean
  isValidating?: boolean
}

export const InputFieldBasic: FC<BaseInputFieldProps & InputFieldBasicProps> = ({
  icon,
  required,
  hiddenArrows,
  tooltip,
  tooltipProps,
  maxLength,
  showMaxLength,
  adornment,
  errorMessage,
  touched,
  isValidating,
  readonly,
  ...props
}) => {
  const hasError = errorMessage !== undefined

  const valueLength = `${(props.value as string).toString()}`.length
  const showMax = (maxLength ?? 0) > 0 && valueLength >= (showMaxLength ?? 0)

  const showMaxDeferred = useDeferredValue(showMax)

  const maxLengthAdornment = (
    <MaxLengthAdornment
      length={valueLength}
      maxLength={maxLength ?? 0}
      show={showMax ? showMaxDeferred : showMax}
      multiline={props.multiline}
    />
  )

  return (
    <Tooltip title={tooltip ?? ""} {...tooltipProps}>
      <TextField
        variant="filled"
        size="small"
        error={errorMessage !== undefined && touched}
        color={icon && touched && !hasError && valueLength > 0 ? "success" : undefined}
        {...props}
        onChange={(ev) => {
          if (maxLength && ev.target.value.length > maxLength) {
            ev.stopPropagation()
            return
          }

          props.onChange?.(ev)
        }}
        InputProps={{
          ...props.InputProps,
          readOnly: readonly,
          endAdornment: showMax ? (
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
                  <InputAdornment position="end" sx={{ gap: 0.5 }}>
                    {!hasError && !isValidating && (
                      <Tooltip title={props.label ? <>{props.label} is valid</> : "Valid"}>
                        <IconButton edge="end" disableRipple role="tooltip" sx={{ cursor: "text" }}>
                          <SvgIcon component={TiTick} color="success" sx={{ mr: 0.25 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {hasError && !isValidating && (
                      <Tooltip title={props.label ? <>{props.label} is invalid</> : "Invalid input"}>
                        <IconButton edge="end" disableRipple role="tooltip" sx={{ cursor: "text" }}>
                          <SvgIcon component={TiWarning} color="error" sx={{ mr: 0.25 }} />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isValidating && <CircularProgress color="info" sx={{ p: 1.25, m: -0.75, mr: -1 }} />}
                    {showMax ? maxLengthAdornment : null}
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
        InputLabelProps={{
          ...props.InputLabelProps,
          required: required,
        }}
        // show error message over default helper text
        {...(hasError && touched && { helperText: errorMessage })}
      />
    </Tooltip>
  )
}
