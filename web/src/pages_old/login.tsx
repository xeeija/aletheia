import { LayoutNextPage, LoginForm, defaultLayout } from "@/components"
import { Box, Typography } from "@mui/material"

const LoginPage: LayoutNextPage = () => (
  <Box sx={{ width: 360, mx: "auto" }}>
    <Typography variant="h4" sx={{ mb: 1 }}>
      Login
    </Typography>

    <LoginForm />
  </Box>
)

LoginPage.getLayout = defaultLayout({ title: "Login" })

export default LoginPage
