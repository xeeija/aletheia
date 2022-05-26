import { Grid } from "@mui/material"
import { Formik, Form } from "formik"
import React, { Dispatch, SetStateAction } from "react"
import { RandomWheel, RandomWheelDetailsFragment, useCreateRandomWheelMutation } from "../../generated/graphql"
import { InputField, LoadingButton } from "../components"

interface Props {
  wheelState: [
    RandomWheelDetailsFragment[] | undefined,
    Dispatch<SetStateAction<RandomWheelDetailsFragment[] | undefined>>
  ]
}

export const RandomWheelCreateForm: React.FC<Props> = ({ wheelState }) => {

  const [{ }, createRandomWheel] = useCreateRandomWheelMutation()
  const [wheels, setWheels] = wheelState

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        const response = await createRandomWheel({ ...values })

        // TODO: proper error handling/feedback

        if (response.error?.networkError) console.warn(response.error.networkError)
        else if (response.error?.graphQLErrors) console.warn(response.error.graphQLErrors)

        if (response.data?.createRandomWheel) {
          resetForm()
          setWheels([...(wheels ?? []), response.data?.createRandomWheel])
        }

        // switch (response.data?.createRandomWheel.__typename) {
        //   case "RandomWheel":
        //     resetForm()
        //     setWheels([...(wheels ?? []), response.data?.createRandomWheel])

        //     break
        //   case "AppError":

        //     break
        //   default:

        //     break
        // }


      }}
    >
      {({ isSubmitting }) => (
        <Form>

          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={12}>
              <InputField name="name" label="Random Wheel name" />
            </Grid>

            <Grid item xs={12}>
              <LoadingButton type="submit" variant="contained" color="success" loading={isSubmitting}>
                Create
              </LoadingButton>
            </Grid>

          </Grid>

        </Form>
      )}
    </Formik>
  )
}