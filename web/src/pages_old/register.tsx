import { LayoutNextPage, RegisterForm, defaultLayout } from "@/components"
import { Box, Typography } from "@mui/material"

const RegisterPage: LayoutNextPage = () => (
  <Box sx={{ width: 360, mx: "auto" }}>
    <Typography variant="h4" sx={{ mb: 1 }}>
      Register
    </Typography>

    <RegisterForm />
  </Box>
)

RegisterPage.getLayout = defaultLayout({ title: "Register" })

export default RegisterPage
