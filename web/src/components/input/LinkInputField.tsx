import { IconButton, InputAdornment, SvgIcon, TextField, TextFieldProps, Tooltip } from "@mui/material"
import { FC, MouseEventHandler } from "react"
import { HiLink } from "react-icons/hi"

type Props = TextFieldProps & {
  // onCopy?: MouseEventHandler<HTMLButtonElement>
}

export const LinkInputField: FC<Props> = ({ InputProps, ...props }) => {
  const copyHandler: MouseEventHandler<HTMLButtonElement> = () => {
    void navigator.clipboard.writeText(`${window.location.protocol}//${props.value as string}`)
  }

  return (
    <TextField
      size="small"
      variant="filled"
      hiddenLabel
      fullWidth
      InputProps={{
        readOnly: true,
        sx: { pl: 1 },
        startAdornment: (
          <InputAdornment position="start">
            <Tooltip arrow placement="bottom" title="Copy">
              <IconButton onClick={copyHandler} sx={{ p: 0.75, mx: -0.25 }}>
                <SvgIcon color="secondary" component={HiLink} viewBox="-1 -1 22 22" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        ...InputProps,
        // endAdornment: (<InputAdornment position="end">
        //   <SvgIcon color="secondary" component={HiClipboardCopy} />
        // </InputAdornment>)
      }}
      onFocus={(ev) => {
        ev.currentTarget.select()
      }}
      {...props}
    />
  )
}
