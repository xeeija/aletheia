import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material"
import React, { useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"

type Props = TextFieldProps

export const PasswordField: React.FC<Props> = ({ InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <TextField type={showPassword ? "text" : "password"} InputProps={{
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
      {...props} // spread rest of props (and potentially override type)
    />
  )
}