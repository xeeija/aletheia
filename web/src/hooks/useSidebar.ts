import { SidebarContext } from "@/components/providers"
import { useContext } from "react"

export const useSidebar = () => useContext(SidebarContext)
