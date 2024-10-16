"use client"

import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react"

// type of useState<boolean>
type SidebarState = [boolean, Dispatch<SetStateAction<boolean>>]

export const SidebarContext = createContext<SidebarState>([false, () => {}])

interface Props {
  children: ReactNode
}

export const SidebarProvider: FC<Props> = ({ children }) => {
  const sidebarState = useState(false)

  return <SidebarContext.Provider value={sidebarState}>{children}</SidebarContext.Provider>
}
