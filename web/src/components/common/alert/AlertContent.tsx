import { dialogBackground } from "@/theme"
import { AlertBaseProps } from "@/types"
import { Alert, useTheme } from "@mui/material"
import { CustomContentProps, closeSnackbar } from "notistack"
import { forwardRef } from "react"

interface Props extends AlertBaseProps, CustomContentProps {
  noShadow?: boolean
}

export const AlertContent = forwardRef<HTMLDivElement, Props>(({ message, variant, style, id, ...props }, ref) => {
  const standard = variant === "default"
  const icon = props.iconVariant[variant]

  const theme = useTheme()

  // const actionProp = typeof action === "function" ? action(props.id) : action

  return (
    <Alert
      severity={!standard ? variant : "success"}
      id={`alert-${id}`}
      variant={variant === "default" ? "standard" : "filled"}
      icon={props.hideIconVariant || standard ? false : icon ?? undefined}
      // action={actionProp}
      // automatically shows an "x" icon when onClose is set but action prop is undefined
      onClose={props.closeable ? () => closeSnackbar(id) : undefined}
      ref={ref}
      style={style}
      sx={{
        boxShadow: !props.noShadow ? theme.shadows[2] : undefined,
        ...(standard && {
          bgcolor: "background.paper",
          backgroundImage: dialogBackground,
          fontWeight: 500,
        }),
        ...(!standard && {
          filter: "brightness(1.15)",
        }),
      }}
    >
      {message}
    </Alert>
  )
})

AlertContent.displayName = "AlertContent"
