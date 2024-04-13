import {
  DisconnectTwitchDialog,
  InputField,
  LayoutNextPage,
  LinkText,
  LoadingButton,
  defaultLayout,
} from "@/components"
import { useUpdateUserMutation } from "@/generated/graphql"
import { useAuth } from "@/hooks"
import { Button, Grid, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { useState } from "react"

const SettingsPage: LayoutNextPage = () => {
  const { user, userAccessToken, disconnectAccessToken, fetchingDisconnect } = useAuth({ includeToken: true })
  const [, updateUser] = useUpdateUserMutation()
  const [disconnectDialogOpen, setDisconnectDialogOpen] = useState(false)

  // TODO: show error for twitch auth

  return (
    <>
      <Typography variant="h3" mb={2}>
        Profile Settings
      </Typography>
      {user && (
        <Formik
          initialValues={{
            username: user.username ?? "",
            displayname: user.displayname ?? "",
          }}
          onSubmit={async (values) => {
            const response = await updateUser({
              user: {
                username: values.username,
                displayname: values.displayname || null,
              },
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
              <Grid container spacing={2} sx={{ mb: 2 }}>
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

      <Typography variant="h4" sx={{ pb: 1 }}>
        Twitch
      </Typography>

      {user && !userAccessToken?.id && (
        <Button variant="outlined" href="/api/twitch/oauth2/authorize" sx={{ mb: 1 }}>
          Connect with Twitch
        </Button>
      )}

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2 }}>
        {"For more information, go to your Twitch "}
        <LinkText href="https://www.twitch.tv/settings/connections" target="_blank">
          connections
        </LinkText>
        .
      </Typography>

      {!user && (
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          You must be logged in to connect a Twitch account.
        </Typography>
      )}

      {userAccessToken?.id && (
        <>
          <Typography color="text.secondary" sx={{ pb: 1 }}>
            Connected as <span style={{ fontWeight: 500 }}>{userAccessToken.twitchUsername}</span>
          </Typography>

          {/* TODO: make it look nice, maybe with display name or profile picture https://dev.twitch.tv/docs/api/reference/#get-users */}

          <LoadingButton
            variant="outlined"
            color="error"
            loading={fetchingDisconnect}
            onClick={() => {
              setDisconnectDialogOpen(true)
            }}
          >
            Disconnect
          </LoadingButton>
        </>
      )}

      <DisconnectTwitchDialog
        open={disconnectDialogOpen}
        onClose={() => setDisconnectDialogOpen(false)}
        onDelete={async () => {
          await disconnectAccessToken()
        }}
      />
    </>
  )
}

SettingsPage.getLayout = defaultLayout({ title: "Settings", navTitle: "Settings" })

export default SettingsPage
