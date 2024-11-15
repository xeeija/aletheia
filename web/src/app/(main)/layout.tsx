import { AppSidebar } from "@/components"
import { CookiesProvider } from "@/components/providers/CookiesProvider"
import { Layout } from "@/types"

const MainLayout: Layout = ({ children }) => {
  return (
    <CookiesProvider>
      <AppSidebar>{children}</AppSidebar>
    </CookiesProvider>
  )
}

export default MainLayout
