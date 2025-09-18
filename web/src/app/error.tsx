"use client"

import { ErrorFallback } from "@/components"
import { AppErrorProps } from "@/types"
import { FC } from "react"

export const ErrorPage: FC<AppErrorProps> = ({ error, reset }) => {
  return <ErrorFallback global error={error} reset={reset} showReset />
}

export default ErrorPage
