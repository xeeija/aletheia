import { BooleanField, InputField } from "@/components"
import { Box } from "@mui/material"
import { FC } from "react"

interface Props {
  readonly?: boolean
}

export const RewardGroupFormFields: FC<Props> = ({ readonly }) => {
  return (
    <>
      <Box>
        <BooleanField name="active" label="Enable group" toggle disabled={readonly} />
      </Box>

      <InputField name="name" label="Name" disabled={readonly} />
    </>
  )
}
