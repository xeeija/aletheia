import { Button, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { InputField, LoadingButton } from "../components"
import { LayoutNextPage, defaultLayout } from "../components/layout"
import { useMeQuery, useUpdateUserMutation } from "../generated/graphql"

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

                <Grid item>
                  {/* <Button variant="contained" href={twitchAuthorizeLink}>Login with Twitch</Button> */}
                </Grid>

              </Grid>

            </Form>
          )}
        </Formik>
      )}

      <Button
        variant="outlined"
        href="http://localhost:4000/twitch/authorize"
        sx={{ textTransform: "none" }}
      >
        Connect with Twitch
      </Button>

    </>
  )
}

SettingsPage.getLayout = defaultLayout({ title: "Settings", navTitle: "Settings" })

export default SettingsPage
