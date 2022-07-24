import React from "react"
import { Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { LoadingButton, InputField } from "../components"
import { useMeQuery, useUpdateUserMutation } from "../generated/graphql"
import { defaultLayout, LayoutNextPage } from "../components/layout"

const SettingsPage: LayoutNextPage = () => {

  const [{ data }] = useMeQuery()
  const [{ }, updateUser] = useUpdateUserMutation()

  return (
    <>
      <Typography variant="h3" mb={2}>Profile Settings</Typography>

      {data?.me && (
        <Formik
          initialValues={{
            username: data?.me?.username ?? "",
            displayname: data?.me?.displayname ?? "",
          }}
          onSubmit={async (values) => {
            const response = await updateUser({
              user: {
                username: values.username,
                displayname: values.displayname || null
              }
            })

            // TODO: proper error handling/feedback

            if (response.error?.networkError) console.warn(response.error.networkError)
            else if (response.error?.graphQLErrors) console.warn(response.error.graphQLErrors)
            else if (response.data?.updateUser.errors) console.warn(response.data.updateUser.errors)
            else console.log("Updated user")

          }}
        >
          {({ isSubmitting }) => (
            <Form>

              <Grid container spacing={2}>

                <Grid item xs={12}>
                  <InputField name="username" label="Username" />
                </Grid>

                <Grid item xs={12}>
                  <InputField name="displayname" label="Display name" />
                </Grid>

                <Grid item xs={12}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Update
                  </LoadingButton>
                </Grid>

              </Grid>

            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

SettingsPage.getLayout = defaultLayout({ title: "Settings", navTitle: "Settings" })

export default SettingsPage
