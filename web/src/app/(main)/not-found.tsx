import { NotFound } from "@/components"
import { Page } from "@/types"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found",
}

const NotFoundPage: Page = () => {
  return <NotFound />
}

export default NotFoundPage
