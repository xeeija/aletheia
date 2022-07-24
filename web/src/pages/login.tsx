import { Box, Typography } from "@mui/material"
import { defaultLayout, LayoutNextPage } from "../components/layout"
import { LoginForm } from "../components/user/LoginForm"

const LoginPage: LayoutNextPage = () => (
  <Box sx={{ width: 360, mx: "auto" }}>
    <Typography variant="h4" sx={{ mb: 1 }}>Login</Typography>

    <LoginForm />
  </Box>
)

LoginPage.getLayout = defaultLayout({ title: "Login" })

export default LoginPage
