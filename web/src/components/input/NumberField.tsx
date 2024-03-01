import { InputField, InputFieldProps } from "@/components"
import { FC } from "react"

const numberPattern = /^\d+$/

export const NumberField: FC<InputFieldProps> = (props) => {
  return (
    <InputField
      {...props}
      onKeyPress={(ev) => {
        if (ev.key.match(numberPattern) === null) {
          ev.preventDefault()
        }
        if (props.onKeyPress) {
          props.onKeyPress(ev)
        }
      }}
    />
  )
}
