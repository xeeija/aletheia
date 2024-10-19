"use client"

import { InputField, InputFieldProps } from "@/components"
import { useFormikContext } from "formik"
import { FC } from "react"

const numberPattern = /^\d+\.?\d*$/
// const numberPattern = /^(?:(?:\d+[.,]?\d*)|(?:\d*[.,]?\d+))$/

export const NumberField: FC<InputFieldProps> = (props) => {
  const { setFieldValue } = useFormikContext()

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
      onChange={(ev) => {
        const value = ev.target.value
        // const valueNum = parseFloat(value)
        // if (valueNum || valueNum === 0) {
        if (value.match(numberPattern) !== null) {
          setFieldValue(props.name, Number(value))
        } else {
          setFieldValue(props.name, value)
        }

        props.onChange?.(ev)
      }}
    />
  )
}
