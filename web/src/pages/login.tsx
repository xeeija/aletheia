import React from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Box, Button, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { Sidebar } from "../components/Sidebar"
import { PasswordField } from "../components/PasswordField"
import { useLoginMutation } from "../generated/graphql"
import { InputField } from "../components/InputField"
import { useRouter } from "next/router"

const Login: NextPage = () => {

  const [{ }, login] = useLoginMutation()
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Login | Aletheia</title>
      </Head>

      <Sidebar>

        <Box sx={{ width: 360, mx: "auto" }}>
          <Typography variant="h6" >Login</Typography>

          <Formik
            // Idea: Add shake animation to each field when it displays an error
            // validate function also available
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={async (values, { setFieldError }) => {
              const response = await login(values)

              // Handle errors
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

                <InputField name="username" label="Username" variant="filled" size="small" margin="normal" fullWidth />

                <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth />

                <p />
                {/* TODO: Loading spinner */}
                <Button type="submit" disabled={isSubmitting} variant="contained" fullWidth>Login</Button>

              </Form>
            )}
          </Formik>

        </Box>

      </Sidebar>
    </>
  )
}

export default Login
