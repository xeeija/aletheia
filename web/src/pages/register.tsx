import Head from "next/head"
import { Box, Typography } from "@mui/material"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import { RegisterForm } from "../components/user/RegisterForm"

const RegisterPage: LayoutNextPage = () => {

  return (
    <>
      <Head>
        <title>Register | Aletheia</title>
      </Head>

      <Box sx={{ width: 360, mx: "auto" }}>
        <Typography variant="h4" sx={{ mb: 1 }}>Register</Typography>

        <RegisterForm />

      </Box>

    </>
  )

RegisterPage.getLayout = defaultLayout({ title: "Register" })

export default RegisterPage
