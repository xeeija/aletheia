import { RegisterForm } from "@/components"
import { Box, Typography } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

export const metadata: Metadata = {
  title: "Register",
}

const RegisterPage: FC = () => {
  return (
    <Box sx={{ width: 360, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Register
      </Typography>

      <RegisterForm />
    </Box>
  )
}

export default RegisterPage
