import { InputAdornment, IconButton, SvgIcon, Tooltip } from "@mui/material"
import { Form, Formik } from "formik"
import { FC } from "react"
import { HiPaperAirplane } from "react-icons/hi"
import { useAddRandomWheelEntryMutation } from "../../generated/graphql"
import { InputField } from "../components"

interface Props {
  wheelId: string
  spinning?: boolean
}

export const AddEntryForm: FC<Props> = ({ wheelId, spinning }) => {
  const [, addEntry] = useAddRandomWheelEntryMutation()

  return (
    <Formik
      initialValues={{
        entry: "",
      }}
      onSubmit={async ({ entry }, { resetForm }) => {
        resetForm()

        const { data } = await addEntry({
          randomWheelId: wheelId,
          name: entry.trim(),
        })

        if (data?.addRandomWheelEntry) {
          // setEntries([...entries, data?.addRandomWheelEntry])
        }
      }}
    >
      {({ values }) => (
        <Form autoComplete="off">
          <InputField
            name="entry"
            label="Add name"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip arrow placement="top" title="Add">
                    <IconButton
                      type="submit"
                      disabled={!values.entry.trim() || spinning}
                      aria-label="Add name"
                      edge="end"
                      sx={{ mr: -0.75 }}
                    >
                      <SvgIcon component={HiPaperAirplane} viewBox="0 0 20 20" sx={{ transform: "rotate(90deg)" }} />
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
