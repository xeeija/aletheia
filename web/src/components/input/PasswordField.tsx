import { IconButton, InputAdornment, TextFieldProps } from "@mui/material"
import React, { useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { InputField } from "../components"

type Props = TextFieldProps

// Add eye icon at the end to show/hide password
export const PasswordField: React.FC<Props> = ({ InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <InputField
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton edge="end" disableRipple tabIndex={-1} sx={{ opacity: 0.7 }}
              onMouseDown={() => setShowPassword(true)}
              onMouseUp={() => setShowPassword(false)}
              onMouseLeave={() => setShowPassword(false)}>
              {showPassword ? <HiEye /> : <HiEyeOff />}
            </IconButton>
          </InputAdornment>,
        ...InputProps
      }}
      name={props.name ?? ""}
      {...props} // spread rest of props (and potentially override type)
    />
  )
}