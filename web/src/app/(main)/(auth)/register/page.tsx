import { RegisterForm } from "@/components"
import { Page } from "@/types"
import { Typography } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register",
}

const RegisterPage: Page = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Register
      </Typography>

      <RegisterForm />
    </div>
  )
}

export default RegisterPage
