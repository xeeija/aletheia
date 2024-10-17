import { PageContainer } from "@/components"
import { Layout } from "@/types"

const AuthLayout: Layout = ({ children }) => {
  return <PageContainer maxWidth={380}>{children}</PageContainer>
}

export default AuthLayout
