import { BaseInputFieldProps, InputFieldBasic } from "@/components"
import { FieldValidator, useField, useFormikContext } from "formik"
import { FC, useEffect, useState } from "react"

export type InputFieldProps = BaseInputFieldProps & {
  name: string // make required
  validate?: FieldValidator
  submitOnChange?: boolean
  submitOnBlur?: boolean
}

export const InputField: FC<InputFieldProps> = ({ name, icon, validate, submitOnChange, submitOnBlur, ...props }) => {
  // Custom validation idea: https://github.com/jaredpalmer/formik/issues/512#issuecomment-643788203

  const { isValidating, validateField, submitForm } = useFormikContext()

  const [validatingActive, setValidatingActive] = useState(false)
  const [validatingTimeout, setValidatingTimeout] = useState<NodeJS.Timeout>()

  // returns field props (value, handlers etc.) to spread on the field
  const [field, { error, touched }] = useField({
    name: name,
    validate: validate,
  })

  useEffect(() => {
    if (!isValidating) {
      setValidatingActive(false)
      clearTimeout(validatingTimeout)
    }
  }, [isValidating, validatingTimeout])

  const isFieldValidating = isValidating && validatingActive

  return (
    <InputFieldBasic
      errorMessage={error}
      touched={touched}
      isValidating={isFieldValidating}
      icon={icon}
      {...props}
      {...field}
      onBlur={(ev) => {
        if (icon) {
          setValidatingActive(true)
        }

        clearTimeout(validatingTimeout)

        validateField(name)

        field.onBlur(ev)
        props.onBlur?.(ev)

        if (submitOnBlur) {
          submitForm()
        }

        if (icon) {
          setValidatingTimeout(setTimeout(() => setValidatingActive(false), 5000))
        }
      }}
      onChange={(ev) => {
        props.onChange?.(ev)
        // if (ev.isPropagationStopped()) {
        //   return
        // }

        field.onChange(ev)

        if (submitOnChange) {
          submitForm()
        }
      }}
    />
  )
}
