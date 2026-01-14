"use client"

import { useReportWebVitals } from "next/web-vitals"
import { FC } from "react"

type WebVitalsCallback = Parameters<typeof useReportWebVitals>[0]

const reportWebVitals: WebVitalsCallback = () => {
  // TODO: report to somewhere useful other than console
  // console.log("WebVitals:", metric)
}

export const WebVitals: FC = () => {
  useReportWebVitals(reportWebVitals)
  return null
}
