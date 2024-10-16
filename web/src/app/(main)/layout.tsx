import { AppSidebar } from "@/components"
import { Layout } from "@/types"

const MainLayout: Layout = ({ children }) => {
  return <AppSidebar>{children}</AppSidebar>
}

export default MainLayout
