import { RegisterForm } from "@/components"
import { Box, Typography } from "@mui/material"
import { FC } from "react"

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
