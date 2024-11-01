"use client"

import { InputField, LinkText, LoadingButton, PasswordField } from "@/components"
import { useLoginMutation } from "@/generated/graphql"
import { useAlert, useAuth } from "@/hooks"
import { SvgIcon, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { useRouter } from "next/navigation"
import { FC } from "react"
import { TiArrowRight } from "react-icons/ti"
import { object, string } from "yup"

interface Props {}

export const LoginForm: FC<Props> = () => {
  const [, login] = useLoginMutation()
  const { refetchUser } = useAuth()

  const router = useRouter()

  const { showError } = useAlert()

  const validationSchema = object().shape({
    username: string().required("Required"),
    password: string().required("Required"),
  })

  return (
    <Formik
      // Idea: Add shake animation to each field when it displays an error
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={async (values, { setFieldError }) => {
        const response = await login(values)

        // Unexpected error
        if (response.error) {
          // console.log({ error: response.error })

          if (response.error.networkError) {
            showError("Could not connect to login server.")
          } else if (response.error.graphQLErrors) {
            showError(response.error.graphQLErrors.join("\\n"))
          } else {
            showError("Unknown error, please try again later.")
          }

          // Reset password
          values.password = ""
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

        await refetchUser()

        // Go to home page
        router.push("/")
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <InputField
            name="username"
            label="Username"
            variant="filled"
            size="small"
            margin="normal"
            fullWidth
            autoFocus
            required
          />

          <PasswordField
            name="password"
            label="Password"
            variant="filled"
            size="small"
            margin="normal"
            fullWidth
            required
          />

          <LoadingButton
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            position="end"
            endIcon={<SvgIcon component={TiArrowRight} viewBox="4 2 20 20" />}
            sx={{ mt: 2 }}
          >
            Login
          </LoadingButton>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 1.5 }}>
            {"Don't have an account yet? "}
            <LinkText href="/register">Register</LinkText>
          </Typography>
        </Form>
      )}
    </Formik>
  )
}
