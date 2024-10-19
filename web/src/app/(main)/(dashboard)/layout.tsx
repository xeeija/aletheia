import { PageContainer } from "@/components"
import { Layout } from "@/types"

const DashboardLayout: Layout = ({ children }) => {
  return (
    <PageContainer title="Dashboard" fullWidth>
      {children}
    </PageContainer>
  )
}

export default DashboardLayout
