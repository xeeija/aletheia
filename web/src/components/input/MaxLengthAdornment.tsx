import { FormHelperText, InputAdornment } from "@mui/material"
import { FC } from "react"

interface Props {
  length: number
  maxLength: number
  show?: boolean
  multiline?: boolean
}

export const MaxLengthAdornment: FC<Props> = ({ length, maxLength, show = true, multiline }) => {
  return (
    <InputAdornment
      position="end"
      sx={{
        alignItems: multiline ? "end" : undefined,
        opacity: show ? 1 : 0,
        transition: "opacity 175ms ease-out",
      }}
    >
      <FormHelperText>
        {length}/{maxLength}
      </FormHelperText>
    </InputAdornment>
  )
}
