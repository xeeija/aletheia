import React from "react"
import { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { Sidebar } from "../components/Sidebar"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { InputField } from "../components/InputField"
import { PasswordField } from "../components/PasswordField"
import { useRegisterMutation } from "../generated/graphql"

const Register: NextPage = () => {
  const [{ }, register] = useRegisterMutation()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Register | Aletheia</title>
      </Head>

      <Sidebar>

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

              if (password !== confirmPassword && password !== "" && confirmPassword !== "") {
                errors.confirmPassword = "Passwords must match"
              }

              return errors
            }}
            onSubmit={async (values, { setFieldError }) => {

              const { confirmPassword: _, displayname, ...rest } = values

              console.log(values)

              const response = await register({
                displayname: (displayname || null), // pass null if empty
                ...rest
              })

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

                <InputField name="username" variant="filled" label="Username" size="small" margin="normal" fullWidth />

                <InputField name="displayname" variant="filled" label="Display name (optional)" size="small" margin="normal" fullWidth />

                {/* width: calc(100% - 36px) */}
                {/* Password Strength Meter: transition width input::after, border-width: 6-8px, border-bottom-right-radius 0 if 100% width */}
                <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth />

                <InputField name="confirmPassword" label="Confirm password" type="password" variant="filled" size="small" margin="normal" fullWidth />

                <p />
                <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>Register</Button>

              </Form>
            )}
          </Formik>

        </Box>

      </Sidebar>
    </>
  )
}

export default Register
