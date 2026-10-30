import { AppSidebar } from "@/components"
import { CookiesProvider } from "@/components/providers/CookiesProvider"
import { Layout } from "@/types"
import { Suspense } from "react"

// TODO: move Suspense for CookiesProvider (which uses `await cookies()`) deeper down
// to components/hooks that actually need cookies
const MainLayout: Layout = ({ children }) => {
  return (
    <Suspense fallback={<AppSidebar>{children}</AppSidebar>}>
      <CookiesProvider>
        <AppSidebar>{children}</AppSidebar>
      </CookiesProvider>
    </Suspense>
  )
}

export default MainLayout
