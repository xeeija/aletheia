import { LoginForm } from "@/components"
import { Box, Typography } from "@mui/material"
import { FC } from "react"

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
