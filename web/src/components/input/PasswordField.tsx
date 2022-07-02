import { IconButton, InputAdornment, TextFieldProps, useTheme } from "@mui/material"
import { FC, useState } from "react"
import { HiEye, HiEyeOff } from "react-icons/hi"
import { InputField } from "../components"
import { passwordStrengthColor } from "../../utils/passwordStrength"

type Props = TextFieldProps & {
  strength?: number
}

// Add eye icon at the end to show/hide password
export const PasswordField: FC<Props> = ({ strength, InputProps, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)

  const theme = useTheme()
  const strengthColor = passwordStrengthColor(strength ?? 0)

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
        ...(strength !== undefined && {
          sx: {
            "::after": {
              borderWidth: 6,
              opacity: 1,
              transform: "scaleX(1)",
              transition: theme.transitions.create(["opacity", "height", "width", "border-bottom", "borderBottomRightRadius"], {
                duration: theme.transitions.duration.shorter,
                easing: theme.transitions.easing.easeInOut,
              }),
              width: `${Math.min(100, strength)}%`,
              borderBottomRightRadius: strength < 100 ? 0 : undefined,
            },
            // ":not(.Mui-focused)::after": {
            //   opacity: 0.6,
            //   borderWidth: 4,
            // },
          },
          inputProps: {
            style: {
              height: "1.9em",
            },
          },
        }),
        ...InputProps
      }}
      name={props.name ?? ""}
      {...strength !== undefined && {
        color: strengthColor,
      }}
      {...props} // spread rest of props (and potentially override type)
    />
  )
}
