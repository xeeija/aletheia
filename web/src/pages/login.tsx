import React from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Box, Button, TextField, Typography } from "@mui/material"
import { Form, Formik } from "formik"
import { Sidebar } from "../components/Sidebar"
import { PasswordField } from "../components/PasswordField"
import { useLoginMutation } from "../generated/graphql"

const Login: NextPage = () => {

  const [{ }, login] = useLoginMutation()

  return (
    <>
      <Head>
        <title>Login | Aletheia</title>
      </Head>

      <Sidebar>

        <Box sx={{ width: 360, mx: "auto" }}>
          <Typography variant="h6" >Login</Typography>

          <Formik
            // validate function also available
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={async (values, { }) => {
              const response = await login(values)

              // TODO: Continue here
              // Handle response, login, redirect etc., handle errors

            }}>
            {({ values, handleChange, handleBlur }) => (
              <Form>

                {/* TODO: Create custom Input component and add formik handlers via formik context */}
                <TextField name="username" label="Username" variant="filled" size="small" margin="normal" fullWidth
                  value={values.username} onChange={handleChange} onBlur={handleBlur} // formik
                />

                <PasswordField name="password" label="Password" variant="filled" size="small" margin="normal" fullWidth
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                />

                <p />
                <Button type="submit" variant="contained" fullWidth>Login</Button>

              </Form>
            )}
          </Formik>

        </Box>

      </Sidebar>
    </>
  )
}

export default Login
