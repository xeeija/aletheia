import { useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { Alert, Box, Collapse, SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { LoadingButton, InputField, PasswordField } from "../components"
import { useRegisterMutation } from "../generated/graphql"
import { TiArrowRight, TiWarning } from "react-icons/ti"
import { LayoutNextPage } from "../components/layout"
import { passwordStrength } from "../utils/passwordStrength"
import { useUsernameValidator } from "../hooks/useUsernameValidator"

const RegisterPage: LayoutNextPage = () => {
  const [{ }, register] = useRegisterMutation()
  const router = useRouter()

  // TODO: One useValidator hook with all (or almost/most common) validators?
  const [validateUsername] = useUsernameValidator()

  const [generalError, setGeneralError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  return (
    <>
      <Head>
        <title>Register | Aletheia</title>
      </Head>

      <Box sx={{ width: 360, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Register</Typography>

        <Formik
          initialValues={{
            username: "",
            displayname: "",
            password: "",
            confirmPassword: "",
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={({ password, confirmPassword }) => {

            const errors: any = {}

            if (password !== confirmPassword) // && password !== "" && confirmPassword !== "")
              errors.confirmPassword = "Passwords must match"

            return errors
          }}
          onSubmit={async (values, { setFieldError, setFieldTouched }) => {

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
              setFieldTouched("password", false)
              setFieldTouched("confirmPassword", false)

              return
            }

            // TODO: Redirect to "welcome page"?
            // Redirect to home page
            router.push("/")

          }}>
          {({ isSubmitting, values }) => (
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

              <InputField name="username" label="Username" margin="normal" fullWidth required icon
                validate={validateUsername}
              />

              <InputField name="displayname" label="Display name" margin="normal" fullWidth />

              {/* width: calc(100% - 36px) */}
              {/* Password Strength Meter: transition width input::after, border-width: 6-8px, border-bottom-right-radius 0 if 100% width */}
              <PasswordField name="password" label="Password" margin="normal" fullWidth required icon
                // TODO: passworStrength is called in every render, maybe useMemo?
                strength={passwordStrength(values.password)}
                helperText="Min. length 8, must contain a-z, A-Z, 0-9 and special letters"
                validate={(value: string) => {
                  if (!value) {
                    return "Please enter a password"
                  }

                  if (passwordStrength(value) <= 40) {
                    return "Min. length 8, must contain a-z, A-Z, 0-9 and special letters"
                  }

                  return undefined
                }}
              />

              <InputField name="confirmPassword" label="Confirm password" type="password" margin="normal" fullWidth required
                validate={(value) => {
                  if (!value) {
                    return "Please confirm your password"
                  }
                  // TODO: Fix (no context where the hook is initialized)
                  // return matchField("password", value, "Passwords have to match")
                  return undefined
                }}
              />

              <LoadingButton type="submit" variant="contained" fullWidth
                loading={isSubmitting} position="end"
                endIcon={<SvgIcon component={TiArrowRight} />}
                sx={{ mt: 2 }}
              >
                Register
              </LoadingButton>

            </Form>
          )}
        </Formik>

      </Box>

    </>
  )
}

export default RegisterPage
