import { ThemeColor } from "@/types"
import { IconButton, InputAdornment, SvgIcon, TextField, TextFieldProps, Tooltip } from "@mui/material"
import { FC, MouseEventHandler } from "react"
import { IconType } from "react-icons"
import { HiClipboardCopy, HiLink } from "react-icons/hi"

type Props = TextFieldProps & {
  // onCopy?: MouseEventHandler<HTMLButtonElement>
  copyIcon?: IconType
  copyColor?: ThemeColor
  position?: "start" | "end"
}

export const LinkInputField: FC<Props> = ({ copyIcon, position = "end", copyColor, InputProps, ...props }) => {
  const copyHandler: MouseEventHandler<HTMLButtonElement> = () => {
    void navigator.clipboard.writeText(`${window.location.protocol}//${props.value as string}`)
  }

  const copyAdornment = (
    <InputAdornment position={position} sx={{ gap: 0.5 }}>
      {position === "end" && InputProps?.endAdornment}
      <Tooltip arrow placement="bottom" title="Copy to clipboard">
        <IconButton onClick={copyHandler} sx={{ p: 0.75, mx: -0.25 }}>
          <SvgIcon
            color={copyColor ?? "secondary"}
            component={copyIcon ?? HiClipboardCopy ?? HiLink}
            viewBox="-1 -1 22 22"
          />
        </IconButton>
      </Tooltip>
      {position === "start" && InputProps?.startAdornment}
    </InputAdornment>
  )

  return (
    <TextField
      size="small"
      variant="filled"
      hiddenLabel
      fullWidth
      InputProps={{
        readOnly: true,
        sx: {
          ...InputProps?.sx,
          pl: position === "start" ? 0.5 : undefined,
          pr: position === "end" ? 0.5 : undefined,
        },
        ...InputProps,
        startAdornment: position === "start" ? copyAdornment : InputProps?.startAdornment,
        endAdornment: position === "end" ? copyAdornment : InputProps?.endAdornment,
      }}
      onFocus={(ev) => {
        ev.currentTarget.select()
      }}
      {...props}
    />
  )
}
