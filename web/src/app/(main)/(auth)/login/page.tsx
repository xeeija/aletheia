import { LoginForm } from "@/components"
import { Page } from "@/types"
import { Typography } from "@mui/material"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
}

const LoginPage: Page = () => {
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Login
      </Typography>

      <LoginForm />
    </div>
  )
}

export default LoginPage
