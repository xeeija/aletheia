import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Alert, Box, Collapse, SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { Navigation } from "../components/Navigation"
import { PasswordField } from "../components/PasswordField"
import { useLoginMutation } from "../generated/graphql"
import { InputField } from "../components/InputField"
import { useRouter } from "next/router"
import { TiArrowRight, TiWarning } from "react-icons/ti"
import { LoadingButton } from "../components/LoadingButton"

const Login: NextPage = () => {

  const [{ }, login] = useLoginMutation()
  const router = useRouter()
  // const theme = useTheme()
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  return (
    <>
      <Head>
        <title>Login | Aletheia</title>
      </Head>

      <Navigation>

        <Box sx={{ width: 360, mx: "auto" }}>
          <Typography variant="h6" >Login</Typography>

          <Formik
            // Idea: Add shake animation to each field when it displays an error
            // validate function also available
            initialValues={{
              username: "",
              password: ""
            }}
            validateOnChange={false}
            onSubmit={async (values, { setFieldError }) => {

              // Reset error message (so same error shows again)
              setShowError(false)

              const response = await login(values)

              // Unexpected error
              if (response.error) {
                // console.log({ error: response.error })

                // TODO: Extract error checking to util function?
                let errorMsg: string
                if (response.error.networkError) errorMsg = "Could not connect to login server."
                else if (response.error.graphQLErrors) errorMsg = "The login server is currently unavailable."
                else errorMsg = "Unknown error, please try again later."

                // Reset password
                values.password = ""

                // Show error alert
                setGeneralError(errorMsg)
                setShowError(true)
                return
              }

              // Handle custom errors (expected)
              if (response.data?.login.errors) {
                response.data.login.errors.forEach(({ field, message }) => {
                  setFieldError(field, message)
                })

                // Reset password
                values.password = ""
                return
              }

              // Go to home page
              router.push("/")

            }}>
            {({ isSubmitting }) => (
              <Form>

                {/* Error Alert - TODO: Move to its own component */}
                <Collapse in={showError} onExited={() => setGeneralError("")}>
                  <Alert severity="error" variant="filled" icon={<TiWarning />}
                    onClose={() => setShowError(false)}
                    sx={{ my: 1, }}
                  >
                    {generalError}
                  </Alert>
                </Collapse>

                <InputField name="username" label="Username" variant="filled" size="small" margin="normal" fullWidth autoFocus />

                <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth />

                <p />

                <LoadingButton type="submit" variant="contained" fullWidth
                  loading={isSubmitting} position="end"
                  endIcon={<SvgIcon component={TiArrowRight} />}
                >
                  Login
                </LoadingButton>

              </Form>
            )}
          </Formik>

        </Box>

      </Navigation>
    </>
  )
}

export default Login
