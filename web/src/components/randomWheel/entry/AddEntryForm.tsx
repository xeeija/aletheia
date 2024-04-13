import { AlertPopup, InputField } from "@/components"
import { SendMessage } from "@/components/icons"
import { useAddRandomWheelEntryMutation } from "@/generated/graphql"
import { IconButton, InputAdornment, Tooltip } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, ReactNode, useState } from "react"

interface Props {
  wheelId: string
  spinning?: boolean
  entries?: string[]
}

export const AddEntryForm: FC<Props> = ({ wheelId, spinning, entries }) => {
  const [, addEntry] = useAddRandomWheelEntryMutation()
  const [showError, setShowError] = useState<ReactNode>(null)

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
          setShowError(`'${entry}' already exists`)
        }

        if (data?.addRandomWheelEntry) {
          // setEntries([...entries, data?.addRandomWheelEntry])
        }
      }}
      validateOnChange={false}
      // TODO: Use immidiate validate for duplicate entries?
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
                  <Tooltip arrow placement="top" title="Add entry">
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

          <AlertPopup severity="warning" messageState={[showError, setShowError]} />
        </Form>
      )}
    </Formik>
  )
}
