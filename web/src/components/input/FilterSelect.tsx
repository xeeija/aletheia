import { SelectField, SelectOption } from "@/components"
import { Formik } from "@/components/client/formik"
import { InputAdornment, SvgIcon } from "@mui/material"
import { ChangeEvent, FC } from "react"
import { HiFilter } from "react-icons/hi"

interface Props {
  options: SelectOption[]
  onChange: (ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void | Promise<void>
  initialValue?: string
}

export const FilterSelect: FC<Props> = ({ options, onChange, initialValue }) => {
  return (
    <Formik initialValues={{ filter: initialValue ?? options[0]?.value ?? "" }} onSubmit={() => {}}>
      {({ setFieldValue }) => (
        <SelectField
          name="filter"
          options={options}
          required
          hiddenLabel
          onChange={async (ev) => {
            await setFieldValue("filter", ev.target.value)
            await onChange(ev)
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "text.secondary" }}>
                <SvgIcon component={HiFilter} viewBox="-1 -1 22 22" />
              </InputAdornment>
            ),
          }}
          // sx={{ width: "240px" }}
        />
      )}
    </Formik>
  )
}
