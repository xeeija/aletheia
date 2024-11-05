import { PageContainer } from "@/app/components"
import { Layout } from "@/types"

const RandomwheelLayout: Layout = ({ children }) => {
  return (
    <PageContainer title="Settings" fullWidth>
      {children}
    </PageContainer>
  )
}

export default RandomwheelLayout
