"use client"

import { InputField } from "@/components"
import { RandomWheelEntryFragment, useUpdateRandomWheelEntryMutation } from "@/generated/graphql"
import { Form, Formik } from "formik"
import { FC } from "react"

interface Props {
  entry: RandomWheelEntryFragment
  totalWeight?: number
  disabled?: boolean
}

export const UpdateEntryForm: FC<Props> = ({ entry, totalWeight, disabled }) => {
  const weight = totalWeight
    ? `${entry.weight}:${totalWeight} (${Intl.NumberFormat(undefined, {
        maximumFractionDigits: 1,
      }).format((entry.weight / totalWeight) * 100)}%)`
    : undefined

  const [, updateEntry] = useUpdateRandomWheelEntryMutation()

  return (
    <Formik
      initialValues={{
        weight: entry.weight ?? null,
      }}
      enableReinitialize
      onSubmit={async ({ weight }, { resetForm }) => {
        // TODO: Replace with proper number validation (pattern or so)
        if (!Number.isInteger(weight)) {
          resetForm()
        }

        await updateEntry({
          id: entry.id,
          entry: { weight },
        })
      }}
    >
      {({ submitForm, dirty }) => (
        <Form>
          <InputField
            name="weight"
            type="number"
            hiddenArrows
            disabled={disabled}
            tooltip={weight}
            tooltipProps={{ placement: "top" }}
            sx={{ width: 48 }}
            inputProps={{
              style: {
                textAlign: "right",
                padding: "0.25em 0.5em",
              },
              min: 1,
              onKeyPress: (ev) => {
                if (!"012345679".includes(ev.key)) {
                  ev.preventDefault()
                }
              },
            }}
            onBlur={() => {
              if (dirty) {
                void submitForm()
              }
            }}
          />
        </Form>
      )}
    </Formik>
  )
}
