import { LoginForm } from "@/components"
import { Box, Typography } from "@mui/material"
import { Metadata } from "next"
import { FC } from "react"

export const metadata: Metadata = {
  title: "Login",
}

const LoginPage: FC = () => {
  return (
    <Box sx={{ width: 360, mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Login
      </Typography>

      <LoginForm />
    </Box>
  )
}

export default LoginPage
