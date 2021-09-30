import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Navigation } from "../components/Navigation"
import { Alert, Box, Collapse, SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { InputField } from "../components/InputField"
import { PasswordField } from "../components/PasswordField"
import { useRegisterMutation } from "../generated/graphql"
import { LoadingButton } from "../components/LoadingButton"
import { TiArrowRight, TiWarning } from "react-icons/ti"

const Register: NextPage = () => {
  const [{ }, register] = useRegisterMutation()
  const router = useRouter()

  const [generalError, setGeneralError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  return (
    <>
      <Head>
        <title>Register | Aletheia</title>
      </Head>

      <Navigation>

        <Box sx={{ width: 360, mx: "auto" }}>
          <Typography variant="h6" >Register</Typography>

          <Formik
            initialValues={{
              username: "",
              displayname: "",
              password: "",
              confirmPassword: "",
            }}
            validateOnChange={false}
            validate={({ password, confirmPassword }) => {

              const errors: any = {}

              // Make sure user confirms
              if (confirmPassword === "" && password)
                errors.confirmPassword = "Please confirm your password"

              if (password !== confirmPassword && password !== "" && confirmPassword !== "")
                errors.confirmPassword = "Passwords must match"

              return errors
            }}
            onSubmit={async (values, { setFieldError }) => {

              // Reset error message (so same error shows again)
              setShowError(false)

              const { confirmPassword: _, displayname, ...rest } = values

              const response = await register({
                displayname: (displayname || null), // pass null if empty
                ...rest
              })

              // Unexpected error
              if (response.error) {
                // console.log({ error: response.error })

                let errorMsg: string
                if (response.error.networkError) errorMsg = "Could not connect to login server."
                else if (response.error.graphQLErrors) errorMsg = "The login server is currently unavailable."
                else errorMsg = "Unknown error, please try again later."

                // Reset password
                values.password = ""
                values.confirmPassword = ""

                // Show error alert
                setGeneralError(errorMsg)
                setShowError(true)
                return
              }

              // Handle errors
              if (response.data?.register.errors) {
                response.data.register.errors.forEach(({ field, message }) => {
                  setFieldError(field, message)
                })

                // Reset password
                values.password = ""
                values.confirmPassword = ""

                return
              }

              // TODO: Redirect to "welcome page"?
              // Redirect to home page
              router.push("/")

            }}>
            {({ isSubmitting }) => (
              <Form>

                {/* Error Alert */}
                <Collapse in={showError} onExited={() => setGeneralError("")}>
                  <Alert severity="error" variant="filled" icon={<TiWarning />}
                    onClose={() => setShowError(false)}
                    sx={{ my: 1, }}
                  >
                    {generalError}
                  </Alert>
                </Collapse>

                <InputField name="username" variant="filled" label="Username" size="small" margin="normal" fullWidth />

                <InputField name="displayname" variant="filled" label="Display name (optional)" size="small" margin="normal" fullWidth />

                {/* width: calc(100% - 36px) */}
                {/* Password Strength Meter: transition width input::after, border-width: 6-8px, border-bottom-right-radius 0 if 100% width */}
                <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth />

                <InputField name="confirmPassword" label="Confirm password" type="password" variant="filled" size="small" margin="normal" fullWidth />

                <p />

                <LoadingButton type="submit" variant="contained" fullWidth
                  loading={isSubmitting} position="end"
                  endIcon={<SvgIcon component={TiArrowRight} />}
                >
                  Register
                </LoadingButton>

              </Form>
            )}
          </Formik>

        </Box>

      </Navigation>
    </>
  )
}

export default Register
