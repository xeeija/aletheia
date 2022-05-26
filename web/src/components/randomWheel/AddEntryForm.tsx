import { TextField, InputAdornment, IconButton, SvgIcon } from "@mui/material"
import { Form, Formik } from "formik"
import { FC, Dispatch, SetStateAction } from "react"
import { HiPaperAirplane } from "react-icons/hi"
import { RandomWheelEntryFragment, useAddRandomWheelEntryMutation } from "../../generated/graphql"
import { InputField } from "../components"

interface Props {
  wheelId: string
  entries: RandomWheelEntryFragment[]
  setEntries: Dispatch<SetStateAction<RandomWheelEntryFragment[]>>
}

export const AddEntryForm: FC<Props> = ({ wheelId, entries, setEntries }) => {

  const [, addEntry] = useAddRandomWheelEntryMutation()

  return (
    <Formik initialValues={{
      entry: ""
    }}
      onSubmit={async ({ entry }, { resetForm }) => {

        const { data } = await addEntry({
          randomWheelId: wheelId,
          name: entry.trim()
        })

        if (data?.addRandomWheelEntry) {
          setEntries([...entries, data?.addRandomWheelEntry])
        }

        resetForm()
      }}
    >
      {({ values }) => (
        <Form>
          <InputField name="entry" label="Add name" fullWidth
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton type="submit" disabled={!values.entry.trim()} aria-label="Add name" edge="end" sx={{ mr: -0.75 }}>
                  <SvgIcon component={HiPaperAirplane} viewBox="0 0 20 20" sx={{ transform: "rotate(90deg)" }} />
                </IconButton>
              </InputAdornment>
            }}
            sx={{ mt: 1 }}
          />
        </Form>
      )}
    </Formik>
  )
}