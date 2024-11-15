"use client"

import { createContext, FC, ReactNode } from "react"

interface Props {
  children: ReactNode
  cookie: string
}

export const CookiesContext = createContext("")

export const CookiesProviderClient: FC<Props> = ({ children, cookie }) => {
  return <CookiesContext.Provider value={cookie}>{children}</CookiesContext.Provider>
}
