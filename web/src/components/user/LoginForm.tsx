import { InputField, LinkText, LoadingButton, PasswordField } from "@/components"
import { useLoginMutation } from "@/generated/graphql"
import { Alert, Collapse, SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import { TiArrowRight, TiWarning } from "react-icons/ti"

interface Props {}

export const LoginForm: FC<Props> = () => {
  const [, login] = useLoginMutation()
  const router = useRouter()

  const [generalError, setGeneralError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  return (
    <Formik
      // Idea: Add shake animation to each field when it displays an error
      // validate function also available
      initialValues={{
        username: "",
        password: "",
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
        await router.push("/")
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Error Alert - TODO: Move to its own component */}
          <Collapse in={showError} onExited={() => setGeneralError("")}>
            <Alert
              severity="error"
              variant="filled"
              icon={<TiWarning />}
              onClose={() => setShowError(false)}
              sx={{ my: 1 }}
            >
              {generalError}
            </Alert>
          </Collapse>

          <InputField
            name="username"
            label="Username"
            variant="filled"
            size="small"
            margin="normal"
            fullWidth
            autoFocus
          />

          <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth />

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            position="end"
            endIcon={<SvgIcon component={TiArrowRight} />}
            sx={{ mt: 2 }}
          >
            Login
          </LoadingButton>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {"Don't have an account yet? "}
            <LinkText href="/register">Register</LinkText>
          </Typography>
        </Form>
      )}
    </Formik>
  )
}
