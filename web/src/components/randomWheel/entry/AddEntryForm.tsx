"use client"

import { InputField, Tooltip } from "@/components"
import { SendMessage } from "@/components/icons"
import { useAddRandomWheelEntryMutation } from "@/generated/graphql"
import { useAlert } from "@/hooks"
import { IconButton, InputAdornment } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"

interface Props {
  wheelId: string
  spinning?: boolean
  entries?: string[]
}

export const AddEntryForm: FC<Props> = ({ wheelId, spinning, entries }) => {
  const [, addEntry] = useAddRandomWheelEntryMutation()
  const { showError } = useAlert()

  const entriesLower = entries?.map((entry) => entry.toLowerCase())

  return (
    <Formik
      initialValues={{
        entry: "",
      }}
      onSubmit={async ({ entry }, { resetForm }) => {
        resetForm()

        const { data, error } = await addEntry({
          randomWheelId: wheelId,
          name: entry.trim(),
        })

        // console.warn("addEntry", error)

        if (error?.message.includes("Entry already exists")) {
          showError(`'${entry}' already exists`)
        }

        if (data?.addRandomWheelEntry) {
          // setEntries([...entries, data?.addRandomWheelEntry])
        }
      }}
      validateOnChange={false}
      validate={({ entry }) => {
        if (entriesLower?.includes(entry.trim().toLowerCase())) {
          return {
            entry: "Entry already exists",
          }
        }
      }}
    >
      {({ values }) => (
        <Form autoComplete="off">
          <InputField
            name="entry"
            label="Add entry"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip placement="top" title="Add entry">
                    <IconButton
                      type="submit"
                      disabled={!values.entry.trim() || spinning}
                      aria-label="Add name"
                      edge="end"
                      sx={{ mr: -0.75, opacity: 0.7 }}
                    >
                      <SendMessage />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
            // sx={{ mt: 1 }}
          />
        </Form>
      )}
    </Formik>
  )
}
